const mongoose = require('mongoose');

const zrExpressAccountSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  token: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Hash token before saving if needed
// zrExpressAccountSchema.pre('save', async function (next) {
//   if (this.isModified('token')) {
//     this.token = await bcrypt.hash(this.token, 10); // Hashing the token
//   }
//   next();
// });

module.exports = mongoose.model('ZRExpressAccount', zrExpressAccountSchema);
