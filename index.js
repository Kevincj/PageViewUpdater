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
    console.log("received:", req.query)
    page_hash = req.query.hash


    console.log("Hash:", page_hash, typeof(page_hash))
    if (!page_hash){
        return res.end("No page hash found.");
    }

    await mutex.runExclusive(async () =>{
        fs.readFile(__dirname + "/" + "page.json", 'utf8', function (err, data) {

            var jsonData = JSON.parse(data)

            if (jsonData.hasOwnProperty(page_hash)) {

                jsonData[page_hash] += 1
 
                res.end(jsonData[page_hash].toString());

                saveJson(jsonData);
            }
            else{
                jsonData[page_hash] = 1

                res.end(jsonData[page_hash].toString());

                saveJson(jsonData);
            }
        });
    });
})
app.get('/check', async function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');

    page_hash = req.query.hash

    if (!page_hash){
        return res.end("No page hash found.");
    }
    
    await mutex.runExclusive(async () =>{
        fs.readFile(__dirname + "/" + "page.json", 'utf8', function (err, data) {
            if (err) {
                console.error(err)
                return res.end("Error.");
            }
            var jsonData = JSON.parse(data)

            if (jsonData.hasOwnProperty(page_hash)) {

                res.end(jsonData[page_hash].toString());

            }
            else{
                jsonData[page_hash] = 0;

                res.end(jsonData[page_hash].toString());
            }
        });
    });
})


const port = 6789;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});