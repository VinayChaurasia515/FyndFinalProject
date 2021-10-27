const nodemailer=require('nodemailer')
const usercredentials=require('./user.credentials');

exports.sendVerificationMail= function (email,url){
    return new Promise(async function(resolve,reject){
      console.log('Email :::   ', email)
      console.log('URL   :::',url)

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
            //  host: "smtp.ethereal.email",
              service:"gmail",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: usercredentials.email, // generated ethereal user
                pass: usercredentials.password, // generated ethereal password
              },
            });
          
            // send mail with defined transport object
            try{
                let info = await transporter.sendMail({
                    from: '"No REply ??"', // sender address
                    to: email, // list of receivers
                    subject : "Verification Account !!", // Subject line
                    text:url,
                    html: `Click here, For Taking Attendance <a href='${url}'>Verify</a>`, // html body
                  });                  
                  if(info.messageId){
                      console.log("Message sent: %s", info.messageId);
                      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                      resolve()
                  }
                  else{
                    console.log('.....Error in mail sending :: '+info+'............')
                      reject()
                  }
            }catch(error){
                console.log('.....Error in mail sending :: '+error+'............')
                reject()
            }
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          
            // Preview only available when sending through an Ethereal account
         //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          
          
         // main().catch(console.error);

    })
} 