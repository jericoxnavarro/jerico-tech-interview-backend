import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['added', 'reopened', 'done'],
  },
  dateAdded: { type: Date, default: Date.now },
});

const TodoModel = mongoose.model('Todo', TodoSchema);

export default TodoModel;
