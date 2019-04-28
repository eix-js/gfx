import { vec2, vec3 } from "gl-matrix";

/**
 * describes a component that can be drawn
 */
interface Drawable {
    /**
     * the layer to draw on
     */
    layer: number
    /**
     * the position of the drawable
     */
    position: vec2
    /**
     * the scale of the drawable
     */
    scale: vec2
    /**
     * the rotation of the drawable
     */
    rotation: number
    /**
     * the content that will be drawn
     */
    drawableContent: DrawableContent
}

type DrawableContent = Rect | Sprite

interface Rect {
    type: "rect"
    color: vec3
}

interface Sprite {
    type: "sprite"
    image: HTMLImageElement
}

export { Drawable, DrawableContent, Rect, Sprite }
