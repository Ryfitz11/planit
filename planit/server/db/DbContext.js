import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ProjectSchema } from '../models/Project'
import { SprintSchema } from '../models/Sprint'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Projects = mongoose.model('Project', ProjectSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
}

export const dbContext = new DbContext()
