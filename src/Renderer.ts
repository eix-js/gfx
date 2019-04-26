import { vec2 } from "gl-matrix"

export interface Renderer<I, C> {
    /**
     * draw an image to the canvas
     */
    drawImage(id: number, image: I, position: vec2): void
    /**
     * get the underlying HTML element
     */
    readonly canvas: C
}