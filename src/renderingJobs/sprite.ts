import { Renderer } from "../Renderer"
import { ECS } from "@eix/core"
import { vec2 } from "gl-matrix";
/**
 * sprite component
 */
export interface spriteComponent {
    /**
     * sprite's image
     */
    image: HTMLImageElement
    /**
     * sprite's position
     */
    position: vec2
    /**
     * ID of the sprite
     */
    id: number
}

/**
 * sprite rendering job. renders entities with the spriteComponent component.
 */
export const spriteRenderingJob = ([env, backend]: [ECS, Renderer]) => {
    // get all sprites
    const sprites = env.all
        .has("sprite")
        .get("sprite")

    return () => {
        sprites.tracked.forEach(({ sprite }: { sprite: spriteComponent }) => {
            backend.drawImage(sprite.id, sprite.image, sprite.position)
        })
    }
}