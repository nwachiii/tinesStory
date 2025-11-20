import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export const validateCreateStory = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, content, excerpt, authorName, featuredImage, status } = req.body;

  if (!title || title.trim().length < 3) {
    return next(new AppError('Title is required and must be at least 3 characters', 400));
  }

  if (!content || content.trim().length < 10) {
    return next(new AppError('Content is required and must be at least 10 characters', 400));
  }

  if (!excerpt || excerpt.trim().length < 10 || excerpt.trim().length > 300) {
    return next(
      new AppError('Excerpt is required and must be between 10 and 300 characters', 400)
    );
  }

  if (!authorName || authorName.trim().length < 2) {
    return next(new AppError('Author name is required and must be at least 2 characters', 400));
  }

  if (!featuredImage || !featuredImage.trim()) {
    return next(new AppError('Featured image URL is required', 400));
  }

  if (status && !['published', 'draft'].includes(status)) {
    return next(new AppError('Status must be either "published" or "draft"', 400));
  }

  next();
};

export const validateUpdateStory = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, content, excerpt, authorName, featuredImage, status } = req.body;

  if (title !== undefined && title.trim().length < 3) {
    return next(new AppError('Title must be at least 3 characters', 400));
  }

  if (content !== undefined && content.trim().length < 10) {
    return next(new AppError('Content must be at least 10 characters', 400));
  }

  if (excerpt !== undefined && (excerpt.trim().length < 10 || excerpt.trim().length > 300)) {
    return next(new AppError('Excerpt must be between 10 and 300 characters', 400));
  }

  if (authorName !== undefined && authorName.trim().length < 2) {
    return next(new AppError('Author name must be at least 2 characters', 400));
  }

  if (featuredImage !== undefined && !featuredImage.trim()) {
    return next(new AppError('Featured image URL cannot be empty', 400));
  }

  if (status && !['published', 'draft'].includes(status)) {
    return next(new AppError('Status must be either "published" or "draft"', 400));
  }

  next();
};

