import Vector from "../../DataStructures/Vector/Vector"

class TextObject {
    position: Vector
    color: string
    fontSize: number
    text: string

    constructor(x: number, y: number, text: string, color: string, fontSize: number) {
        this.position = new Vector(x, y)
        this.color = color
        this.fontSize = fontSize
        this.text = text
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.font = `${this.fontSize}px sans-serif`
        ctx.fillText(this.text, this.position.x, this.position.y)
    }
}

export default TextObject