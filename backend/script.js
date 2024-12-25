import Express from "express";
import userRoutes from './createuser/createuser.js';
import checkUser from './validateuser/logincheck.js';
import displayData from './displaydata.js';
import connectToDatabase from './database.js'; // Import the database connection function





const port = 8000;
const app = Express();

// Connect to MongoDB
connectToDatabase();



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(Express.json());

app.use('/api', userRoutes); 
app.use('/api', checkUser);

app.use('/api', displayData); 

app.use((req, res) => {
  res.send("Hello World!");
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});