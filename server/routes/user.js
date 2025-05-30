import express from 'express';

const router = express.Router();

// Placeholder for user routes
// e.g., router.get('/:id', getUserProfileController);
router.get('/', (req, res) => {
  res.send('User routes are working!');
});

export default router;