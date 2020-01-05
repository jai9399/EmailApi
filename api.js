const express = require('express')
const app = express();
const nodemailer = require('nodemailer')
const validator = require('validator')
app.use(express.urlencoded())
app.use(express.json())
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure:true,
    auth :{
        user : process.env.YOUR_EMAIL,
        pass : process.env.YOUR_PASS
    }
})
var mailOptions = {
    from:process.env.YOUR_EMAIL,
    to:'',
    subject:'Test',
    text : 'This is sample mail'
}
app.post('/send',function(req,res){
    const email = req.body.email;
    const subject = req.body.subject;
    const text = req.body.text;
    if(!validator.isEmail(email))
    res.send('Invalid Email')
    mailOptions.to = email;
    mailOptions.subject = subject;
    mailOptions.text = text;
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
        console.log(error)
        res.send(error) }
        else{
        console.log('Email Sent :'+info.response);    
        res.send(info.response)
        }    
     })
})
const port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('Run')
})