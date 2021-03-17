const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
const { request } = require("http");
const { response } = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json())

// Always need this to serve assets, Ex. HTML CSS JS
app.use("/public",express.static(path.join(__dirname,"Develop/public")));

app.get("/notes", (request,response) => {

    response.sendFile(__dirname + "/Develop/public/notes.html")

})

app.post("/note", (request,response) => {
    const {body} = request

    console.log(body);

    let data = JSON.stringify(body);

    fs.writeFileSync('db.json', data);

    response.json({
        status:200
    })

})

app.get("/notes", (request,response) => {
    response.json(notes[request.params.id])
})

app.delete("/notes", (request,response) => {
    notes = notes.filter(
        notes => {
            
            return notes.id != request.params.id
        }

    )
})

// Global default that sends user back to index.html, dont write under this!!
app.get("/*", (request,response) => {

    response.sendFile(__dirname + "/Develop/public/index.html")

})

app.listen(process.env.PORT || 3000, () => {

    console.log('server listening on PORT 3000');

})


// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);
// console.log(student);