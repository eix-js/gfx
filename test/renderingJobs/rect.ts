import { rectRenderingJob } from "../../src/main"
import { Renderer } from "../../src/Renderer"
import { ECS, JobSystemUndecorated } from "@eix/core"
import { vec2, vec3 } from "gl-matrix";
import { expect } from "chai"

describe("Test rect", () => {
    // create ECS
    const ecs = new ECS()
    // create job system
    const jobSystem = new JobSystemUndecorated()
    // create renderer
    let renderer: Renderer = {
        drawImage: () => { },
        drawRect: () => { },
        rendererInfo: {
            width: 100,
            height: 100
        },
        canvas: null
    }
    // create render task
    jobSystem.addTask("draw", [ecs, renderer])
    // add rect renderer to the task
    jobSystem.tasks.draw.addJob("rectRenderer", rectRenderingJob)
    it("should be able to run the job with no rects", () => {
        jobSystem.tasks.draw.runJobs([])
    })
    it("should be able to able to run the job with one rect", (done) => {
        // create entity
        ecs.addEntityFlowGroup()
            .addComponent("position", vec2.set(vec2.create(), 0, 0))
            .addComponent("rect", {
                "color": vec3.fromValues(0, 0, 0)
            })
            .addComponent("rotation", 0)
            .addComponent("scale", vec2.set(vec2.create(), 0, 0))

        // create renderer
        let renderer: Renderer = {
            drawRect: () => {
                done()
            },
            drawImage: () => { },
            rendererInfo: {
                width: 100,
                height: 100
            },
            canvas: null
        }
        // set renderer
        jobSystem.tasks.draw.setArgs([ecs, renderer])
        // add rect renderer to the task
        jobSystem.tasks.draw.addJob("rectRenderer", rectRenderingJob)
        // run jobs
        jobSystem.tasks.draw.runJobs([])
    })
    it("should be able to able to use the right position, rotation and scale", (done) => {
        // pick random numbers for coordinates
        const x = Math.random()
        const y = Math.random()
        // pick random numbers for rotation
        const r = Math.random()
        // pick random numbers for scale
        const sX = Math.random()
        const sY = Math.random()
        // pick random numbers for color
        const cR = Math.random()
        const cG = Math.random()
        const cB = Math.random()

        const entity = ecs.all
            .get("position", "rect", "scale", "rotation")
            .tracked[0]
        entity.rect = {
            color: vec3.fromValues(cR, cG, cB)
        }
        entity.position = vec2.set(vec2.create(), x, y)
        entity.scale = vec2.set(vec2.create(), sX, sY)
        entity.rotation = r

        // create new renderer
        renderer = {
            drawImage: () => { },
            drawRect: (color: vec3, position: vec2, scale: vec2, rotation: number) => {
                expect(position[0]).to.be.approximately(x, 0.01)
                expect(position[1]).to.be.approximately(y, 0.01)
                expect(scale[0]).to.be.approximately(sX, 0.01)
                expect(scale[1]).to.be.approximately(sY, 0.01)
                expect(rotation).to.be.approximately(r, 0.01)
                expect(color[0]).to.be.approximately(cR, 0.01)
                expect(color[1]).to.be.approximately(cG, 0.01)
                expect(color[2]).to.be.approximately(cB, 0.01)
                done()
            },
            rendererInfo: {
                width: 100,
                height: 100
            },
            canvas: null
        }
        jobSystem.tasks.draw.setArgs([ecs, renderer])
        // add rect renderer to the task
        jobSystem.tasks.draw.addJob("rectRenderer", rectRenderingJob)
        // run jobs
        jobSystem.tasks.draw.runJobs([])
    })
})