import { Pane } from "tweakpane";

export const TweakpaneColor = (pane: Pane, container: Object, prop: string, target: string, options: Object) => {
    pane.addBinding(container, prop, {
        color: { type: 'float' },
        ...options
    }).on("change", (e) => {
        container[target] = [e.value.r, e.value.g, e.value.b];
    })
}