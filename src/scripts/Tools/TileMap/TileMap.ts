import Rectangle from "../../Shapes/Rectangle/Rectangle"

class TileMap {
    tileSize: number
    rect: Rectangle
    tileMap: string[][]
    tileValues: object

    constructor(tileSize: number, mapX: number, mapY: number, mapW: number, mapH: number) {
        this.tileSize = tileSize
        this.rect = new Rectangle(mapX, mapY, mapW, mapH)
        this.tileMap = []
        this.tileValues = []

        // config
        this.generateTileMap()
    }

    private generateTileMap() {
        const mapWidthInTiles = this.rect.width / this.tileSize
        const mapHeightInTiles = this.rect.height / this.tileSize

        for(let i = 0;i < mapWidthInTiles;i++) {
            // add a row to the tile map
            this.tileMap.push([])
            for(let j = 0;j < mapHeightInTiles;j++) {
                // add a column to the tile map
                this.tileMap[i].push("")
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for(let i = 0;i < this.tileMap.length;i++) {
            for(let j = 0;j < this.tileMap[i].length;j++) {
                if(this.tileMap[i][j] === "") {
                    ctx.fillStyle = `blue`
                    ctx.fillRect(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize)
                }
            }
        }
    }
}

export default TileMap