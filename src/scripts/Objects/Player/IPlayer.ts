import { physicalObjectType } from "../../helpers/GlobalTypes"
import { TextureType } from "../../helpers/GlobalTypes"
import Rectangle from "../../Shapes/Rectangle/Rectangle"

interface IPlayer {
    rect: Rectangle
    texture: TextureType

    // called when player collides with another object
    collisionHandler(collidedObject: physicalObjectType): void
    // called after each frame to update player stats
    update(): void
    // draw the texture
    draw(ctx: CanvasRenderingContext2D): void
}

export default IPlayer