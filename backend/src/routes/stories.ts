import express from 'express';
import {
  getStories,
  getStoryBySlug,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} from '../controllers/storyController';
import { validateCreateStory, validateUpdateStory } from '../middleware/validation';

const router = express.Router();

router.get('/', getStories);
router.get('/id/:id', getStoryById);
router.get('/:slug', getStoryBySlug);
router.post('/', validateCreateStory, createStory);
router.put('/:id', validateUpdateStory, updateStory);
router.delete('/:id', deleteStory);

export default router;

