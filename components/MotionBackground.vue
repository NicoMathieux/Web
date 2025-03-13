<script setup lang="ts">
import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";
import Texture2D from "nanogl/texture-2d";
import { Pane } from "tweakpane";
import noiseSrc from "/assets/images/fbm-noise-pack.png"
import { TweakpaneColor } from "../utils/tweakpane";

const canvas = ref<HTMLCanvasElement | null>(null);
const PARAMS = {
    speed: 2.5,
    force: 5,
    size: 0.2,
    alpha: 1,
    color1: { r: 0.43, g: 0.35, b: 0.25 },
    color1f: [0.43, 0.35, 0.25],
    color2: { r: 0.93, g: 0.73, b: 0.54 },
    color2f: [0.93, 0.73, 0.54],
};
const UIColor = ref<string>("white");

onMounted(() => {
    const pane = new Pane();
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
    folder.addBinding(UIColor, 'value', {
        label: "Couleur de texte",
        options: {
            "Blanc": "white",
            "Noir": "black"
        }
    });
    folder.addButton({
        title: 'Copier les paramètres',
    }).on('click', () => {
        navigator.clipboard.writeText(JSON.stringify({ ...PARAMS, uiColor: UIColor.value }));
        alert("✅ Paramètres copiés dans le presse-papier !")
    });

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

        varying vec2 vUv;

        const float NOISE_GRANULARITY = 5./255.0;

        float random(vec2 coords, float time) {
            return fract(sin(dot(coords.xy, vec2(12.9898,78.233))) * 43758.5453 + time);
        }

        void main(void){
            float uSpeed = uParams.x;
            float uForce = uParams.y;
            float uSize = uParams.z;
            float uAlpha = uParams.w;

            float time = uTime * .00002 * uSpeed;

            float fbm1 = (texture2D(tNoise, mod(vUv * uSize * 0.7 - time, 1.)).r);
            float fbm2 = (texture2D(tNoise, mod(vUv * uSize + time * 0.7, 1.)).g);
            float fbm3 = (texture2D(tNoise, mod(vUv * uSize - vec2(time * 1.1, 0.), 1.)).r);
            
            float noisedValue = fbm1 * fbm2 * fbm3;
            vec3 mixedColor = mix(uColor1, uColor2, noisedValue * uForce);
            vec3 ditheredColor = mixedColor + mix(-NOISE_GRANULARITY, NOISE_GRANULARITY, random(vUv, uTime * .0001));
            
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

        quad.attribPointer(prg);
        quad.drawTriangles();

        rafID = window.requestAnimationFrame(render);
    }

    setTimeout(render, 0);

}
</script>

<template>
    <div>
        <img :src="`/assets/images/ui_${UIColor}.png`" class="absolute z-10 w-full" />
        <div class="w-full h-full fixed top-0 left-0">
            <canvas class="w-full h-full" ref="canvas" />
        </div>
    </div>
</template>
