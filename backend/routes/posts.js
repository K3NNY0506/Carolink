import express from 'express';  
import { Post } from '../models/posts.js';  // Import Post model
import { validateToken } from '../middlewares/AuthMiddleware.js'; // Correct path to AuthMiddleware.js

const router = express.Router();

// POST request to create a new post
router.post('/', validateToken, async (req, res) => {
  try {
    const { title, content } = req.body;  // Title and content from frontend
    const userId = req.user.id;  // User ID from the decoded JWT token

    // Insert the new post into the database
    const newPost = await Post.create({
      user_id: userId,  // Using the user ID from the authenticated user
      title: title,     // Title from frontend form
      content: content, // Content from frontend form
      created_at: new Date(),  // Automatically sets the current timestamp
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Post created successfully!',
      post: newPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating post',
    });
  }
});

export default router;
