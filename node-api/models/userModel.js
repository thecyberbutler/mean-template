const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordModifiedAt: {
      type: Date,
    },
    token: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.active;
        delete ret.passwordModifiedAt;
        delete ret.token;
        delete ret.__v;
        ret.password = '****';
        return ret;
      },
    },
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordModifiedAt = Date.now();
  }
  next();
});

userSchema.methods.passwordCheck = async function (password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

userSchema.methods.checkPasswordChange = function (time) {
  if (this.passwordModifiedAt > new Date(time)) {
    return false;
  }
  return true;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
