import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  sender_email: {
    type: String,
    required: [true, 'Please enter your email'],
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
    },
    message: (props) => `${props.value} is not a valid email!`,
  },
  receiver_email: {
    type: String,
    required: [true, 'Please enter your email'],
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
    },
    message: (props) => `${props.value} is not a valid email!`,
  },
  emailSubject: {
    type: String,
    required: [true, 'Please enter your email subject'],
  },
  ipAddress: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
