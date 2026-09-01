import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

/**
 * GET /api/blogs
 * Public endpoint to fetch all published blog posts
 */
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = { status: 'PUBLISHED' };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search && typeof search === 'string' && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { summary: searchRegex },
        { category: searchRegex },
        { tags: searchRegex }
      ];
    }

    const posts = await BlogPost.find(query)
      .select('-__v')
      .sort({ publishedAt: -1, createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    console.error('[PUBLIC BLOGS FETCH ERROR]:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve published blog posts'
    });
  }
});

/**
 * GET /api/blogs/:slug
 * Public endpoint to fetch a single published blog post by slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOneAndUpdate(
      { slug: slug.toLowerCase().trim(), status: 'PUBLISHED' },
      { $inc: { views: 1 } },
      { new: true }
    ).select('-__v');

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Blog article not found or not currently published'
      });
    }

    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error('[PUBLIC BLOG POST FETCH ERROR]:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve blog article'
    });
  }
});

export default router;
