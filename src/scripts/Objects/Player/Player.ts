import Vector from "../../DataStructures/Vector/Vector"
import { physicalObjectType } from "../../helpers/GlobalTypes"
import Rectangle from "../../Shapes/Rectangle/Rectangle"
import AnimatedTexture from "../../Textures/AnimatedTexture/AnimatedTexture"
import IPlayer from "./IPlayer"

class Player implements IPlayer {
    public rect: Rectangle
    public texture: AnimatedTexture

    private oldPosition: Vector
    private direction: string
    private speed: number
    private screenHeight: number

    // physical variables
    private density: number
    private area: number
    private mass: number
    private gravity: number
    private GRAVITY_CONSTANT: number

    constructor(x: number, y: number, width: number, height: number, gravity: number, density: number, screenHeight: number) {
        this.oldPosition = new Vector(x, y)
        this.rect = new Rectangle(x, y, width, height)
        this.texture = new AnimatedTexture("/src/assets/images/Modern tiles_Free/Characters_free/Adam_16x16.png", x, y, width, height, 0, 40, 16, 24, 6, 100)
        this.direction = ""
        this.speed = 10
        this.screenHeight = screenHeight

        // physical variables
        this.GRAVITY_CONSTANT = gravity
        this.area = width * height
        this.density = density
        this.mass = this.density * this.area
        this.gravity = this.GRAVITY_CONSTANT * this.mass

        // config
        this.movementInputHandler()
    }

    private movementHandler() {
        const [x, y] = this.rect.position.getCoords()

        if(this.direction === "up") {
            this.changePosition(x, y - this.speed)
        }
        else if(this.direction === "down") {
            this.changePosition(x, y + this.speed)
        }
        else if(this.direction === "left") {
            this.changePosition(x - this.speed, y)
        }
        else if(this.direction === "right") {
            this.changePosition(x + this.speed, y)
        }

        this.oldPosition.x = x
        this.oldPosition.y = y
    }

    private movementInputHandler() {
        // key flat is used so that the changes heppen only once after a key was pressed
        let keyDownFlag = false

        document.addEventListener("keydown", (event) => {
            if(keyDownFlag === false) {
                const keyPressed: string = event.code

                if(keyPressed === "KeyW") {
                    this.direction = "up"
                    this.texture.changeAnimation(96, 72, 6)
                }
                else if(keyPressed === "KeyS") {
                    this.direction = "down"
                    this.texture.changeAnimation(272, 72, 6)
                }
                else if(keyPressed === "KeyA") {
                    this.direction = "left"
                    this.texture.changeAnimation(192, 72, 6)
                }
                else if(keyPressed === "KeyD") {
                    this.direction = "right"
                    this.texture.changeAnimation(0, 72, 6)
                }
                else if(keyPressed === "KeyF") {
                    this.texture.changeAnimation(0, 192, 9)
                }
            }

            keyDownFlag = true
        })

        document.addEventListener("keyup", () => {
            this.direction = ""
            this.texture.changeAnimation(0, 40, 6)

            keyDownFlag = false
        })
    }

    private gravityHandler() {
        const [x, y] = this.rect.position.getCoords()

        if(this.rect.bottom + this.gravity < this.screenHeight) {
            this.rect.updatePosiiton(x, y+this.gravity)

            this.gravity = this.gravity * 1.1
        }
        else {
            this.rect.updatePosiiton(x, this.screenHeight - this.rect.height)
        }
    }

    private changePosition(x: number, y: number) {
        this.rect.updatePosiiton(x, y)

        this.texture.x = x
        this.texture.y = y
    }

    public collisionHandler(collidedObject: physicalObjectType) {
        if(this.oldPosition.x > this.rect.position.x) {
            const x = collidedObject.rect.right
            const y = this.rect.position.y

            this.changePosition(x, y)
        }
        if(this.oldPosition.x < this.rect.position.x) {
            const x = collidedObject.rect.left - this.rect.width
            const y = this.rect.position.y

            this.changePosition(x, y)
        }
        if(this.oldPosition.y > this.rect.position.y) {
            const y = collidedObject.rect.bottom
            const x = this.rect.position.x

            this.changePosition(x, y)
        }
        if(this.oldPosition.y < this.rect.position.y) {
            const y = collidedObject.rect.top - this.rect.height
            const x = this.rect.position.x

            this.changePosition(x, y)
        }
    }

    public update() {
        this.movementHandler()
        // this.gravityHandler()
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx)
    }
}

export default Player