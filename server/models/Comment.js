import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  body: { type: String, required: true },
  creatorName: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Comment.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })


//CASCADE ON DELETE
// Comment.pre('deleteMany', function (next) {
//lets find all the lists and remove them
// Promise.all([
//something like...
// dbContext.Comments.deleteMany({ taskId: this._conditions._id }),
// ])
// .then(() => next())
// .catch(err => next(err))
// })

//CASCADE ON DELETE
// Comment.pre('findOneAndRemove', function (next) {
//lets find all the lists and remove them
// Promise.all([
// dbContext.Comments.deleteMany({ taskId: this._conditions._id })
// ])
// .then(() => next())
// .catch(err => next(err))
// })

export default Comment