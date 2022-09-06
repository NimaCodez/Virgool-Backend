const { Schema, model, Types } = require("mongoose");

const CategorySchema = new Schema({
    title: { type: String, required: true },
    parent : { type: Types.ObjectId, ref: "categories", default : undefined }
})

CategorySchema.virtual("children", {
    ref: "categories",
    localField: "_id",
    foreignField: "parent"
})

function AutoPopulate(next) {
    this.populate([{ path: "children", select: { __v: 0, id: 0 }}])
    next()
}

CategorySchema.pre("findOne", AutoPopulate).pre("find", AutoPopulate)

const CategoryModel = model("categories", CategorySchema)

module.exports = {
    CategoryModel,
    CategorySchema
}
