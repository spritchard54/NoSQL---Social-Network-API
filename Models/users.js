// Require schema and model from mongoose
const mongoose = require("mongoose");
// const thoughtsSchema = require('./thoughts');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Construct a new instance of the schema class
const usersSchema = new mongoose.Schema(
  {
    // Configure individual properties using Schema Types
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // Must match a valid email address (look into Mongoose's matching validation)
      validate: [validateEmail, "Please fill a valid email address"],
    },
    //   * Array of `_id` values referencing the `Thought` model
    thoughts: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Thought" 
      }
    ],
    //   * Array of `_id` values referencing the `User` model (self-reference)
    friends: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      }
    ],
  },
  {
    toJSON: { 
      getters: true 
    },
  }
);

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
usersSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = mongoose.model("User", usersSchema);

module.exports = User;