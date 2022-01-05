const express = require('express');
const app = express();
const fs = require("fs");
const url = require('url')
const Mutex = require('async-mutex').Mutex;


const mutex = new Mutex();

async function saveJson(jsonData){
    fs.writeFile(__dirname + "/" + "page.json", JSON.stringify(jsonData), err => {
        if (err) {
            console.error(err)
            return res.end("Error.");
        }
    })
    
}



app.get('/increase', async function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    page_hash = req.query.hash

    if (!page_hash){
        return res.end("No page hash found.");
    }

    
    const release = await mutex.acquire();

    try {
        var data = fs.readFileSync(__dirname + "/" + "page.json", 'utf8');

        var jsonData = JSON.parse(data)
        if (jsonData.hasOwnProperty(page_hash)) {
            jsonData[page_hash] += 1
            res.end(jsonData[page_hash].toString());
        }
        else{
            jsonData[page_hash] = 1
            res.end(jsonData[page_hash].toString());
        }
        saveJson(jsonData);
    }
    catch (e){
        console.error("Error", e)
    }
    finally {
        release();
    }

})

app.get('/check', async function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');

    page_hash = req.query.hash

    if (!page_hash){
        return res.end("No page hash found.");
    }
    
    const release = await mutex.acquire();

    try {
        var data = fs.readFileSync(__dirname + "/" + "page.json", 'utf8');

        var jsonData = JSON.parse(data)
        if (jsonData.hasOwnProperty(page_hash)) {
            res.end(jsonData[page_hash].toString());
        }
        else{
            jsonData[page_hash] = 0;
            res.end(jsonData[page_hash].toString());
        }
    }
    catch (e){
        console.error("Error", e)
    }
    finally {
        release();
    }
});


const port = 6789;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});