import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintService } from '../services/SprintService'
import BaseController from '../utils/BaseController'

export class SprintController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('/:id/sprints', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:id/sprints', this.create)
      // .delete('/:id/sprints', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintService.create(req.body)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const query = req.query
      const sprint = await sprintService.getById(query)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  // async remove(req, res, next) {
  //   try {
  //     const userId = req.userInfo.id
  //     const sprintId = req.params.id
  //     await sprintService.remove(sprintId, userId)
  //     res.send('you have deleted this sprint forever')
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
