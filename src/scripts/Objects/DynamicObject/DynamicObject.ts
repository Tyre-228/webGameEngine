import Rectangle from "../../Shapes/Rectangle/Rectangle"

class DynamicObject {
    public rect: Rectangle
    private gravity: number
    private screenHeight: number

    constructor(x: number, y: number, width: number, height: number, color: string, gravity: number, screenHeight: number) {
        this.rect = new Rectangle(x, y, width, height)
        this.gravity = gravity
        this.screenHeight = screenHeight    
    }

    private gravityHandler() {
        const [x, y] = this.rect.position.getCoords()

        if(this.rect.bottom < this.screenHeight) {
            this.rect.updatePosiiton(x, y+this.gravity)
        }
    }

    update() {
        this.gravityHandler()
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.rect.draw(ctx)
    }
}

export default DynamicObject