const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const port = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


require('./src/controllers/projectController')(app);


app.listen(port, () => {   
    console.log(`App rodando na porta ${port}.`);
});