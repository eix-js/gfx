import { vec2 } from "gl-matrix"
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

    drawImage(id: number, image: spriteComponent, position: vec2, scale: vec2, rotation: number): void {
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