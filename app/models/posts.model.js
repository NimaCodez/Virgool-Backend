const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
    title: { type: String, required: true }, // Post's main title
    intro: { type: String, required: true }, // Post's short intro text
    bodyText: { type: String, required: true }, // Post's actual content and text
    author: { type: Types.ObjectId, required: true }, // Post's author
    banner: { type: String, required: true }, // Image related to content and title
    contentImages: { type: [String] }, // Post's body images such as example images, inserted ones and ...
    stars: { type: [Number], default: [] } //? blogs/start/:blogId | // Counts of starts users give
    // To Be Added: likes, Comments, Dislikes, bookmarked, etc.
}, {
    timestamps: {
        createdAt: true
    }
})

const PostModel = model("posts", PostSchema)

module.exports = {
    PostModel
}
