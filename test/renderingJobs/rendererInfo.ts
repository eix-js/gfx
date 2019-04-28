import { rendererInfoJob } from "../../src/main"
import { Renderer } from "../../src/Renderer"
import { ECS, JobSystem } from "@eix/core"
import { vec2 } from "gl-matrix";
import { expect } from "chai"
import { RendererInfo } from "../../src/RendererInfo";


describe("Test RendererInfo", () => {
    // pick random width and height
    const width = Math.floor(Math.random() * 200 + 200)
    const height = Math.floor(Math.random() * 200 + 200)
    // create ECS
    const ecs = new ECS()
    // create job system
    const jobSystem = new JobSystem()
    // create renderer
    let renderer: Renderer = {
        drawImage: () => { },
        drawRect: () => { },
        rendererInfo: {
            width,
            height
        },
        canvas: null
    }
    // add draw task
    jobSystem.addTask("draw", [ecs, renderer])
    // add rendererInfo job
    jobSystem.tasks.draw.addJob("rendererInfo", rendererInfoJob)
    // run the task
    jobSystem.tasks.draw.runJobs([])
    it("should create a RendererInfo component", () => {
        // check that there is a rendererInfo component
        expect(ecs.all.has("rendererInfo").get("rendererInfo").tracked.length).greaterThan(0)
    })
    it("should create a RendererInfo component with the correct width and height", () => {
        // check that there is a rendererInfo component
        const rendererInfo: RendererInfo = ecs.all.has("rendererInfo").get("rendererInfo").tracked[0].rendererInfo
        // check that the width and height are correct
        expect(rendererInfo.width).to.be.equal(width)
        expect(rendererInfo.height).to.be.equal(height)
    })
})