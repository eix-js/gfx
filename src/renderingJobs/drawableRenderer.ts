import { Renderer } from "../interfaces/Renderer"
import { ECS, idKey } from "@eix/core"
import { Drawable } from "../interfaces/Drawable";

/**
 * drawable rendering job, renders entities with the drawable component.
 */
export const drawableRenderer = ([env, backend]: [ECS, Renderer]) => {
    let tracked = env.all.has("drawable").get("drawable").tracked
    ecs.on("update", () => {
        tracked = env.all.has("drawable").get("drawable").tracked
    })
    return () => {
        tracked.forEach((component: any) => {
            // get components
            const drawable: Drawable = component.drawable
            const id = component[idKey]
            // draw it
            backend.drawDrawable(id, drawable)
        })
    }
}
