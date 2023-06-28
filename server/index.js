const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');

const helloRouter = require('./routes/helloRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

app.use('/hello',helloRouter);
app.use('/product',productRouter);
app.use('/user',userRouter)


db.sequelize.sync().then(()=>{
    app.listen(3000, ()=>{
        console.log("server is running on port 3000");
    });
});