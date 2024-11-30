import express from 'express';  // Use import instead of require
import { Post } from '../models/posts.js';  // Use import for Post model

const router = express.Router();

// POST request to create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body; // Include title in request body
    const userId = 1; // Dummy userId, replace with real user ID (if using authentication)

    // Insert the new post into the database
    const newPost = await Post.create({
      user_id: userId,  // User ID associated with the post
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

export default router;  // Use export default for the router
