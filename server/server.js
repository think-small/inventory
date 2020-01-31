const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/api/hello', (req,res)=> {
  res.json("hello world!")
  console.log('hopefully this works!');
})

// Handles any requests that don't match the ones above

//u need to include the below code this so that the back knows where to route and (connect with react on the front end!!!)
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 8080
app.listen(port);

console.log('Hello, (This the server.js file speaking) App is listening on port ' + port);