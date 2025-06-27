import Vector from "../../DataStructures/Vector/Vector"
import { physicalObjectType } from "../../helpers/GlobalTypes"

class Camera {
    private ctx: CanvasRenderingContext2D
    private screenWidth: number
    private screenHeight: number
    public objectToFollow: physicalObjectType | undefined
    public position: Vector

    public smoothMode: boolean
    public speed: number

    constructor(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number) {
        this.ctx = ctx
        this.screenWidth = screenWidth
        this.screenHeight = screenHeight
        this.objectToFollow = undefined
        this.position = new Vector(0, 0)

        this.smoothMode = false
        this.speed = 1
    }

    public moveCamera(x: number, y: number) {
        if(this.smoothMode === false) {
            const xOffset = x - this.position.x
            const yOffset = y - this.position.y

            this.ctx.translate(-xOffset, -yOffset)
            this.position.x = x
            this.position.y = y
        }
        else {
            if(x > this.position.x) {
                this.position.x += this.speed
            }
            if(x < this.position.x) {
                this.position.x -= this.speed
            }
            if(y > this.position.y) {
                this.position.y += this.speed
            }
            if(y < this.position.y) {
                this.position.y -= this.speed
            }
        }
    }

    public attachCamera(object: physicalObjectType) {
        this.objectToFollow = object
    }

    update() {
        if(this.objectToFollow !== undefined) {
            const x = this.objectToFollow.rect.position.x + this.objectToFollow.rect.width / 2 - this.screenWidth / 2
            const y = this.objectToFollow.rect.position.y + this.objectToFollow.rect.height / 2 - this.screenHeight / 2

            this.moveCamera(x, y)
        }
    }
}

export default Camera