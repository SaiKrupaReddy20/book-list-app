const express = require('express');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv');
const error = require('./middlewares/errorMiddlewareHandler');
const usersRoute = require('./routes/usersRoutes');
const bookRoutes = require('./routes/bookRoutes');


dbConnect();
dotenv.config();


const app = express();
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}

app.use(express.json());

app.use(cors(corsOptions));

app.use('/api/users', usersRoute);
app.use('/api/books', bookRoutes);
app.use(error.errorMiddlewareHandler);



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server successfully running`);
})