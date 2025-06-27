class AnimatedTexture {
    img: HTMLImageElement
    x: number
    y: number
    width: number
    height: number
    sliceX: number
    sliceY: number
    sliceWidth: number
    sliceHeight: number

    frames: number
    currentFrame: number
    lastFrameUpdateTime: number
    updateInterval: number


    constructor(imgSrc: string, x: number, y: number, width: number, height: number, sliceX: number, sliceY: number, sliceWidth: number, sliceHeight: number, frames: number, updateInterval: number) {
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
        
        this.frames = frames
        this.currentFrame = 0
        this.lastFrameUpdateTime = Date.now()
        this.updateInterval = updateInterval
    }

    private updateAnimation() {
        if(Date.now() - this.lastFrameUpdateTime >= this.updateInterval) {
            if(this.currentFrame >= this.frames - 1) {

                this.currentFrame = 0
            }
            else {
                this.currentFrame++
            }

            this.lastFrameUpdateTime = Date.now()
        }
    }

    changeAnimation(sliceX: number, sliceY: number, frames: number) {
        this.sliceX = sliceX
        this.sliceY = sliceY
        this.frames = frames
        this.currentFrame = 0
    }

    draw(ctx: CanvasRenderingContext2D) {
        const sliceX = this.sliceX + this.sliceWidth * this.currentFrame
        ctx.drawImage(this.img, sliceX, this.sliceY, this.sliceWidth, this.sliceHeight, this.x, this.y, this.width, this.height)

        this.updateAnimation()
    }
}

export default AnimatedTexture