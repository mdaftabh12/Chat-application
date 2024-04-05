const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const chatSchema = new mongoose.Schema(
  {
    senderId: {
        type: objectId,
        ref :"userModel"
    },
    receiverId: {
        type: objectId,
        ref :"userModel"
    },
    message:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatModel", chatSchema);
