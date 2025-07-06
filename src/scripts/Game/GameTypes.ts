import Player from "../Objects/Player/Player";
import StaticObject from "../Objects/StaticObject/StaticObject";
import DynamicObject from "../Objects/DynamicObject/DynamicObject";
import StaticTexture from "../Textures/StaticTexture/StaticTexture";
import Camera from "../Tools/Camera/Camera";
import TileMap from "../Tools/TileMap/TileMap";

export type objectToDrawType = Player | StaticObject | DynamicObject | StaticTexture | TileMap

export type objectToUpdateType = Player | DynamicObject | Camera

export interface IObjectsToDraw {
    "ui": objectToDrawType[],
    "foreground": objectToDrawType[],
    "background": objectToDrawType[]
}