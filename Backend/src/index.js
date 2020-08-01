const express = require('express')

const port = process.env.PORT || 3333

const app = express()

app.get('/', (request, response) => {
    return response.json({
        message: 'Hello Felippe'
    })
})

app.listen(port, () => {
    console.log("Back-end Started!")
})