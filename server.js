const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser')

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


// dont write below this line of code 
app.get("/*", (request,response) => {

    response.sendFile(__dirname + "/Develop/public/index.html")

})


app.listen(process.env.PORT || 3000, () => {

    console.log('server listening on PORT 3000');

})


let rawdata = fs.readFileSync('student.json');
let student = JSON.parse(rawdata);
console.log(student);