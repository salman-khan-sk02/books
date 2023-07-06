const mongoose = require("mongoose");
const { v4 } = require("uuid");

const additionalDataSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4().replace(/\-/g, ""),
    },
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    year: {
      type: Number,
    },
    genres: {
      type: [String],
    },
    ratings: {
      type: [additionalDataSchema],
    },
  },
  {
    timestamps: true,
    collection: "book",
  }
);

bookSchema.statics.getAllBooks = async function () {
  try {
    const items = await this.find();
    return items;
  } catch (error) {
    throw error;
  }
};

bookSchema.statics.addBook = async function (
  title,
  author,
  year,
  genres,
  ratings
) {
  try {
    const Item = await this.create({ title, author, year, genres, ratings });
    return Item;
  } catch (error) {
    throw error;
  }
};

bookSchema.statics.deleteBookById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

bookSchema.statics.getBooksByfilters = async function (filter) {
  try {
    const book = await this.find(filter);
    if (!book) throw { error: "No book found" };
    return book;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Menu", bookSchema);
