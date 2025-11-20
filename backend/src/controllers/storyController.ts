import { Request, Response, NextFunction } from 'express';
import Story, { IStory } from '../models/Story';
import { generateUniqueSlug } from '../utils/slugify';
import { AppError } from '../middleware/errorHandler';

export const getStories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string | undefined;

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    // Get stories
    const stories = await Story.find(query)
      .select('-content')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Story.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      stories,
      totalPages,
      currentPage: page,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const getStoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    const story = await Story.findOne({ slug }).lean();

    if (!story) {
      return next(new AppError('Story not found', 404));
    }

    res.json({ story });
  } catch (error) {
    next(error);
  }
};

export const getStoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id).lean();

    if (!story) {
      return next(new AppError('Story not found', 404));
    }

    res.json({ story });
  } catch (error) {
    next(error);
  }
};

export const createStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content, excerpt, authorName, featuredImage, status } = req.body;

    // Generate unique slug
    const slug = await generateUniqueSlug(title, Story);

    // Create story
    const storyData: any = {
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt.trim(),
      authorName: authorName.trim(),
      featuredImage: featuredImage.trim(),
      status: status || 'draft',
    };

    const story = new Story(storyData);
    await story.save();

    res.status(201).json({
      success: true,
      story,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new AppError('Slug already exists', 400));
    }
    next(error);
  }
};

export const updateStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, authorName, featuredImage, status } = req.body;

    const story = await Story.findById(id);

    if (!story) {
      return next(new AppError('Story not found', 404));
    }

    // Update fields
    if (title !== undefined) {
      story.title = title.trim();
      // Regenerate slug if title changed
      story.slug = await generateUniqueSlug(title, Story, id);
    }
    if (content !== undefined) story.content = content.trim();
    if (excerpt !== undefined) story.excerpt = excerpt.trim();
    if (authorName !== undefined) story.authorName = authorName.trim();
    if (featuredImage !== undefined) story.featuredImage = featuredImage.trim();
    if (status !== undefined) story.status = status;

    await story.save();

    res.json({
      success: true,
      story,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new AppError('Slug already exists', 400));
    }
    next(error);
  }
};

export const deleteStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const story = await Story.findByIdAndDelete(id);

    if (!story) {
      return next(new AppError('Story not found', 404));
    }

    res.json({
      success: true,
      message: 'Story deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

