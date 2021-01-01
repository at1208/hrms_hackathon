const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const employeeRouter = require("./routers/employee_router");


app.use(cors({origin: "http://localhost:3000"}))
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use("/api", employeeRouter);

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.log(err);
    });

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
