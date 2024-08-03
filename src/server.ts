import express, { Request, Response } from 'express';
import { questionRoutes } from './routes/questionRoutes'
import { disciplineRoutes } from './routes/disciplineRoutes';
import { userRoutes } from './routes/userRoutes';

const app = express();
const port = 3000;
app.use(express.json());
app.use(questionRoutes);
app.use(disciplineRoutes);
app.use(userRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


// let questions: { id: number; question: string; response: string; image: string }[] = [];
// let currentId = 1;
// app.post('/questions', (req: Request, res: Response) => {
//   const { question, response, image } = req.body;
//   if (!question) {
//     return res.status(400).send('Question is required');
//   }
//   if (!response) {
//     return res.status(400).send('Response is required');
//   }
//   if (!image) {
//     return res.status(400).send('Image is required');
//   }
//   const item = { id: currentId++, question, response, image };
//   questions.push(item);
//   res.status(201).json(item);
// });


// app.get('/questions', (req: Request, res: Response) => {
//   res.json(questions);
// });

// app.get('/questions/:id', (req: Request, res: Response) => {
//   const item = questions.find(i => i.id === parseInt(req.params.id));
//   if (item) {
//     res.json(item);
//   } else {
//     res.status(404).send('Item not found');
//   }
// });

// app.patch('/questions/:id/response', (req: Request, res: Response) => {
//   const index = questions.findIndex(i => i.id === parseInt(req.params.id));
//   if (index !== -1) {
//     const { response } = req.body;
//     if (!response) {
//       return res.status(400).send('Response is required');
//     }
//     questions[index] = { ...questions[index], response };
//     res.json(questions[index]);
//   } else {
//     res.status(404).send('Item not found');
//   }
// });


// app.put('/questions/:id', (req: Request, res: Response) => {
//   const index = questions.findIndex(i => i.id === parseInt(req.params.id));
//   if (index !== -1) {
//     const { question, response, image } = req.body;
//     if (!question) {
//       return res.status(400).send('Question is required');
//     }
//     if (!response) {
//       return res.status(400).send('Response is required');
//     }
//     if (!image) {
//       return res.status(400).send('Image is required');
//     }
//     questions[index] = { id: parseInt(req.params.id), question, response, image };
//     res.json(questions[index]);
//   } else {
//     res.status(404).send('Item not found');
//   }
// });


// app.delete('/questions/:id', (req: Request, res: Response) => {
//   const index = questions.findIndex(i => i.id === parseInt(req.params.id));
//   if (index !== -1) {
//     questions.splice(index, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send('Item not found');
//   }
// });
