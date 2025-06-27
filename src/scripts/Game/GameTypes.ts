import Player from "../Objects/Player/Player";
import StaticObject from "../Objects/StaticObject/StaticObject";
import DynamicObject from "../Objects/DynamicObject/DynamicObject";
import TextObject from "../Textures/TextTexture/TextObject";
import StaticTexture from "../Textures/StaticTexture/StaticTexture";
import Camera from "../Tools/Camera/Camera";

export type objectToDrawType = Player | StaticObject | DynamicObject | StaticTexture

export type objectToUpdateType = Player | DynamicObject | Camera

export interface IObjectsToDraw {
    "ui": objectToDrawType[],
    "foreground": objectToDrawType[],
    "background": objectToDrawType[]
}