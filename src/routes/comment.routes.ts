import { Router } from 'express';
import { body, param } from 'express-validator';
import { getCommentByPostAndParentComment, postComment } from '../controllers/comment.controllers';

const router = Router();

router
  .route('/:post/:id')
  .get([
    param('post').optional().isMongoId(),
    param('id').optional().isMongoId()
  ], getCommentByPostAndParentComment);

router
  .route('/')
  .post([
    body('publication').isString(),
    body('author').isString().isLength({ min: 3 }),
    body('content').isString().isLength({ min: 3 }),
    body('parent').optional().isMongoId()
  ], postComment);

export default router;
