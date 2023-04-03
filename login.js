const users = require("./user")

function login(email, password) {
    return (index = users.findIndex((user) => user.email === email && user.password === password))
}

module.exports = login
