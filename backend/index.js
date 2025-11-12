// const express=require('express');
// const app=express();
// require('dotenv').config();
// require('./Models/db');
// const PORT=process.env.port || 8080;
// const TaskRouter=require('./routes/TaskRouter');
// const bodyParser=require('body-parser');
// const cors=require('cors');


// app.get("/",(req,res)=>{
//     res.send("Hello Server is running");  
// })

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/tasks',TaskRouter)

// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);

// })

// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./Models/db');

const app = express();

// ✅ Fix environment variable (uppercase PORT)
const PORT = process.env.PORT || 8080;

// ✅ Enable CORS for frontend on port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Routers
const TaskRouter = require('./routes/TaskRouter');
app.use('/tasks', TaskRouter);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Server is running successfully');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

