

const express = require(`express`);
var cors = require('cors');
let data = require('./data.js');
const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/place',(request,response)=>{
    response.json(data.places);
});


// request only comes from client
//response sent back to client
app.get('/place/:name',(request,response)=>{
    let searchFor = request.params.name;
    let found = data.places.find(x => x.name === request.params.name);
    if(found){
        response.json(found);
    }else{
        //Status code for http
        response.status(404).json({error:`The place ${searchFor} could not be found.`});
    }
   
});

app.get('/image',(request,response)=>{
    response.sendFile(__dirname+"/cherryblossom.png");
});


app.post('/score',(request,response)=>{
    let score = request.body;
    data.scores.push(score);
    response.json({message:'The score saved successfully'});
});


app.listen(port,() => {
    console.log(`Example app listening on port ${port}!`);
});
 


// we need to add configuration to the terminal
// before we use the express framework


/**
 * 
 * npm init
 * 
 * npm install express
 * 
 * 
 * 
 * <Tool used for convinience
 * //save only for development('--save-dev')
 * npm install -g nodemon --save-dev
 * 
 * nodemon
 */