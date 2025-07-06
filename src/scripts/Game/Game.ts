import Player from "../Objects/Player/Player";
import StaticObject from "../Objects/StaticObject/StaticObject";
import StaticTexture from "../Textures/StaticTexture/StaticTexture";
import { objectToDrawType, IObjectsToDraw, objectToUpdateType } from "./GameTypes";
import { physicalObjectType } from "../helpers/GlobalTypes";
import RectTexture from "../Textures/RectTexture/RectTexture";
import Camera from "../Tools/Camera/Camera";
import TileMap from "../Tools/TileMap/TileMap";

class Game {
    // basic config
    screenWidth: number;
    screenHeight: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    fps: number;

    // arrays
    objectsToDraw: IObjectsToDraw
    objectsToUpdate: objectToUpdateType[]
    physicalObjects: physicalObjectType[]

    // physics
    GRAVITY_CONSTANT: number

    // debug
    drawRects: boolean

    // entities
    player: Player
    camera: Camera
    tileMap: TileMap

    constructor(screenWidth: number, screenHeight: number, fps: number) {
        this.screenWidth = screenWidth
        this.screenHeight = screenHeight

        this.canvas = document.getElementById("canvas") as HTMLCanvasElement
        // setting canvas size to the window size
        this.canvas.setAttribute("width", `${window.innerWidth}`)
        this.canvas.setAttribute("height", `${window.innerHeight}`)

        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
        this.fps = fps

        // arrays
        this.objectsToDraw = {
            "ui": [],
            "foreground": [],
            "background": []
        }
        this.objectsToUpdate = []
        this.physicalObjects = []

        this.GRAVITY_CONSTANT = 0

        // debug
        this.drawRects = false
        
        // entities
        this.player = new Player(100, 100, 50, 75, this.GRAVITY_CONSTANT, 0.0001, this.screenHeight)
        this.camera = new Camera(this.ctx, this.screenWidth, this.screenHeight)
        this.tileMap = new TileMap(16, -1000, -1000, 1000, 1000)
    }

    private config() {
        this.ctx.imageSmoothingEnabled = false

        // background
        this.objectsToDraw.background.push(this.tileMap)

        // foreground


        this.objectsToDraw.foreground.push(this.player)
        this.objectsToUpdate.push(this.player)
        this.physicalObjects.push(this.player)

        this.camera.attachCamera(this.player)
        this.camera.smoothMode = false
    }

    private collisionHandler() {
        let collidedPairs: physicalObjectType[][]  = []
        for(let i = 0;i < this.physicalObjects.length;i++) {
            for(let j = 0;j < this.physicalObjects.length;j++) {
                // skip the iteration so the object is not compared with itself
                if(i === j) {
                    continue
                }

                const objectRect1 = this.physicalObjects[i].rect
                const objectRect2 = this.physicalObjects[j].rect

                // horizontal collision
                if(objectRect1.right > objectRect2.left && objectRect1.left < objectRect2.right) {
                    // vertical collision
                    if(objectRect1.bottom > objectRect2.top && objectRect1.top < objectRect2.bottom) {
                        collidedPairs.push([this.physicalObjects[i], this.physicalObjects[j]])
                    }
                }
            }
        }

        return collidedPairs
    }

    private update() {
        this.objectsToUpdate.forEach((object: objectToUpdateType) => {
            object.update()
        })

        // handling collision
        const collidedPairs = this.collisionHandler()
        if(collidedPairs.find(pair => pair.includes(this.player))) {
            this.player.collisionHandler(collidedPairs[0][0])
        }
    }

    private draw() {
        // if there is an object that the camera is attached to, it needs to be rendered separately
        const cameraAttachedObject = this.camera.objectToFollow

        // clearing the screen
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(-10000, -10000, this.screenWidth*100, this.screenHeight*100)

        // drawing the objects
        this.objectsToDraw.background.forEach((object: objectToDrawType) => {
            if(object !== cameraAttachedObject) {
                object.draw(this.ctx)
            }
        })

        this.objectsToDraw.foreground.forEach((object: objectToDrawType) => {
            if(object !== cameraAttachedObject) {
                object.draw(this.ctx)
            }
        })

        this.objectsToDraw.ui.forEach((object: objectToDrawType) => {
            if(object !== cameraAttachedObject) {
                object.draw(this.ctx)
            }
        })

        // drawing rectangles
        if(this.drawRects === true) {
            this.physicalObjects.forEach((object: physicalObjectType) => {
                if(object !== cameraAttachedObject) {
                    object.rect.draw(this.ctx)
                    object.draw(this.ctx)
                }
            })
        }


        this.camera.update()

        // draw object attached to the camera
        if(this.drawRects === true) {
            this.camera.objectToFollow?.rect.draw(this.ctx)
            this.camera.objectToFollow?.draw(this.ctx)
        }
        else {
            this.camera.objectToFollow?.draw(this.ctx)
        }
    }

    run() {
        this.config()

        setInterval(() => {
            this.update()
            this.draw()

        }, 1000 / this.fps)
    }
}

export default Game