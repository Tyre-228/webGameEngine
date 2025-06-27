import AnimatedTexture from "../Textures/AnimatedTexture/AnimatedTexture";
import RectTexture from "../Textures/RectTexture/RectTexture";
import StaticTexture from "../Textures/StaticTexture/StaticTexture";
import Player from "../Objects/Player/Player";
import StaticObject from "../Objects/StaticObject/StaticObject";

export type TextureType = AnimatedTexture | RectTexture | StaticTexture
export type physicalObjectType = Player | StaticObject