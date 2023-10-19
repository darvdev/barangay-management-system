const {AsyncDatabase } = require("promised-sqlite3");

const users = [];

const getUser = async function(username, password) {

    console.log('getUser:', `${username}, ${password}`);

    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    return db.get(query).then((data) => {
        console.log('getUser:', data);
        db.close();
        return data ?? null;
    }).catch((error) => {
        db.close();
        console.log('Error getUser:', error);
        throw error;
    });
}



const getDocs = async function(req, res) {
    // const token = req.headers['x-bsm-token'];
    
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM documents`;

    return db.all(query).then((data) => {
        console.log('getDocs:', data);
        db.close();
        return res.status(200).json({data: data});
    }).catch((error) => {
        db.close();
        console.log('Error getDocs:', error);
        return res.status(500).send(error);
    });
    
    
    
}



module.exports = {users, getUser, getDocs};