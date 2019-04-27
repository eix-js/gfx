import { vec2 } from "gl-matrix"
import { spriteComponent } from "./renderingJobs/sprite"

export class CanvasRenderer {
    private ctx: CanvasRenderingContext2D
    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")
    }

    drawImage(id: number, image: spriteComponent, position: vec2, scale: vec2, rotation: number): void {
        this.ctx.save()
        this.ctx.translate(position[0], position[1])
        this.ctx.rotate(rotation)
        this.ctx.drawImage(image.image, 0, 0, scale[0], scale[1])
        this.ctx.restore()
    }
}
