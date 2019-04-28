import { vec2, vec3 } from "gl-matrix"
import { Drawable } from "../interfaces/Drawable"
import { Renderer } from "../interfaces/Renderer";
import { RendererInfo } from "../interfaces/RendererInfo"

export class CanvasRenderer implements Renderer {
    private ctx: CanvasRenderingContext2D
    rendererInfo: RendererInfo
    private toDraw: { [layer: number]: Drawable[] }

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")
        this.rendererInfo = new CanvasRendererInfo(this.canvas)
        this.ctx.save()
    }

    drawDrawable(_id: number, drawable: Drawable) {
        this.toDraw[drawable.layer].push(drawable)
    }

    draw() {
        for (const layer in this.toDraw) {
            for (const drawable of this.toDraw[layer]) {
                drawable
            }
        }
    }

    clear() {
        this.ctx.restore()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save()
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