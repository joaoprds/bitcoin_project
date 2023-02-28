import {config} from 'dotenv'
import axios from 'axios'
import period from './enums/period'
import Candle from './models/Candle'

config()

const readMarketPrice = async (): Promise<number> =>{
    const result = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=ud')
    const data = result.data
    const price = data.bitcoin.usd
    return price
}

const generateCandles = async () => {

    while(true){
        const loopTimes = period.FIVE_MINUTES / period.TEN_SECONDS
        const candles = new Candle('BTC')

        console.log('---------------------------------------')
        console.log('Generating new candle')


        for (let i = 0; i < loopTimes; i++){
            const price = await readMarketPrice()
            Candle.addValue(price)
            console.log(`Market price #${i + 1} of ${loopTimes}`)
            await new Promise(r => setTimeout(r, period.TEN_SECONDS))
        }

        Candle.closeCandle
        console.log('Candle close')
        console.log(Candle.toSimpleObject())
    }
    
}

generateCandles()