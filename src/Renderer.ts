import { vec2 } from "gl-matrix"

export interface Renderer {
    /**
     * 
     */
    drawImage(id: number, image: HTMLImageElement, position: vec2): void
}