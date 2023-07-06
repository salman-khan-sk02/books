const BookModel = require("../models/book.js");

module.exports = {
  addBook: async (req, res) => {
    try {
      const { title, author, year, genres, ratings } = req.body;
      const book = await BookModel.addBook(
        title,
        author,
        year,
        genres,
        ratings
      );
      return res.status(200).json({ success: true, book });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  getBooksByGenre: async (req, res) => {
    try {
      let filters = {};
      let genre = req.query.genre;
      if (genre) {
        filters.genres = genre;
      }
      const item = await BookModel.getBooksByfilters(filters);
      console.log(item);
      return res.status(200).json({
        success: true,
        message: item,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  getAverageRating: async (req, res) => {
    try {
      let filters = {};
      let title = req.query.title;
      let average = 0;
      if (title) {
        filters.title = title;
      }
      const item = await BookModel.getBooksByfilters(filters);

      if (item[0].ratings) {
        let ratings = [];
        ratings = item[0].ratings;
        sum = 0;
        ratings.forEach((rating) => {
          sum = sum + rating.rating;
        });
        average = sum / ratings.length;
        console.log("Average", average);
      }

      return res.status(200).json({
        success: true,
        message: `the Avarage rating for the book ${title} is ${average} out of 5`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
};
