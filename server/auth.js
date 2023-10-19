const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const { users, getUser } = require("./db.js");


const login = async function(req, res){

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({status: 'error', message: "Please fill all required fields"});
    }

    const result = await getUser(username, password);

    console.log('login result:', result);

    if (result) {

        const data = {
            "id": result.id,
            "username": result.username,
            "date": new Date(),
            "token": uuidv4(),
        };

        users.push(data);

        return res.status(200).json({status: "ok", message: "Login success", data: data});
    } else {
        return res.status(401).json({status: "error", message: "Invalid credentials"});
    }

}

const verifyToken = async function(req, res) {

    const token = req.body.token;

    if (!token) {
        return res.status(401).send({status: 'error', message: 'Invalid token'});
    }

    const user = users.find((o) => o.token == token);

    console.log('verify user:', user);

    if (user) {
        return res.status(200).send({status: 'ok', message: 'Token verified', data: user});
    } else {
        return res.status(401).send({status: 'error', message: 'User not found. or token is invalid or expired'});
    }
    
}

module.exports = { verifyToken, login };