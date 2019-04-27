import { vec2 } from "gl-matrix"
import { spriteComponent } from "./renderingJobs/sprite";

export interface Renderer {
    /**
     * draw a sprite
     * @param id ID of the sprite
     * @param image image to draw
     * @param position position to draw at
     * @param scale scale of the image
     * @param rotation rotation of the image
     */
    drawImage(id: number, image: spriteComponent, position: vec2, scale: vec2, rotation: number): void
    /**
     * get the underlying HTML element
     */
    readonly canvas: any
}