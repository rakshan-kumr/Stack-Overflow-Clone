import mongoose from 'mongoose'

const systemInfoSchema = mongoose.Schema({
  os: String,
  browserDetails: String,
  deviceType: String,
})

const loginHistorySchema = mongoose.Schema({
  systemInfo: systemInfoSchema,
  time: {
    type: Date,
    default: Date.now,
  },
  ipAddress: String,
})

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  email: { type: String },
  joinedOn: { type: Date, default: Date.now },
  loginHistory: {
    type: [loginHistorySchema],
  },
})

export default mongoose.model('User', userSchema)
