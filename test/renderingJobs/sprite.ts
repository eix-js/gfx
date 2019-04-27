import { spriteRenderingJob, spriteComponent } from "../../src/main"
import { Renderer } from "../../src/Renderer"
import { ECS, JobSystem } from "@eix/core"
import { vec2 } from "gl-matrix";
import { expect } from "chai"

// ugly stuff
class HTMLImageElement { }

describe("Test sprite", () => {
    // create ECS
    const ecs = new ECS()
    // create job system
    const jobSystem = new JobSystem()
    // create renderer
    let renderer: Renderer = {
        drawImage: () => { },
        canvas: null
    }
    // create render task
    jobSystem.addTask("draw", [ecs, renderer])
    // add sprite renderer to the task
    jobSystem.tasks.draw.addJob("spriteRenderer", spriteRenderingJob)
    it("should be able to run the job with no sprites", () => {
        jobSystem.tasks.draw.runJobs([])
    })
    it("should be able to able to run the job with one sprite", (done) => {
        // create entity
        ecs.addEntityFlowGroup()
            .addComponent("position", vec2.set(vec2.create(), 0, 0))
            .addComponent("sprite", 1)
            .addComponent("rotation", 0)
            .addComponent("scale", vec2.set(vec2.create(), 0, 0))

        const entity = ecs.all
            .has("position", "sprite", "scale", "rotation")
            .get("position", "sprite", "scale", "rotation")
            .tracked[0]

        entity.sprite = {
            image: new HTMLImageElement()
        }

        // create renderer
        let renderer: Renderer = {
            drawImage: (id: number, image: spriteComponent, position: vec2, scale: vec2, rotation: number) => {
                done()
            },
            canvas: null
        }
        // create render task
        jobSystem.tasks.draw.setArgs([ecs, renderer])
        // add sprite renderer to the task
        jobSystem.tasks.draw.addJob("spriteRenderer", spriteRenderingJob)
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

        const entity = ecs.all
            .get("position", "sprite", "scale", "rotation")
            .tracked[0]

        entity.sprite = {
            image: new HTMLImageElement()
        }
        entity.position = vec2.set(vec2.create(), x, y)
        entity.scale = vec2.set(vec2.create(), sX, sY)
        entity.rotation = r

        // create new renderer
        renderer = {
            drawImage: (id: number, image: spriteComponent, position: vec2, scale: vec2, rotation: number) => {
                expect(position[0]).to.be.approximately(x, 0.01)
                expect(position[1]).to.be.approximately(y, 0.01)
                expect(scale[0]).to.be.approximately(sX, 0.01)
                expect(scale[1]).to.be.approximately(sY, 0.01)
                expect(rotation).to.be.approximately(r, 0.01)
                done()
            },
            canvas: null
        }
        jobSystem.tasks.draw.setArgs([ecs, renderer])
        // add sprite renderer to the task
        jobSystem.tasks.draw.addJob("spriteRenderer", spriteRenderingJob)
        // run jobs
        jobSystem.tasks.draw.runJobs([])
    })
})