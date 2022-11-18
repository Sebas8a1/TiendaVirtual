const moongose = require('mongoose');

const connectDB = () => {
    moongose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with host: ${con.connection.host}`);
    }).catch(err => {
        console.log(err);
    });
    ;
}

module.exports = connectDB;