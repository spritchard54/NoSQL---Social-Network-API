const mongoose = require('mongoose');
const {Schema, Types} = require('mongoose');

// The reactionSchema defines the schema of the subdocument
const reactionSchema = new Schema({
    reactionId:  { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody:{ type: String, required: true, maxlength: 280, minlength: 4, },
    username:    { type: String, required: true },
    createdAt:   { type: Date, default: Date.now },
    //   * Use a getter method to format the timestamp on query (this could be a virtual)
},
    {
        toJSON: { getters: true, }, id: false,
    });

const thoughtsSchema = new Schema(
    {
        thoughtText: { type: String, required: true, maxLength: 280, minLength: 1 },
        createdAt: { type: Date, required: true, default: Date.now },
        // Use a getter method to format the timestamp on query

        //(The user that created this thought)
        userName: { type: String, required: true },
        // `reactions` (These are like replies)
        //  Array of nested documents created with the `reactionSchema`
        reactions: [reactionSchema]
    },
    {
        toJSON: { getters: true }, id: false,
    }
);

// Uses mongoose.model() to create model
const Thoughts = mongoose.model('Thoughts', thoughtsSchema);

// Uses model to create new instance including subdocument
const reactionData = [
    { reactionID: "Update", reactionBody: "Update", userName: "Update", createdAt: "Update" },
];

Thoughts
    .create({ name: 'Reactions', Reactions: reactionData })
    .then(data => console.log(data))
    .catch(err => console.log(err));

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
reactionSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return `"UPDATE"`;
    })

module.exports = Thoughts;

