const express=require('express');
const cors=require('cors');
const nodemailer=require('nodemailer')
const app=express()
const { config } =require("dotenv");
config()
app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}))
 
const sendEmail = async function (name, email , message) {

    let transporter = nodemailer.createTransport({
      
     service:'gmail',
     host:'smtp.gmail.com',
      auth: {
        user:process.env.GMAIL_USERNAME,
        pass:process.env.GMAIL_PASSWORD ,
      },
    });

    const mailOptions = {
        from:email,
        to:'tanmayail218@gmail.com',
        subject: 'new contact message',
        html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><b>${message}</b></p>`,
      };
      
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  };

  app.post('/',async(req,res)=>{
    try{
        const {name,email,message}=req.body
        await sendEmail(name,email,message)
        res.status(200).json({success:true, message:'Message sent'})
    }catch(err){
        console.log(err)
    }
   
  })


app.listen(4000)