const express = require('express');
const cors = require("cors");
const app = express();
app.use('/public',express.static('public'));
app.use(cors({optionsSuccessStatus:200}));
const options={
    weekday:'short',
    day:'2-digit',
    month:'short',
    year:'numeric',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    timeZoneName:'short'
};

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

    const yyyyFormatCheck = /^\d{4}-\d{2}-\d{2}$/;
    const unixFormatCheck = /^\d+$/;

    if(yyyyFormatCheck.test(dateParam)){
        let date = new Date(dateParam);
        let unix =date.getTime();
        let utc = date.toUTCString();
        res.json({unix,utc});
    }
    else if(unixFormatCheck.test(dateParam)){
        let date = new Date(parseInt(dateParam));
        let unix =date().getTime();
        let utc = date.toUTCString();
        res.json({unix,utc});
    }
    else{
        res.json({error:"Invalid Date"});
    }
})
app.listen(3000,()=>{
    console.log("Connected");
})