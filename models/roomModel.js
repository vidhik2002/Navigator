const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomid: {
    type: String,
    required: true,
    unique: true,
  },
  Blindfolda: {
    type: String, //socket id
  },
  Guidea: {
    type: String,
  },
  Blindfoldb: {
    type: String,
  },
  Guideb: {
    type: String,
  },
  maze: {
    type: String,
    get: function (data) {
      try {
        return JSON.parse(data);
      } catch (err) {
        return data;
      }
    },
    set: function (data) {
      return JSON.stringify(data);
    },
  },
});
const Room = mongoose.model('room', RoomSchema);
module.exports = Room;
