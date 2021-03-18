const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
var notes = require("./db/db.json")
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json())

// Always need this to serve assets, Ex. HTML CSS JS
app.use(express.static('public'));
// app.use("/public",express.static(path.join(__dirname,"Develop/public")));

app.get("/notes", (request,response) => {

    response.sendFile(__dirname + "/public/notes.html")

})

app.post("/api/notes", (request,response) => {
    let newNote = request.body

    newNote.id = request.body.title

    notes.push(newNote)

    console.table(notes)

    response.json(newNote)
    
});

// need GET api route, save button
app.get("/api/notes", (request,response) =>  response.json(notes));

// read from db json , push body to updated array, 

app.get("/api/notes", (request,response) => {
    const notes = fs.readFileSync('db/db.json')
    console.log(JSON.parse(notes));
    response.json(JSON.parse(notes))
})


app.delete("/api/notes/:id", (request,response) => {
    const deleteId = request.params.id

    for(let i =0; i < notes.length; i++) {

        if(notes[i].id == deleteId) {
            
            notes[i] = ['']
        }
    }
    
});


// Global default that sends user back to index.html, dont write under this!!
app.get("/*", (request,response) => {

    response.sendFile(__dirname + "/public/index.html")

})

app.listen(process.env.PORT || 3000, () => {

    console.log('server listening on PORT 3000');

})
