import { Drawable } from "./Drawable"
import { RendererInfo } from "./RendererInfo"

export interface Renderer {
    /**
     * draw a drawable object
     * @param id the drawable's ID
     * @param drawable
     */
    drawDrawable(id: number, drawable: Drawable): void
    /**
     * draws all registered objects
     */
    draw(): void
    /**
     * clears the renderer
     */
    clear(): void
    /**
     * get the renderer info
     */
    rendererInfo: RendererInfo
    /**
     * get the underlying HTML element
     */
    readonly canvas: any
}