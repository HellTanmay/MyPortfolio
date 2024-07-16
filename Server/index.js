const express=require('express');
const cors=require('cors');
const nodemailer=require('nodemailer')
const app=express()
const { config } =require("dotenv");
config()
app.use(express.json());
app.use(cors({origin:'https://tanmay-portfolio-web.netlify.app'}))
 
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
        to:process.env.GMAIL_USERNAME,
        subject: 'new contact message',
        html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><b>${message}</b></p>`,
      };
      
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error:', error);
            reject(error); // Reject the promise on error
          } else {
            console.log('Email sent:', info.response);
            resolve(info); // Resolve the promise on success
          }
        });
      });
  };

  app.post('/',async(req,res)=>{
    try{
        const {name,email,message}=req.body
      await sendEmail(name,email,message)

        res.status(200).json({success:true, message:'Message sent'})

    }catch(err){
      res.status(500).json({ success: false, message: 'Failed to send message' });
        console.log(err)
    }
   
  })


app.listen(4000)