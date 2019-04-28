import { vec2, vec3 } from "gl-matrix"
import { spriteComponent } from "./renderingJobs/sprite"
import { Renderer } from "./Renderer";
import { RendererInfo } from "./RendererInfo"

export class CanvasRenderer implements Renderer {
    private ctx: CanvasRenderingContext2D
    rendererInfo: RendererInfo

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")
        this.rendererInfo = new CanvasRendererInfo(this.canvas)
    }

    drawRect(color: vec3, position: vec2, scale: vec2, rotation: number) {
        this.ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        this.ctx.fillRect(position[0], position[1], scale[0], scale[1])
    }

    drawImage(_id: number, image: spriteComponent, position: vec2, scale: vec2, rotation: number): void {
        this.ctx.save()
        this.ctx.translate(position[0], position[1])
        this.ctx.rotate(rotation)
        this.ctx.drawImage(image.image, 0, 0, scale[0], scale[1])
        this.ctx.restore()
    }
}

class CanvasRendererInfo implements RendererInfo {
    constructor(private canvas: HTMLCanvasElement) { }

    get width() {
        return this.canvas.width
    }

    get height() {
        return this.canvas.height
    }
}