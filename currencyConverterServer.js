const express = require('express')
const app = express()

const RATES = {
    usd: 1400,
    eur: 1700,
    gbp: 1900
}


app.get('/convert', (req, res)=>{
    const { amount, currency } = req.query

    if(amount==='undefined' || currency==='undefined')
    {
        return res.status(400).json({message: 'Both currency and amount must be provided'})
    }
    const numAmount = Number(amount)
    if(isNaN(numAmount))
    {
        return res.status(400).json({error:'amount must be a valid number'})
    }
    const rate = RATES[currency.toLowerCase()]
    if(!rate)
    {
        return res.status(400).json({error:'currency is missing'})
    }
    const convAmount = numAmount * rate
    res.json(
        {
            input: {amount: numAmount, currency},
            converted: convAmount,
            unit: 'RWF'
        }
    )
})


app.listen(3000,()=>{
    console.log('listening...')
})