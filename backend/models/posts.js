import { Sequelize, DataTypes } from 'sequelize';

// Create a Sequelize instance (assuming your DB connection details are here)
const sequelize = new Sequelize('webdev2testdb', 'root', '23100917', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Post model
const Post = sequelize.define('Post', {
  post_id: {  // Explicitly use 'post_id' instead of 'id'
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,  // Mark as primary key
    autoIncrement: true,  // Automatically increment the post_id for each new post
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,  // Disable automatic timestamp fields like 'updated_at'
});

// Export the sequelize instance and the model
export { sequelize, Post };
