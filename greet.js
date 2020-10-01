const nodemailer   = require('nodemailer');

function greetUser(user) {
    var HTMLTemplate ="<h1>This is the template</h1>";
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: process.env.COMPANYMAIL,
                pass: process.env.COMANYPASS
            }
    });
    const mailOptions = {
        from: process.env.COMPANYMAIL, 
        to: user.email,
        subject: `Welcome ${user.firstName} ${user.lastName} to 3EssEnn`,
        // TODO styled html for geeting mail.active
        //! email confirmation code 
        html: '<h1>Welcome to our site</h1>'
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        console.log(err)
        else
        console.log('Email sent :',info);
    });
}

module.exports = greetUser;
