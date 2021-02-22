const express = require("express");
const router = express.Router();

const bookCtrl = require("../controllers/book");

router.post("", bookCtrl.saveBook);

router.get("", bookCtrl.getBooks);

router.patch("/:id", bookCtrl.updateBook);

router.delete("/:id", bookCtrl.deleteBook);

module.exports = router;


    // server.post("", (req, res) => {
    //   const bookData = req.body;
    //   const book = new Book(bookData);

    //   book.save((err, createdBook) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json(createdBook);
    //   });
    // });

    // server.get("", (req, res) => {
    //   Book.find({}, (err, allBooks) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json(allBooks);
    //   });
    // });

    // server.patch("/:id", (req, res) => {
    //   const bookId = req.params.id;
    //   const bookData = req.body;
    //   console.log(bookId);
    //   console.log(bookData);
    //   Book.findById(bookId, (err, foundBook) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     foundBook.set(bookData);
    //     foundBook.save((err, savedbook) => {
    //       if (err) {
    //         return res.status(422).send(err);
    //       }
    //       return res.json(foundBook);
    //     });
    //   });
    // });

    // server.delete("/:id", (req, res) => {
    //   const bookId = req.params.id;
    //   Book.deleteOne({ _id: bookId }, (err, deletedBook) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json(deletedBook);
    //   });
    // });
