
  var http = require('http'); 
  var nodemailer = require('nodemailer'); http.createServer(function (req, res) {
  var fromEmail = 'abdelaziz_sakly@carrefour.com';
  var toEmail = 'sakly.aziz@gmail.com';
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true, // use SSL
    debug: true,
      auth: {
        user: 'abdelaziz_sakly@carrefour.com',
        pass: ''
      }
  });
   transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'Regarding forget password request',
      text: 'This is forget password response from youapp',
      html: '<p>Your password is <b>sample</b></p>'
  }, function(error, response){
      if(error){
          console.log('Failed in sending mail');
          console.dir({success: false, existing: false, sendError: true});
          console.dir(error);
          res.end('Failed in sending mail');
      }else{
          console.log('Successful in sedning email');
          console.dir({success: true, existing: false, sendError: false});
          console.dir(response);
          res.end('Successful in sedning email');
      }
  });
}).listen(8000);
console.log('Server listening on port 8000');
