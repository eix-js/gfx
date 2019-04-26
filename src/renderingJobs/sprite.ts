import { Renderer } from "../Renderer"
import { ECS, idKey } from "@eix/core"
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
        sprites.tracked.forEach((component) => {
            const sprite: spriteComponent = component["sprite"]
            const id = component[idKey]
            backend.drawImage(id, sprite.image, sprite.position)
        })
    }
}