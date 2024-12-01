const express = require('express');
const bodyParser = require('body-parser');

const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const departmentsRoute = require('./routes/departmentsRoute');
const coursesRoute = require('./routes/coursesRoute');
const studentsRoute = require('./routes/studentsRoute');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.send("Peace");
});

app.get('/rj', function(req, res){
    res.send("loko-loko");
});


app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);
app.use('/api/dept', departmentsRoute);
app.use('/api/cour', coursesRoute);
app.use('/api/st', studentsRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});

//npm start
