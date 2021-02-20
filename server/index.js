const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const routes = require("../routes");

//SERVICE
const authService = require("../services/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const handle = app.getRequestHandler();
const handle = routes.getRequestHandler(app);

const config = require("./config");

const Book = require("./models/book");
const bodyParser = require("body-parser");

const bookRoutes = require("./routes/book");
const portfolioRoutes = require("./routes/portfolio");
const blogRoutes = require("./routes/blog");

const secretData = [
  {
    title: "SecretData 1",
    description: "Plans to build spaceship",
  },
  {
    title: "SecretData 2",
    description: "My secret passwords",
  },
];

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.error(err));

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.use("/api/v1/books", bookRoutes);

    // server.post("/api/v1/books", (req, res) => {
    //   const bookData = req.body;
    //   const book = new Book(bookData);

    //   book.save((err, createdBook) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json(createdBook);
    //   });
    // });

    // server.get("/api/v1/books", (req, res) => {
    //   Book.find({}, (err, allBooks) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json(allBooks);
    //   });
    // });

    // server.patch("/api/v1/books/:id", (req, res) => {
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

    // server.delete("/api/v1/books/:id", (req, res) => {
    //   const bookId = req.params.id;
    //   Book.deleteOne({ _id: bookId }, (err, deletedBook) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json(deletedBook);
    //   });
    // });

    //checkJWT is middleware that calls next() if valid token,
    // which willjust call next function argument (the req/res arrow fn)
    server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
      console.log("CONSOLE USER");
      console.log(req.user);

      return res.json(secretData);
    });

    server.get(
      "/api/v1/onlysiteowner",
      authService.checkJWT,
      authService.checkRole("siteOwner"), //middleware check endpoint
      (req, res) => {
        return res.json(secretData);
      }
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.use(function (err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res
          .status(401)
          .send({ title: "Unauthorized", detail: "Unauthorized Access!" });
      }
    });

    server.use(handle).listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
