import Vector from "../../DataStructures/Vector/Vector"

class Rectangle {
    position: Vector
    width: number
    height: number
    left: number
    right: number
    top: number
    bottom: number

    leftTop: number[]
    leftCenter: number[]
    leftBottom: number[]
    rightTop: number[]
    rightCenter: number[]
    rightBottom: number[]
    topCenter: number[]
    bottomCenter: number[]
    center: number[]
    

    constructor(x: number, y: number, width: number, height: number) {
        this.position = new Vector(x, y)
        this.width = width
        this.height = height
        this.left = this.position.x
        this.right = this.position.x + this.width
        this.top = this.position.y
        this.bottom = this.position.y + this.height

        this.leftTop = [this.position.x, this.position.y]
        this.leftBottom = [this.position.x, this.position.y + this.height]
        this.rightTop = [this.position.x + this.width, this.position.y]
        this.rightBottom = [this.position.x + this.width, this.position.y + this.height]
        this.center = [this.position.x + this.width/2, this.position.y + this.height/2]
        this.leftCenter = [this.position.x, this.position.y + this.height/2]
        this.rightCenter = [this.position.x + this.width, this.position.y + this.height/2]
        this.topCenter = [this.position.x + this.width/2, this.position.y]
        this.bottomCenter = [this.position.x + this.width/2, this.position.y + this.height]
    }

    updatePosiiton(x: number, y: number) {
        this.position.x = x
        this.position.y = y

        // update sides according to new coordinates
        this.left = this.position.x
        this.right = this.position.x + this.width
        this.top = this.position.y
        this.bottom = this.position.y + this.height

        this.leftTop = [this.position.x, this.position.y]
        this.leftBottom = [this.position.x, this.position.y + this.height]
        this.rightTop = [this.position.x + this.width, this.position.y]
        this.rightBottom = [this.position.x + this.width, this.position.y + this.height]
        this.center = [this.position.x + this.width/2, this.position.y + this.height/2]
        this.leftCenter = [this.position.x, this.position.y + this.height/2]
        this.rightCenter = [this.position.x + this.width, this.position.y + this.height/2]
        this.topCenter = [this.position.x + this.width/2, this.position.y]
        this.bottomCenter = [this.position.x + this.width/2, this.position.y + this.height]
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export default Rectangle