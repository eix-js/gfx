import { Renderer } from "../interfaces/Renderer"
import { ECS, idKey } from "@eix/core"

/**
 * sprite rendering job. renders entities with the spriteComponent component.
 */
export const rendererInfoJob = ([env, backend]: [ECS, Renderer]) => {
    return () => {
        // add a new entity with the specified component
        env.addEntityFlowGroup().addComponent("rendererInfo", backend.rendererInfo)
    }
}