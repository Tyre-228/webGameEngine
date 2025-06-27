class Vector {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    getCoords(): number[] {
        return [this.x, this.y]
    }
}

export default Vector