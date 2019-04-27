import { vec2 } from "gl-matrix"
import { spriteComponent } from "./renderingJobs/sprite"

export class CanvasRenderer {
    private ctx: CanvasRenderingContext2D
    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")
    }

    drawImage(id: number, image: spriteComponent, position: vec2): void {
        this.ctx.drawImage(image.image, position[0], position[1])
    }
}