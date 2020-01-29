const express = require('express');
const apiRouter = require( './routes');
const path = require('path')

 const app = express();






app.use(express.static('public'));
app.use(apiRouter.router);





const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
