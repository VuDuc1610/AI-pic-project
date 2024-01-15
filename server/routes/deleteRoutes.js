import express from 'express';
import * as dotenv from 'dotenv';
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

//Route for Delete
router.route('/:id').delete( async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Post.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: 'Unable to delete a post, please try again' });
    }
  });

  export default router;