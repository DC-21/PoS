const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');

const helloRouter = require('./routes/helloRouter');

app.use('/hello', helloRouter);


db.sequelize.sync().then(()=>{
    app.listen(3000, ()=>{
        console.log("server is running on port 3000");
    });
});