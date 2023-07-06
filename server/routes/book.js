const controller = require("../controllers/book.js");
module.exports = function (app) {
  app.post("/book/add", controller.addBook);
  app.get("/book/getByGenre/", controller.getBooksByGenre);
  app.get("/book/getAverageRating/", controller.getAverageRating);
};
