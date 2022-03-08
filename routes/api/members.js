const express = require('express');
const router = express.Router();
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => {
  res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some((item) => item.id === parseInt(req.params.id)); // gives us a true or false

  if (found) {
    res.json(members.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of: ${req.params.id}` });
  }
  /* res.send(req.params.id); */
});

// Create Member
router.post('/');

module.exports = router;
