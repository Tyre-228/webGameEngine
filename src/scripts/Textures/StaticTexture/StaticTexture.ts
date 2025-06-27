class StaticTexture {
    img: HTMLImageElement
    x: number
    y: number
    width: number
    height: number
    sliceX: number
    sliceY: number
    sliceWidth: number
    sliceHeight: number


    constructor(imgSrc: string, x: number, y: number, width: number, height: number, sliceX: number, sliceY: number, sliceWidth: number, sliceHeight: number) {
        this.img = new Image()
        this.img.src = imgSrc

        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.sliceX = sliceX
        this.sliceY = sliceY
        this.sliceWidth = sliceWidth
        this.sliceHeight = sliceHeight
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.sliceX, this.sliceY, this.sliceWidth, this.sliceHeight, this.x, this.y, this.width, this.height)
    }
}

export default StaticTexture