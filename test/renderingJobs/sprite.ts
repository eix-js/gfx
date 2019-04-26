import { spriteRenderingJob } from "../../src/main"
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
    let renderer: Renderer<void, null> = {
        drawImage: (_id, _image, _position) => { },
        canvas: null
    }
    // create render task
    jobSystem.addTask("draw", [ecs, renderer])
    // add sprite renderer to the task
    jobSystem.tasks.draw.addJob("spriteRenderer", spriteRenderingJob)
    it("should be able to run the job with no sprites", () => {
        jobSystem.tasks.draw.runJobs([])
    })
    it("should be able to able to run the job with one sprite", () => {
        ecs.addEntity()
        ecs.entities[0].sprite = {
            image: new HTMLImageElement()
        }
        ecs.entities[0].position = vec2.set(vec2.create(), 0, 0)
        jobSystem.tasks.draw.runJobs([])
    })
    it("should be able to able to use the right position", () => {
        // pick random numbers for coordinates
        const x = Math.random()
        const y = Math.random()
        // create new renderer
        renderer = {
            drawImage: (_id, _image, position: vec2) => {
                expect(position[0]).to.be.eq(x)
                expect(position[0]).to.be.eq(y)
            },
            canvas: null
        }
        // recreate render task
        jobSystem.addTask("draw", [ecs, renderer])
        // set entity position
        ecs.entities[0].position = vec2.set(vec2.create(), x, y)
        // run jobs
        jobSystem.tasks.draw.runJobs([])
    })
})