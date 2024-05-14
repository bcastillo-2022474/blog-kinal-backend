import { type Request, type Response } from 'express';
import Comment from '../models/comment.model';

export const getCommentByPostAndParentComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { post, id } = req.params;

    const comments = await Comment.find({ publication: post, parent: id });
    res.status(200).json({
      message: 'Comments retrieved successfully',
      data: comments
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server error', error: e });
  }
};

export const postComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { publication, parent, username, content } = req.body;
    const isParentAvailable = Boolean(parent);

    const comment = new Comment({
      publication,
      username,
      content,
      ...(isParentAvailable ? { parent } : {})
    });

    const savedComment = await comment.save();
    res.status(201).json({
      message: 'Comment created successfully',
      data: savedComment
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server error', error: e });
  }
};
