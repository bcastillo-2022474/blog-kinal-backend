import { Schema, model, now } from 'mongoose';

const Comment = new Schema({
  parent: {
    type: Schema.ObjectId
  },
  content: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true,
    default: now().toISOString(),
  },
  // Identifier which relationates the comment with a post
  publication: {
    type: String,
    required: true
  }
});

export default model('Comment', Comment);
