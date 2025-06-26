const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

let MAP;

try {
    MAP = await fs.readFileSync('./data/map.json');
} catch (e) { 
    throw new Error(`CandySang: ${e}`);
}

app.get('/', (req, res) => {
    console.log('CandySang: Test Passed! {😃}')
    res.send('CandySang!')
})

app.get('/getMap', (req, res) => {
    res.send(MAP);
})

app.listen(port, () => {
    console.log(`SandySang: App listening on port ${port} {📻}`)
})