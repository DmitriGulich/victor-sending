const path =     require('path');
const express =  require('express');
                 require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');
const smtpRouter = require('./routers/smtp.router');
const paymentRouter = require('./routers/payment.router');
const adminRouter = require('./routers/admin.router');

const templateRouter = require('./routers/template.router');

const app = express();

const { protect } = require('./middleware/auth');

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./client/build'));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/smtp', smtpRouter);
app.use('/payments', protect, paymentRouter);

app.use('/template', protect, templateRouter);

app.use('/admin', adminRouter);


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});

// MongoDB connection
//Import the mongoose module

//Set up default mongoose connection
const mongoDB = process.env.MONGO_TEST;
const MONGO_URI="mongodb+srv://valloon:g6bO9S5rMtB2kz4z@tradingplatform.ju4uj.mongodb.net/mailing?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
    console.log(`start listening at ${HOST}:${PORT}`);
});

