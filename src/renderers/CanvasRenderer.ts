import { vec2, vec3 } from "gl-matrix"
import { Drawable } from "../interfaces/Drawable"
import { Renderer } from "../interfaces/Renderer";
import { RendererInfo } from "../interfaces/RendererInfo"

export class CanvasRenderer implements Renderer {
    private ctx: CanvasRenderingContext2D
    rendererInfo: RendererInfo
    private toDraw: Drawable[][] = []
    private frame: number = 0
    private drawFrame: number = -1

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")
        this.rendererInfo = new CanvasRendererInfo(this.canvas)
        this.ctx.save()
    }

    drawDrawable(_id: number, drawable: Drawable) {
        if (this.drawFrame != this.frame) {
            this.drawFrame = this.frame
            this.toDraw[drawable.layer] = []
        }
        this.toDraw[drawable.layer].push(drawable)
    }

    draw() {
        this.toDraw.forEach(layer => {
            layer.forEach(drawable => {
                this.drawDrawableCanvas(drawable)
            })
        })
        this.frame++
    }

    private drawDrawableCanvas(drawable: Drawable) {
        this.ctx.save()
        this.ctx.translate(drawable.position[0], drawable.position[1])
        this.ctx.rotate(drawable.rotation)
        switch (drawable.drawableContent.type) {
            case "rect":
                const color = drawable.drawableContent.color
                this.ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`
                this.ctx.fillRect(0, 0, drawable.scale[0], drawable.scale[1])
                break
            case "sprite":
                this.ctx.drawImage(
                    drawable.drawableContent.image,
                    0, 0,
                    drawable.scale[0], drawable.scale[1])
                break
        }
        this.ctx.restore()
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
