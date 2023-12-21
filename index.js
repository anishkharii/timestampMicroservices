const express = require('express');

const app = express();
app.use('/public',express.static('public'));

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
    
    let formattedDate = new Intl.DateTimeFormat('en-US',options).format(date);
    let unix = date.getTime();
    res.json({"unix":unix,"utc":formattedDate});
})
app.get('/api/:date',(req,res)=>{
    const dateParam = req.params.date;

    const yyyyFormatCheck = /^\d{4}-\d{2}-\d{2}$/;
    const unixFormatCheck = /^\d+$/;

    if(yyyyFormatCheck.test(dateParam)){
        let parsedDate = new Date(dateParam);
        const formattedDate = new Intl.DateTimeFormat('en-US',options).format(parsedDate);
        let unix = parsedDate.getTime();
        res.json({"unix":unix,"utc":formattedDate});
    }
    else if(unixFormatCheck.test(dateParam)){
        let parsedDate = new Date(parseInt(dateParam));
        const formattedDate = new Intl.DateTimeFormat('en-US',options).format(parsedDate);
        res.json({"unix":dateParam,"utc":formattedDate});
    }
    else{
        res.json({error:"Invalid Date"});
    }
})
app.listen(3000,()=>{
    console.log("Connected");
})