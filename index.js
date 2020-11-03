const express = require('express');
let port = process.env.PORT || 3000;

let app = express();

app.use(express.static('client'));

app.listen(port);