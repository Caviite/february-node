const express = require('express'); // to all the features of express js, we need to import it 
const app = express(); // to create an instance of express js, we need to call it as a function
app.use(express.json()); // to parse the incoming request body as json, we need to use the express.json() middleware
// const port = 4001;
const productRoute = require('./routes/productroutes.js');
const cartRoute = require('./routes/cart.js');
const userRoute = require('./routes/user.js')
const connectDB = require('./Config/db.js');
const env = require("./Config/env.js");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://feburary-react.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use("/product", productRoute)
app.use("/cart", cartRoute)
app.use("/auth", userRoute)

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Express js " });
});

connectDB();

app.listen(env.PORT, () => {
    console.log(`server is running on port 4001`);
});
