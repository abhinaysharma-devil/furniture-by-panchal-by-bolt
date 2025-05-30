import express from 'express';

const router = express.Router();

// Mock data for categories
const mockCategories =[
  {
    id: 'cat1',
    title: 'Living Room from api',
    description: 'Stylish and comfortable furniture for your living space',
    slug: 'living-room',
    imgPath: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat2',
    title: 'Bedroom',
    description: 'Elegant and restful furniture for your personal sanctuary',
    slug: 'bedroom',
    imgPath: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat3',
    title: 'Dining Room',
    description: 'Beautiful dining sets for memorable meals with family and friends',
    slug: 'dining-room',
    imgPath: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat4',
    title: 'Office',
    description: 'Professional and ergonomic furniture for your workspace',
    slug: 'office',
    imgPath: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat5',
    title: 'Outdoor',
    description: 'Durable and stylish furniture for your garden or patio',
    slug: 'outdoor',
    imgPath: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  }
];

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getAllCategories = async (req, res) => {
  res.status(200).json(mockCategories);
};

router.get('/categories', getAllCategories);

export default router;
