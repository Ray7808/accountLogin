const express = require("express")
const exphbs = require("express-handlebars")
const login = require("./login")
const users = require("./user")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

// template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")

// middleware
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/wrong", (req, res) => {
    res.render("wrong")
})
app.get("/success/:index", (req, res) => {
    const index = req.params.index
    res.render("success", { username: users[index].firstName })
})

app.post("/login", (req, res) => {
    const index = login(req.body.InputEmail, req.body.InputPassword)
    if (index === -1) {
        return res.redirect("/wrong")
    } else {
        return res.redirect(`/success/${index}`)
    }
})

app.listen(port, () => {
    console.log(`Listening http://localhost:${port}`)
})
