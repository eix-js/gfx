import { spriteRenderingJob } from "../../src/main"
import { Renderer } from "../../src/Renderer"
import { ECS, JobSystem } from "@eix/core"
import { vec2 } from "gl-matrix";

// ugly stuff
class HTMLImageElement { }

describe("Test sprite", () => {
    // create ECS
    const ecs = new ECS()
    // create job system
    const jobSystem = new JobSystem()
    // create renderer
    const renderer: Renderer = {
        drawImage: (id, image, position) => { }
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
            position: vec2.set(vec2.create(), 0, 0),
            image: new HTMLImageElement()
        }
        jobSystem.tasks.draw.runJobs([])
    })
})