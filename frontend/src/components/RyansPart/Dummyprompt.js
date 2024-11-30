import React, { useState } from 'react';
import axios from 'axios';
import './Dummyprompt.css';

function Dummyprompt() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && content) {
      try {
        const response = await axios.post('http://localhost:3002/posts', {
          title,    // Sending title from form input
          content,
        });

        if (response.data.success) {
          alert('Post Created Successfully!');
          setTitle('');   // Clear title field
          setContent(''); // Clear content field
        } else {
          alert('Failed to create post');
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post');
      }
    } else {
      alert('Please fill out both title and content!');
    }
  };

  return (
    <div className="promptbox">
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title"><h2>Title:</h2></label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content"><h2>Content:</h2></label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the content"
          />
        </div>

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default Dummyprompt;
