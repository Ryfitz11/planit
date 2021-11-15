import mongoose from 'mongoose'
import { ProjectSchema } from '../models/Project'
const Schema = mongoose.Schema

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
ProjectSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
