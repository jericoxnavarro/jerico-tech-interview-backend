import express from 'express';
import TodoModel from '../models/todos.model.js';
const router = express.Router();

// * CREATE TODO
router.post('/todo', async (request, response) => {
  try {
    const createdTodo = new TodoModel({
      title: request.body.title,
      description: request.body.description,
      status: 'added',
    });

    await createdTodo.save();
    const updatedTodos = await TodoModel.find({});
    response.status(200).send({
      status: 'created',
      data: updatedTodos,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: 'error',
      data: error,
    });
  }
});

// * UPDATE TODO'
router.put('/todo/:id', async (request, response) => {
  try {
    const todo = await TodoModel.findByIdAndUpdate(request.params.id, {
      status: request.body.status,
    });
    await todo.save();
    const updatedTodos = await TodoModel.find({});
    response.status(200).send({
      status: 'updated',
      data: updatedTodos,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: 'error',
      data: error,
    });
  }
});

// * DELETE TODO'
router.delete('/todo/:id', async (request, response) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(request.params.id);
    if (todo) {
      const updatedTodos = await TodoModel.find({});
      response.status(200).send({
        status: 'deleted',
        data: updatedTodos,
      });
    } else {
      response.status(404).send({
        status: 'not-found',
        data: {},
      });
    }
  } catch (error) {
    response.status(500).send({
      status: 'error',
      data: error,
    });
  }
});

// * GET TODOS
router.get('/todos', async (request, response) => {
  const todos = await TodoModel.find({});

  try {
    response.status(200).send({
      status: 'retrived',
      data: todos,
    });
  } catch (error) {
    response.status(500).send({
      status: 'error',
      data: error,
    });
  }
});

// * GET TODO
router.get('/todo/:id', async (request, response) => {
  try {
    const todo = await TodoModel.findOne({ _id: request.params.id });
    if (todo) {
      const updatedTodos = await TodoModel.find({});
      response.status(200).send({
        status: 'retrived',
        data: updatedTodos,
      });
    } else {
      response.status(404).send({
        status: 'not-found',
        data: {},
      });
    }
  } catch (error) {
    response.status(500).send({
      status: 'error',
      data: error,
    });
  }
});

export default router;
