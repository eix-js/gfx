import { vec2, vec3 } from "gl-matrix"
import { spriteComponent } from "./renderingJobs/sprite"
import { RendererInfo } from "./RendererInfo"

export interface Renderer {
    /**
     * draw a rectangle
     * @param color color of the rectangle
     * @param position position of the rectangle
     * @param scale scale of the rectangle
     * @param rotation rotation of the rectangle
     */
    drawRect(color: vec3, position: vec2, scale: vec2, rotation: number): void
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
     * get the renderer info
     */
    rendererInfo: RendererInfo
    /**
     * get the underlying HTML element
     */
    readonly canvas: any
}