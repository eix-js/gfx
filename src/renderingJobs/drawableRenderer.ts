import { Renderer } from "../interfaces/Renderer"
import { ECS, idKey } from "@eix/core"
import { Drawable } from "../interfaces/Drawable";

/**
 * drawable rendering job, renders entities with the drawable component.
 */
export const drawableRenderer = ([env, backend]: [ECS, Renderer]) => {
    // get all drawables
    const components = env.all
        .has("drawable").get("drawable")

    return () => {
        components.tracked.forEach(component => {
            // get components
            const drawable: Drawable = component.drawable
            const id = component[idKey]
            // draw it
            backend.drawDrawable(id, drawable)
        })
    }
}