import { ECS, JobSystem, JobSystemUndecorated } from "@eix/core"
import { Renderer, drawableRenderer, Rect, Drawable, DrawableContent, Sprite } from "../../src/main"
import { vec2, vec3 } from "gl-matrix"
import { expect } from "chai"

/**
 * generate a random value
 * @param from the lowest number (inclusive)
 * @param to the highest number (exclusive)
 * @param floor should the output be an integer?
 */
function random(from: number, to: number, floor: boolean = false): number {
    const randomValue = Math.random() * (to - from) + from
    return floor ? Math.floor(randomValue) : randomValue
}

describe("Test drawableRenderer", () => {
    // create ECS
    const ecs: ECS = new ECS()
    // create job system
    const jobSystem: JobSystem = new JobSystemUndecorated()
    // create renderer
    let renderer: Renderer = {
        drawDrawable: () => { },
        draw: () => { },
        clear: () => { },
        rendererInfo: {
            width: 100,
            height: 100,

        },
        canvas: null
    }
    // add update task
    jobSystem.addTask("draw", [ecs, renderer])
    it("should render with no drawable entities", () => {
        // add drawable renderer
        jobSystem.tasks.draw.addJob("drawableRenderer", drawableRenderer)
        // run the jobs
        jobSystem.tasks.draw.runJobs(null)
    })
    // generate random values
    // pick random layer
    const layer = random(-100, 100, true)
    // pick random numbers for coordinates
    const x = random(0, 400)
    const y = random(0, 400)
    // pick random numbers for rotation
    const rotation = random(0, Math.PI)
    // pick random numbers for scale
    const sX = random(10, 400)
    const sY = random(10, 400)
    // pick random numbers for color (rectangle)
    const rectR = random(0, 1)
    const rectG = random(0, 1)
    const rectB = random(0, 1)
    // add drawable content
    let drawableContent: DrawableContent = {
        color: vec3.fromValues(rectR, rectG, rectB),
        type: "rect"
    }

    it("should render with one drawable entity (rect)", (done) => {
        // add the entity
        ecs.addEntityFlowGroup()
            .addComponent("drawable", {
                layer,
                position: vec2.fromValues(x, y),
                scale: vec2.fromValues(sX, sY),
                rotation,
                drawableContent
            })
        // replace renderer
        renderer = {
            drawDrawable: () => done(),
            draw: () => { },
            clear: () => { },
            rendererInfo: {
                width: 100,
                height: 100,

            },
            canvas: null
        }
        jobSystem.tasks.draw.setArgs([ecs, renderer])
        // replace job
        jobSystem.tasks.draw.jobs.drawableRenderer = undefined
        jobSystem.tasks.draw.addJob("drawableRenderer", drawableRenderer)
        // run draw task
        jobSystem.tasks.draw.runJobs(null)
    })

    it("should render with one drawable entity (rect) and the correct values", (done) => {
        // replace renderer
        renderer = {
            drawDrawable: (id, drawable: Drawable) => {
                // check if values are equal
                expect(drawable.layer).to.be.equal(layer)
                expect(drawable.position[0]).to.be.approximately(x, 0.01)
                expect(drawable.position[1]).to.be.approximately(y, 0.01)
                expect(drawable.scale[0]).to.be.approximately(sX, 0.01)
                expect(drawable.scale[1]).to.be.approximately(sY, 0.01)
                // check if rects are equal
                const drawableContent = drawable.drawableContent as Rect
                expect(drawableContent.color[0]).to.be.approximately(rectR, 0.01)
                expect(drawableContent.color[1]).to.be.approximately(rectG, 0.01)
                expect(drawableContent.color[2]).to.be.approximately(rectB, 0.01)
                // pass test
                done()
            },
            draw: () => { },
            clear: () => { },
            rendererInfo: {
                width: 100,
                height: 100,

            },
            canvas: null
        }
        jobSystem.tasks.draw.setArgs([ecs, renderer])
        // replace job
        jobSystem.tasks.draw.jobs.drawableRenderer = undefined
        jobSystem.tasks.draw.addJob("drawableRenderer", drawableRenderer)
        // run draw task
        jobSystem.tasks.draw.runJobs(null)
    })

    // generate random image (placeholder)
    const image = random(-1000, 1000) as unknown as HTMLImageElement
    // add drawable content
    let drawableContentSprite: Sprite = { image, type: "sprite" }

    it("should render with one drawable entity (sprite)", (done) => {
        // remove the existing entity
        delete ecs.entities[0]
        // add the entity
        ecs.addEntityFlowGroup()
            .addComponent("drawable", {
                layer,
                position: vec2.fromValues(x, y),
                scale: vec2.fromValues(sX, sY),
                rotation,
                drawableContent: drawableContentSprite
            })
        // replace renderer
        renderer = {
            drawDrawable: () => done(),
            draw: () => { },
            clear: () => { },
            rendererInfo: {
                width: 100,
                height: 100,

            },
            canvas: null
        }
        jobSystem.tasks.draw.setArgs([ecs, renderer])
        // replace job
        jobSystem.tasks.draw.jobs.drawableRenderer = undefined
        jobSystem.tasks.draw.addJob("drawableRenderer", drawableRenderer)
        // run draw task
        jobSystem.tasks.draw.runJobs(null)
    })

    it("should render with one drawable entity (rect) and the correct values", (done) => {
        // replace renderer
        renderer = {
            drawDrawable: (_id, drawable: Drawable) => {
                // check if values are equal
                expect(drawable.layer).to.be.equal(layer)
                expect(drawable.position[0]).to.be.approximately(x, 0.01)
                expect(drawable.position[1]).to.be.approximately(y, 0.01)
                expect(drawable.scale[0]).to.be.approximately(sX, 0.01)
                expect(drawable.scale[1]).to.be.approximately(sY, 0.01)
                // pass test
                done()
            },
            draw: () => { },
            clear: () => { },
            rendererInfo: {
                width: 100,
                height: 100,

            },
            canvas: null
        }
        jobSystem.tasks.draw.setArgs([ecs, renderer])
        // replace job
        jobSystem.tasks.draw.jobs.drawableRenderer = undefined
        jobSystem.tasks.draw.addJob("drawableRenderer", drawableRenderer)
        // run draw task
        jobSystem.tasks.draw.runJobs(null)
    })
})