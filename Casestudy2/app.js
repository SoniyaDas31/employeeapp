// Task1: initiate app and run server at 3000
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const ObjectID = require('mongodb').ObjectID;
const BSON = require('bson');

app.listen(PORT, ()=>{
    console.log(`Server Listening at Port ${PORT}`);
});


app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

app.use(express.json());

const dbConnection = 'mongodb+srv://dassubbulakshmi:DB507huI2Uknmx7l@employee.ihpo1.mongodb.net/';
const MongoClient = require('mongodb').MongoClient;


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

const router = express.Router();

// Post Method 
router.post('/post', async (req, res)=>{
    res.send('Post API');
    
});



//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

app.use('/api',router);

//TODO: get data from db  using api '/api/employeelist'

//Get all Method
router.get('/employeelist', async(req, res) => {
   // res.send('Get All')
    try{
        const client = await MongoClient.connect(dbConnection);
        const coll = client.db('employee_details').collection('employee_list');
        const cursor = coll.find();
        const result = await cursor.toArray();
        await client.close();
        res.json(result);

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



//TODO: get single data from db  using api '/api/employeelist/:id'

router.get('/employeelist/:id', async(req, res) => {
     //res.send(`get id ${req.params.id}`);
    //let queryString = {_id:ObjectId(req.params.id)};
    let id = req.params.id;
    const nid = new BSON.ObjectId(id);
   // let queryString = {_id:'6714cb6e420bb225acc430e9'};
    //let queryString2 = "{'name': '"+req.params.id+"'}";
    // res.send(queryString2);
    //console.log(queryString);
   
     try{
         const client = await MongoClient.connect(dbConnection);
         const coll = client.db('employee_details').collection('employee_list');
         const cursor = coll.findOne({_id: nid});
         console.log(cursor);
         const result = cursor.toArray();
         console.log(result);
         await client.close();
         res.json(result);
 
     }
     catch(error){
         res.status(500).json({message: error.message})
         
     }
 })




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}






//TODO: delete a employee data from db by using api '/api/employeelist/:id'





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



