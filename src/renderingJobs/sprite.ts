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
}

/**
 * sprite rendering job. renders entities with the spriteComponent component.
 */
export const spriteRenderingJob = ([env, backend]: [ECS, Renderer]) => {
    // get all sprites
    const sprites = env.all
        .has("sprite")
        .get("sprite", "position")

    return () => {
        sprites.tracked.forEach((component) => {
            // get components
            const sprite: spriteComponent = component["sprite"]
            const position: vec2 = component["position"]
            const id = component[idKey]
            // draw it
            backend.drawImage(id, sprite.image, position)
        })
    }
}