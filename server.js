const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.json())

var fs = require('fs');


var user = require('./user.json');


app.get('/get', (req, res) => {
    return res.send("Welcome to Home page")
})

app.get('/get/users', (req, res) => {
    return res.send(user)
})
app.post('/post/users', (req, res) => {
    let newUser = req.body;
    user.push(newUser);
    var json = JSON.stringify(user);
    fs.writeFile('user.json', json, 'utf8', callback)
    return res.send(user)
    // fs.appendFile(user.json, newUser, (err) => {
    //     console.log(err)
    // });
})
app.patch('/users/:id', (req, res)=>{
    var id = req.params.id 
    let userDetail = req.body;
    user.forEach(el => {
        if (el.id == id) {
            for (key in userDetail) {
                if (el[key] == undefined) {
                    return res.send("Invalid Response")
                }
                el[key] = userDetail[key]
            }
        }

    })
   var json = JSON.stringify(user);
   fs.writeFile('user.json', json, 'utf8', callback)
    return res.send("Details updated");
})

app.delete("/users/:id", (req, res) => {
    user.forEach((el,i) =>{
        if (el.id == req.params.id) {
            user.splice(i, 1);
            var json = JSON.stringify(user);
            fs.writeFile('user.json', json, 'utf8', callback)
            return res.send("User Deleted")
        }
    })
    return res.send("User Not Found");
})

function callback(err) {
    console.log(err)
}

app.listen(2005, () => {
    console.log("abc")
})