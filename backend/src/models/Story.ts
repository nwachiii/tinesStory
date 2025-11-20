import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStory extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorName: string;
  featuredImage: string;
  status: 'published' | 'draft';
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const StorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title must not exceed 200 characters'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [10, 'Content must be at least 10 characters'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      minlength: [10, 'Excerpt must be at least 10 characters'],
      maxlength: [300, 'Excerpt must not exceed 300 characters'],
      trim: true,
    },
    authorName: {
      type: String,
      required: [true, 'Author name is required'],
      minlength: [2, 'Author name must be at least 2 characters'],
      maxlength: [100, 'Author name must not exceed 100 characters'],
      trim: true,
    },
    featuredImage: {
      type: String,
      required: [true, 'Featured image URL is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'draft',
      required: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
StorySchema.index({ slug: 1 }, { unique: true });
StorySchema.index({ status: 1 });
StorySchema.index({ publishedAt: -1 });
StorySchema.index({ createdAt: -1 });

// Pre-save hook to set publishedAt
StorySchema.pre('save', function (next) {
  if (this.isModified('status')) {
    if (this.status === 'published' && !this.publishedAt) {
      this.publishedAt = new Date();
    } else if (this.status === 'draft') {
      this.publishedAt = null;
    }
  }
  next();
});

const Story: Model<IStory> = mongoose.model<IStory>('Story', StorySchema);

export default Story;

