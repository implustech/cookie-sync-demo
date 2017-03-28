var express = require('express');
var router = express.Router();

const books = [
  {
    id: 1,
    name: 'Advanced Programming in the UNIX Environment, 3rd Edition',
    author: 'by W. Richard Stevens and Stephen A. Rago',
    description: 'For more than twenty years, serious C programmers have relied on one book for practical, in-depth knowledge of the programming interfaces that drive the UNIX and Linux kernels: W. Richard Stevens’ Advanced Programming in the UNIX® Environment . Now, once again, Rich’s colleague Steve Rago has thoroughly updated this classic work. The new third edition supports today’s leading platforms, reflects new technical advances and best practices, and aligns with Version 4 of the Single UNIX Specification.',
    imgsrc: 'https://images-na.ssl-images-amazon.com/images/I/5160yLwNOZL._AC_US218_.jpg'
  },
  {
    id: 2,
    name: 'The Art of UNIX Programming (The Addison-Wesley Professional Computng Series)',
    author: 'by Eric S. Raymond',
    description: 'This text reveals the software design secrets of the original Unix designers, showing how they produce software that is fast, portable, reuseable, modular and long-lived. Luminaries including Brian Kernighan, David Korn and Henry Spencer contribute to the book.',
    imgsrc: 'https://images-na.ssl-images-amazon.com/images/I/51iyn7kz0uL._AC_US218_.jpg'
  }
]
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.render('book', Object.assign({}, {title: 'book.com'}, books[req.params.id - 1]))
});

module.exports = router;
