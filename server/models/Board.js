import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Board = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Board.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

//CASCADE ON DELETE
Board.pre('findOneAndRemove', function (next) {
  //   //lets find all the lists and remove them
  Promise.all([
    dbContext.Lists.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Board