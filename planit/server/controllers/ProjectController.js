import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectService } from '../services/ProjectService'
import BaseController from '../utils/BaseController'

export class ProjectController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectService.create(req.body)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const project = await projectService.getAll(query)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const project = await projectService.getById(req.params.id)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const projectId = req.params.id
      await projectService.remove(projectId, userId)
      res.send('you have deleted this project forever')
    } catch (error) {
      next(error)
    }
  }
}
