import { Renderer } from "../Renderer"
import { ECS, idKey } from "@eix/core"
import { vec2, vec3 } from "gl-matrix"

/**
 * rect component
*/
interface rectComponent {
    color: vec3
}

/**
 * rect rendering job. renders entities with the rectComponent component.
 */
const rectRenderingJob = ([env, backend]: [ECS, Renderer]) => {
    const components = env.all
        .has("rect", "position", "scale", "rotation")
        .get("rect", "position", "scale", "rotation")

    return () => {
        components.tracked.forEach(component => {
            // get components
            const rect: rectComponent = component.rect
            const position: vec2 = component.position
            const scale: vec2 = component.scale
            const rotation: number = component.rotation
            // draw it
            backend.drawRect(rect.color, position, scale, rotation)
        })
    }
}

export { rectComponent, rectRenderingJob }