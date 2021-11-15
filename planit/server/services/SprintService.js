import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class SprintService {
  async create(body) {
    const newSprint = await dbContext.Sprints.create(body)
    return newSprint.populate('creator', 'name')
  }

  async getById(id) {
    const sprint = await dbContext.Sprints.find({ projectId: id }).populate('creator')
    if (!sprint) {
      throw new BadRequest('Invalid Id')
    }
    return sprint
  }

  // async remove(sprintId, userId) {
  //   const sprint = await this.getById(sprintId)
  //   if (sprint.creatorId.toString() !== userId) {
  //     throw new Forbidden('you do not have the credentials to delete this sprint')
  //   }
  //   await dbContext.Sprints.findByIdAndDelete(sprintId)
  // }
}

export const sprintService = new SprintService()
