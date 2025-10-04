const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  picture: String,
  gstin: String,
});

ownerSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_KEY, { expiresIn: '24h' });
    return token;
}
ownerSchema.methods.comparePassword = async function(Password) {
    const isMatch = await bcrypt.compare(Password, this.password);
    return isMatch;
}
ownerSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}
module.exports = mongoose.model("owner", ownerSchema);
