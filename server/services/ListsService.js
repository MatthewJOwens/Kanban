import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class ListsService {
  async getAll(userEmail) {
    return await dbContext.Lists.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Lists.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Lists.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Lists.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Lists.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
  }
  async getTasksByListId(listId) {
    let data = await dbContext.Tasks.find({ listId: listId })
    if (!data) {
      throw new BadRequest("Invalid Task ID or you do not own this task")
    }
    return data
  }
}


export const listsService = new ListsService()