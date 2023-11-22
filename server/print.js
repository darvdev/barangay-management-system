var html_to_pdf = require('html-pdf-node');
const { AsyncDatabase } = require("promised-sqlite3");
const fs = require('fs');

const print = async function(req, res) {
    const body = req.body;

    let content = await new Promise((resolve, reject) => {
        try {
            fs.readFile(`./server/temp/${body.type}.html`, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                    return;
                }
                resolve(data);
            });
        } catch (error) {
            resolve(null);
        }
        
    });


    let options = { format: 'A4' };

    if (content) {
        content = content?.replaceAll('{{name}}', body.name?.toUpperCase());
        content = content?.replaceAll('{{day}}', body.day);
        content = content?.replaceAll('{{month}}', body.month);
    } else {
        content = `Please print manually the ${body.type} of ${body.name} where issued on ${body.day} day of ${body.month} 2023`;
    }
    

    let file = { content: content };

    // let file = { url: "https://example.com" };

     const data = await new Promise((resolve, reject) => {
     
        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            resolve(pdfBuffer);
        }).catch((error)=>{
            console.log('error pdf:', error);
            reject(null);
        });
    });


    const query = 'UPDATE requests SET status=?, completed_on=? WHERE id=?';

    const db = await AsyncDatabase.open('./server/db.sqlite');

    const result = await db.run(query, ['printed', (new Date()).toISOString(), body.id]);

    console.log('print result:', result);

    return res.status(200).json({data: data});
}





module.exports = { print };