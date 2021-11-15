import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectService {
  async create(body) {
    const newProject = await dbContext.Projects.create(body)
    return newProject.populate('creator', 'name')
  }

  async getAll(query = {}) {
    return await dbContext.Projects.find(query).populate('creator', 'name')
  }

  async getById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'name')
    if (!project) {
      throw new BadRequest('Invalid Id')
    }
    return project
  }

  async remove(projectId, userId) {
    const project = await this.getById(projectId)
    if (project.creatorId.toString() !== userId) {
      throw new Forbidden('you do not have the credentials to delete this project')
    }
    await dbContext.Projects.findByIdAndDelete(projectId)
  }
}

export const projectService = new ProjectService()
