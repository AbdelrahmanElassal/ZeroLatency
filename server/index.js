import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import authRouter from './routes/authRoutes.js';


const app = express();


app.use(cors());
app.use(express.json());

app.use(authRouter);
app.get('/' , (req , res)=>{
  res.json({ message: 'Hello from the server!' });
})


app.use(globalErrorHandler);

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
  });