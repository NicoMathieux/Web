<script setup lang="ts">
import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";
import Texture2D from "nanogl/texture-2d";
import { Pane } from "tweakpane";
import noiseSrc from "/assets/images/fbm-noise-pack.png"
import { TweakpaneColor } from "../utils/tweakpane";

const canvas = ref<HTMLCanvasElement | null>(null);
const PARAMS = {
    speed: 2,
    force: 5,
    size: 0.2,
    alpha: 1,
    color1: { r: 0.35, g: 0.27, b: 0.18 },
    color1f: [0.35, 0.27, 0.18],
    color2: { r: 0.9, g: 0.66, b: 0.42 },
    color2f: [0.9, 0.66, 0.42],
    grainForce: 5,
    grainSize: 0.1,
    grainSpeed: 0,
};

onMounted(() => {
    /* const pane = new Pane();
    const folder = pane.addFolder({
        title: 'Options du fond',
        expanded: false
    });
    folder.addBinding(PARAMS, 'speed', { label: "Vitesse", min: 0, max: 3 } );
    folder.addBinding(PARAMS, 'force', { label: "Force", min: 0, max: 10 } );
    folder.addBinding(PARAMS, 'size', { label: "Taille", min: 0, max: 0.6 } );
    folder.addBinding(PARAMS, 'alpha', { label: "Opacité", min: 0, max: 2 } );
    TweakpaneColor(folder, PARAMS, 'color1', 'color1f', { label: "Couleur 1"});
    TweakpaneColor(folder, PARAMS, 'color2', 'color2f', { label: "Couleur 2"});
    folder.addBlade({ view: 'separator' });
    folder.addBinding(PARAMS, 'grainForce', { label: "Grain - Force", min: 0, max: 20 } );
    folder.addBinding(PARAMS, 'grainSize', { label: "Grain - Taille", min: 0.01, max: 1 } );
    folder.addBinding(PARAMS, 'grainSpeed', { label: "Grain - Vitesse", min: 0, max: 1 } );
    folder.addBlade({ view: 'separator' });
    folder.addButton({
        title: 'Copier les paramètres',
    }).on('click', () => {
        navigator.clipboard.writeText(JSON.stringify({ ...PARAMS, uiColor: UIColor.value }));
        alert("✅ Paramètres copiés dans le presse-papier !")
    }); */
    
    initGL();
})

const initGL = () => {
    if (canvas.value === null) return;

    const gl = canvas.value.getContext("webgl");

    const size = {
        width: 1,
        height: 1
    };

    const pixelRatio = window.devicePixelRatio;

    const handleResize = (entries) => {
        if (!canvas.value) return;

        const {
            width: canvasWidth,
            height: canvasHeight
        } = entries[0].contentRect;

        canvas.value.width = Math.round(canvasWidth * pixelRatio);
        canvas.value.height = Math.round(canvasHeight * pixelRatio);

        size.width = gl.drawingBufferWidth;
        size.height = gl.drawingBufferHeight;
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.value);

    const quadData = new Float32Array([
        -1, 3, 0, 2,
        -1, -1, 0, 0,
        3, -1, 2, 0,
    ]);
    const quad = new ArrayBuffer(gl, quadData);

    quad.attrib('aPosition', 2, gl.FLOAT);
    quad.attrib('aTexCoord', 2, gl.FLOAT);

    const texture = new Texture2D(gl);
    texture.repeat();

    const img = new Image();
    img.src = noiseSrc;
    img.onload = () => {
        texture.fromImage(img);
    }

    const vertexShader = `
        attribute vec2 aPosition;
        attribute vec2 aTexCoord;

        varying vec2 vUv;

        void main(void){
            gl_Position = vec4(aPosition, 0.0, 1.0);
            vUv = aTexCoord;
        }
    `
    const fragmentShader = `
        precision lowp float;

        uniform float uTime;
        uniform sampler2D tNoise;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec4 uParams;
        uniform vec3 uGrainParams;

        varying vec2 vUv;

        float random(vec2 coords, float time) {
            return fract(sin(dot(coords.xy, vec2(12.9898,78.233))) * 43758.5453 + time);
        }

        void main(void){
            float uSpeed = uParams.x;
            float uForce = uParams.y;
            float uSize = uParams.z;
            float uAlpha = uParams.w;

            float uGrainForce = uGrainParams.x;
            float uGrainSize = uGrainParams.y;
            float uGrainSpeed = uGrainParams.z;
            float NOISE_GRANULARITY = uGrainForce/255.0;

            float time = uTime * .00002 * uSpeed;

            float fbm1 = (texture2D(tNoise, mod(vUv * uSize * 0.7 - time, 1.)).r);
            float fbm2 = (texture2D(tNoise, mod(vUv * uSize + time * 0.7, 1.)).g);
            float fbm3 = (texture2D(tNoise, mod(vUv * uSize - vec2(time * 1.1, 0.), 1.)).r);
            
            float noisedValue = fbm1 * fbm2 * fbm3;
            vec3 mixedColor = mix(uColor1, uColor2, noisedValue * uForce);
            vec3 ditheredColor = mixedColor + mix(-NOISE_GRANULARITY, NOISE_GRANULARITY, random(floor(vUv * uGrainSize) / uGrainSize, uTime * .001 * uGrainSpeed));
            
            gl_FragColor = vec4(mix(vec3(0.), ditheredColor, uAlpha), 1.);
        }
    `

    const prg = new Program(gl, vertexShader, fragmentShader);

    let rafID = null;

    const render = (time = 0) => {
        gl.viewport(0, 0, size.width, size.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        prg.use();
        prg.uTime(time);
        prg.tNoise(texture);
        prg.uColor1(PARAMS.color1f);
        prg.uColor2(PARAMS.color2f);
        prg.uParams(PARAMS.speed, PARAMS.force, PARAMS.size, PARAMS.alpha);
        prg.uGrainParams(PARAMS.grainForce, 1 / PARAMS.grainSize * 100, PARAMS.grainSpeed);

        quad.attribPointer(prg);
        quad.drawTriangles();

        rafID = window.requestAnimationFrame(render);
    }

    setTimeout(render, 0);

}
</script>

<template>
    <div>
        <div class="w-full h-full fixed top-0 left-0 -z-10">
            <canvas class="w-full h-full" ref="canvas" />
        </div>
    </div>
</template>
