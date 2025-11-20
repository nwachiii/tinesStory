# TinesStories

A full-featured blog platform for publishing and managing company stories/articles with a modern, responsive design and comprehensive admin dashboard.

## Tech Stack

- **Frontend**: Next.js 14.0.4 (App Router), TypeScript, Chakra UI, React Query
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Additional**: Framer Motion, React Markdown, React Syntax Highlighter

## Project Structure

```
tinesStory/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # App Router pages and layouts
│   │   ├── components/# Reusable UI components
│   │   ├── lib/       # API client and utilities
│   │   ├── types/     # TypeScript type definitions
│   │   └── theme.ts   # Chakra UI theme configuration
│   ├── public/        # Static assets
│   └── package.json
├── backend/           # Express.js API
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Express middleware
│   │   ├── config/     # Database configuration
│   │   └── utils/      # Utility functions
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the backend root:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/tinesstories
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tinesstories
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the frontend root:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

### Core Features
- ✅ **Story Management**: Create, read, update, and delete stories
- ✅ **Rich Text Support**: Markdown rendering with syntax highlighting
- ✅ **Publish/Draft System**: Toggle story visibility
- ✅ **SEO Optimization**: Meta tags and structured data
- ✅ **Responsive Design**: Mobile-first approach with Chakra UI

### Admin Dashboard
- ✅ **Story Overview**: Table view of all stories with search and filtering
- ✅ **Quick Actions**: View, edit, and delete stories directly from dashboard
- ✅ **Status Management**: Publish/draft toggles
- ✅ **Confirmation Dialogs**: Safe deletion with user confirmation

### User Experience
- ✅ **Dark Mode Support**: Full theme switching capability
- ✅ **Loading States**: Skeleton components and loading spinners
- ✅ **Error Handling**: Comprehensive error messages and toast notifications
- ✅ **Navigation**: Breadcrumbs and intuitive routing
- ✅ **Form Validation**: Client-side validation with error feedback

### Technical Features
- ✅ **TypeScript**: Full type safety across frontend and backend
- ✅ **API Integration**: RESTful API with React Query for state management
- ✅ **Component Architecture**: Reusable components with proper separation of concerns
- ✅ **Performance**: Optimized builds and lazy loading

## API Endpoints

### Stories
- `GET /api/stories` - Get all stories (with pagination, filtering, and search)
- `GET /api/stories/:slug` - Get single story by slug
- `POST /api/stories` - Create new story
- `PUT /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story

### Response Format
All endpoints return JSON with consistent structure:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

## Recent Updates

- **Delete Confirmation**: Admin dashboard now uses a proper confirmation dialog instead of browser alerts
- **Dark Mode Compliance**: Fixed hardcoded colors to support theme switching
- **UI Improvements**: Enhanced user experience with better loading states and error handling

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server

### Environment Variables

**Backend (.env):**
```
MONGODB_URI=mongodb://localhost:27017/tinesstories
PORT=5000
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## License

This project is private and proprietary.
