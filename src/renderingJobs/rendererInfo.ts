import { Renderer } from "../interfaces/Renderer"
import { ECS, idKey } from "@eix/core"

/**
 * renderer info job. adds information about the renderer to ECS
 */
export const rendererInfoJob = ([env, backend]: [ECS, Renderer]) => {
    return () => {
        // add a new entity with the renderer info
        env.addEntityFlowGroup().addComponent("rendererInfo", backend.rendererInfo)
    }
}
