import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })

ProjectSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
