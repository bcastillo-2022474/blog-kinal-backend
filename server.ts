import express from 'express';
import cors from 'cors';
import dbConnection from './db/db-config';
import dotenv from 'dotenv';
import morgan from 'morgan';
import commentRoutes from './src/routes/comment.routes';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: ['.env', '.env.example']
  });
}

const PORT = process.env.PORT! || 3000;
const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}

app.get('/', (_, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/comments', commentRoutes);

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('NO SE PUDO CONECTAR A LA DB');
    console.error(err);
  });
