const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs').promises;

let MAP;
let GAMECONFIG;

async function initialize() {
    try {
        MAP = await fs.readFile('./data/map.json');
    } catch (e) { 
        throw new Error(`CandySang: ${e}`);
    }
    
    try {
        GAMECONFIG = await fs.readFile('./env/gameconfig.json');
    } catch (e) { 
        throw new Error(`CandySang: ${e}`);
    }
}

initialize();

app.get('/', (req, res) => {
    console.log('CandySang: Test Passed! {😃}')
    res.send('CandySang!')
})

app.get('/getMap', (req, res) => {
    res.send(MAP);
})

app.get('/get', (req, res) => {
    res.send(GAMECONFIG);
})

app.listen(port, () => {
    console.log(`SandySang: App listening on port ${port} {📻}`)
})