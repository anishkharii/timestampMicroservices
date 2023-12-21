const express = require('express');
const cors = require("cors");
const app = express();
app.use('/public',express.static('public'));
app.use(cors({optionsSuccessStatus:200}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
})
app.get('/api',(req,res)=>{
    let date = new Date();
    let unix = date.getTime(); 
    let utc = date.toUTCString();
    res.json({unix,utc});
})
app.get('/api/:date',(req,res)=>{
  const dateParam = req.params.date;
  let date ;
  if(!dateParam){
    date = new Date();
  }
  else{
    let checkUnix = dateParam*1;
    date = isNaN(checkUnix)?new Date(dateParam): new Date(checkUnix);
  }
  if(date.toString()==='Invalid Date'){
    res.json({error:date.toString()});
  }
  else{
    let unix = date.getTime();
    let utc= date.toUTCString();
    res.json({unix,utc});
  }
})
app.listen(3000,()=>{
    console.log("Connected");
})