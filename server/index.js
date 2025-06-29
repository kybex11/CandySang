const express = require('express');
const cors = require('cors');
const app = express();
const port = 3300;
const fs = require('fs');

// Use CORS middleware
app.use(cors());

// Helper function to read masterlist.json
const readMasterlist = () => {
    try {
        const data = fs.readFileSync('./masterlist.json');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading masterlist.json:', error);
        return {};
    }
};

// Helper function to write to masterlist.json
const writeMasterlist = (list) => {
    try {
        fs.writeFileSync('./masterlist.json', JSON.stringify(list, null, 2));
    } catch (error) {
        console.error('Error writing to masterlist.json:', error);
    }
};

// Function to validate URL
const isValidUrl = (string) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z0-9\\-]+\\.)+[a-z]{2,})|' + // domain name
        'localhost|' + // localhost
        '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP
        '\\[?[a-f0-9]*:[a-f0-9:%.]+\\]?)' + // IPv6
        '(\\:\\d+)?(\\/[-a-z0-9+&@#\\/%?=~_|!:,.;]*)*' + // path
        '(\\?[;&a-z0-9+%#=~_|!:,.;]*)?' + // query string
        '(\\#[-a-z0-9_]*)?$','i'); // fragment locator
    return !!urlPattern.test(string);
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/masterlist', (req, res) => {
    const list = readMasterlist();
    res.json(list);
});

app.get('/add/:name/:ip', (req, res) => {
    const list = readMasterlist();
    const name = req.params.name; 
    const ip = req.params.ip; 

    console.log(`Adding entry: Name = ${name}, IP = ${ip}`); // Log the incoming request

    if (list[name]) {
        return res.sendStatus(403); // Forbidden
    }

    // Check if the ip is a valid URL or a non-empty string
    if (!isValidUrl(ip) && ip.trim() === '') {
        console.log('Invalid IP format'); // Log invalid format
        return res.sendStatus(400); // Bad Request
    }

    list[name] = ip;
    writeMasterlist(list);
    res.sendStatus(201); // Created
});

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});