// models/Article.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    comments: [
        {
            userId: { type: String, required: true },
            comment: { type: String, required: true }
        }
    ]
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
