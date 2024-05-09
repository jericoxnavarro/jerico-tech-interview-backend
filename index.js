import express from 'express';
import cors from 'cors';
import connectDB from './src/modules/connect-db/index.js';
import TodoRoute from './src/routes/todos.routes.js';

const app = express();
const PORT = 3001;

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
};

app.use(cors(corsOptions));

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', TodoRoute);

app.get('/', (request, response) => {
  response.send({ message: 'Todo API' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
