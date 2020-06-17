const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const creds = require('./config/config');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('client/build', express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // res.send('index.html');
  // res.send('This backend is just for handling mails');
})

app.get('/test', (req, res) => {
  // res.sendFile(path.join(__dirname, '../public', 'index.html'));
  res.send('Test Page');
  // res.send('This backend is just for handling mails');
})

app.get('/download', (req, res) => {
  // res.sendFile(path.join(__dirname, '../public', 'index.html'));
  res.sendFile(path.join(__dirname, 'client/public/download', 'covid-traqa v2.0.apk'));
  // res.send('This backend is just for handling mails');
})

app.post('/send', (req,res) => {
  var data = req.body;

var transport = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
});

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

const mailOptions = {
  from: data.email,
  to: creds.USER,
  subject: 'Covid-19 Traqa feedback',
  html: `<p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> ${data.email}</p>

          <p>${data.message}</p>

          <hr>
           <small>On <i>${new Date().toDateString()} - ${new Date().toTimeString()}</i></small>`
};

const mailOptions2 = {
  from: creds.USER,
  to: data.email,
  subject: 'Covid-19 Traqa',
  html: `<p>Dear <b>${data.name}<b/>,</p>

         <p>Your message was sent successfully and we'll get to you as soon as possible, if neccessary.</p>
         <p>Covid-19 Traqa is an open source software which was developed by a young developer by name <a href="https://www.linkedin.com/in/fabrice-ngoran-153a81198" target="_blank" rel="noopener noreferrer"><b>Fabrice Ngoran</b></a> as part of the <a href="https://www.stemsel.com" target="_blank" rel="noopener noreferrer"><b>STEMSEL's</b></a> covid-19-online-babysitting-iot-stem-ai <a href="https://events.theiet.org/events/covid19-online-babysitting-iot-stem-ai/" target="_blank" rel="noopener noreferrer"><b>project</b></a>. So you can best support us by spreading the word to others about this awesome app.</p>
         <p>Stay safe and thank you for your feedback.</p>

         <hr>
          <small>On <i>${new Date().toDateString()} - ${new Date().toTimeString()}</i></small>`
};

  transport.sendMail(mailOptions,
  (error, response) => {
    if(error) {
      res.send(error);
    }else {
      res.send('Success');
    }
    transport.close();
  });

  transport.sendMail(mailOptions2,
  (error, response) => {
    if(error) {
      res.send(error);
    }else {
      res.send('Success');
    }
    transport.close();
  });

});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(('client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client',  'build', 'index.html'));
  });
}
