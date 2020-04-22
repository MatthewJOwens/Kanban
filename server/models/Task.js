import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Task = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  creatorEmail: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Task.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

//CASCADE ON DELETE
Task.pre('deleteMany', function (next) {
  //lets find all the comments and remove them
  Promise.all([
    //something like...
    dbContext.Comments.deleteMany({ taskId: this._conditions._id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})

//CASCADE ON DELETE
Task.pre('findOneAndRemove', function (next) {
  //lets find all the comments and remove them
  Promise.all([
    dbContext.Comments.deleteMany({ taskId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Task