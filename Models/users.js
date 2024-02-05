// Require schema and model from mongoose
const mongoose = require('mongoose');
const thoughtsSchema = require('./thoughts');


// Construct a new instance of the schema class
const usersSchema = new mongoose.Schema({

    // Configure individual properties using Schema Types
    userName: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    //   * Must match a valid email address (look into Mongoose's matching validation)

    // * `thoughts`
    //   * Array of `_id` values referencing the `Thought` model
    thoughts: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Thoughts'} ],
    // * `friends`
    //   * Array of `_id` values referencing the `User` model (self-reference)
    friends: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Users'} ],
}, {
    toJSON: { getters: true },
}
);

//   * **Schema Settings**:
// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
usersSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return "UPDATE";
  })


const Users = mongoose.model('users', usersSchema);

module.exports = Users;