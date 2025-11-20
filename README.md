# TinesStories User Demo

A full-featured blog platform for publishing and managing company stories/articles.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Chakra UI
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM

## Project Structure

```
tinesStory/
├── frontend/          # Next.js application
├── backend/           # Express.js API
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/tinesstories
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
```

3. Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features (Milestone 1)

- ✅ View published stories on homepage
- ✅ Read individual story details
- ✅ Create new stories
- ✅ Edit existing stories
- ✅ Delete stories
- ✅ Publish/Draft toggle
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ SEO optimization

## API Endpoints

- `GET /api/stories` - Get all stories (with pagination and filters)
- `GET /api/stories/:slug` - Get single story by slug
- `POST /api/stories` - Create new story
- `PUT /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story
