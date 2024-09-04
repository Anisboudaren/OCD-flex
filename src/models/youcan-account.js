const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const youCanAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Hash password before saving
// youCanAccountSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   if (this.isModified('token')) {
//     this.token = encrypt(this.token); // Encrypt the token
//   }
//   next();
// });



module.exports = mongoose.model('YouCanAccount', youCanAccountSchema);
