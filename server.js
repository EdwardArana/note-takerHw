const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

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
    const {body} = request

    console.log(body);

    let data = JSON.stringify(body);

    fs.writeFileSync('db/db.json', data);

    notes.push(newNote);
    updateDb();
    response.send('please work')
    return console.log("Adding new note:" +newNote.title);

    response.json({
        status:200
    })

})

// read from db json , push body to updated array, 

app.get("/api/notes", (request,response) => {
    const notes = fs.readFileSync('db/db.json')
    console.log(JSON.parse(notes));
    response.json(JSON.parse(notes))
})


function updateDb() {
    fs.writeFile("db/db.json",JSON.stringify(notes),err => {
        if(err) throw err;
        return true;
    })
}


app.delete("api/notes:id", (request,response) => {
    notes = notes.filter(
        note => {
            
            return note.id != request.params.id
        }

    )
})


// Global default that sends user back to index.html, dont write under this!!
app.get("/*", (request,response) => {

    response.sendFile(__dirname + "/public/index.html")

})

app.listen(process.env.PORT || 3000, () => {

    console.log('server listening on PORT 3000');

})


// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);
// console.log(student);