import { TextureType } from "../../helpers/GlobalTypes"
import Rectangle from "../../Shapes/Rectangle/Rectangle"
import RectTexture from "../../Textures/RectTexture/RectTexture"

class StaticObject {
    public rect: Rectangle
    public texture: TextureType

    constructor(x: number, y: number, width: number, height: number, texture: TextureType) {
        this.rect = new Rectangle(x, y, width, height)
        this.texture = texture
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx)
    }
}

export default StaticObject