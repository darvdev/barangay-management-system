const {AsyncDatabase } = require("promised-sqlite3");

const users = [];

const getUser = async function(username, password) {
    console.log('getUser:', `${username}, ${password}`);

    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    return db.get(query).then((data) => {
        console.log('getUser success:', data);
        db.close();
        return data ?? null;
    }).catch((error) => {
        db.close();
        console.log('Error getUser:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
}



const getDocs = async function(req, res) {
    // const token = req.headers['x-bsm-token'];
    console.log('getDocs');
    
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM documents`;

    return db.all(query).then((data) => {
        console.log('getDocs success:', data);
        db.close();
        return res.status(200).json({data: data});
    }).catch((error) => {
        db.close();
        console.log('Error getDocs:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
}

const getProfile = async function(req, res) {
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM dashboard WHERE id = "profile"`;

    return db.get(query).then((data) => {
        console.log('getProfile success:', data);
        db.close();
        return res.status(200).json({data: data});
    }).catch((error) => {
        db.close();
        console.log('Error getProfile:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
}

const getHistory = async function(req, res) {
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM dashboard WHERE id = "history"`;

    return db.get(query).then((data) => {
        console.log('getHistory success:', data);
        db.close();
        return res.status(200).json({data: data});
    }).catch((error) => {
        db.close();
        console.log('Error getHistory:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
}


const postDoc = async function(req, res) {
    const body = req.body;
    console.log('postDoc:', body);

    if (!body) {
        return res.status(400).send({'status': 'error', 'message': 'Payload is required'});
    }
        
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `INSERT INTO documents (value, label, price) VALUES (?, ?, ?)`;

    return db.run(query, [body.value, body.label, body.price]).then((data) => {
        console.log('postDoc success:', data);
        db.close();
        return res.status(200).json({status: 'ok', message: 'Record has been saved.'});
    }).catch((error) => {
        db.close();
        console.log('Error postDoc:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
     
}

const delDoc = async function(req, res) {

    const id = req.params.id;

    console.log('delDoc:', id);

    
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const deleteQuery = `DELETE FROM documents WHERE id=(?)`;

    return db.run(deleteQuery, id).then((_) => {
        console.log('delDoc success:', _);
        db.close();
        return getDocs(req, res);
    }).catch((error) => {
        db.close();
        console.log('Error delDoc:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
}

const postRequest = async function(req, res) {

    const body = req.body;
    console.log('postRequest:', body);

    if (!body) {
        return res.status(400).send({'status': 'error', 'message': 'Payload is required'});
    }

    const created_date = (new Date()).toISOString();
        
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `INSERT INTO requests (created_date, type, name, phone, gender, date, time, price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return db.run(query, [created_date, body.type, body.name, body.phone, body.gender, body.date, body.time, body.price, body.status]).then((data) => {
        console.log('postRequest success:', data);
        db.close();

        if (data) {
            return res.status(200).json({'status': 'ok', 'message': 'You document request has been recorded.', 'data': data});
        } else {
            return res.status(400).json({'status': 'error', 'message': 'Cannot created request', 'data': data});
        }
    }).catch((error) => {
        db.close();
        console.log('Error postRequest:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
    
}

const getRequest = async function(req, res) {
    console.log('getRequest');

    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM requests`;

    return db.all(query).then((data) => {
        console.log('getRequest success:', data);
        db.close();
        return res.status(200).json({data: data});
    }).catch((error) => {
        db.close();
        console.log('Error getRequest:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
}

const delRequest = async function(req, res) {

    const id = req.params.id;

    console.log('delRequest:', id);

    
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const deleteQuery = `DELETE FROM requests WHERE id=(?)`;

    return db.run(deleteQuery, id).then((_) => {
        console.log('delRequest success:', _);
        db.close();
        return getRequest(req, res);
    }).catch((error) => {
        db.close();
        console.log('Error delRequest:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
}


const putProfile = async function(req, res) {
    const body = req.body;
    console.log('putProfile:', body);

    if (!body) {
        return res.status(400).send({'status': 'error', 'message': 'Payload is required'});
    }
    
    const query = 'UPDATE dashboard SET content=? WHERE id=?';

    const db = await AsyncDatabase.open('./server/db.sqlite');

    const result = await db.run(query, [body.content, 'profile']);

    console.log('putProfile result:', result);

    return res.status(200).json({data: result});

}

const putHistory = async function(req, res) {
    const body = req.body;
    console.log('putHistory:', body);

    if (!body) {
        return res.status(400).send({'status': 'error', 'message': 'Payload is required'});
    }
    
    const query = 'UPDATE dashboard SET content=? WHERE id=?';

    const db = await AsyncDatabase.open('./server/db.sqlite');

    const result = await db.run(query, [body.content, 'history']);

    console.log('putHistory result:', result);

    return res.status(200).json({data: result});

}


module.exports = {users, getUser, getDocs, delDoc, postDoc, postRequest, getRequest, delRequest, getProfile, getHistory, putProfile, putHistory};