import candleColor from "../enums/candleColor"

export default class Candle {

    low: number
    high: number
    open: number
    close: number
    color: candleColor
    finalDateTime: Date
    values: number[]
    currency: string

    constructor(currency: string) {
        this.currency = currency
        this.low = Infinity
        this.high = 0
        this.close = 0
        this.open = 0
        this.values = []
        this.color = candleColor.UNDETERMINED
    }

 addValue(value: number) {
        this.values.push(value)

        if (this.values.length == 1) {
            this.open = value
        }

        if (this.low > value) {
            this.low = value
        }

        if (this.high < value) {
            this.high = value
        }
    }

 closeCandle() {
        if (this.values.length > 0) {
            this.close = this.values[this.values.length - 1]
            this.finalDateTime = new Date()

            if (this.open > this.close) {
                this.color = candleColor.RED
            } else if (this.close > this.open) {
                this.color = candleColor.GREEN
            }
        }
    }

 toSimpleObject() {
        const { values, ...obj } = this
        return obj
    }

}