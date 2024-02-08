const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');

function dateFormat(todaysDate) {
    return todaysDate.getMonth()
}


// The reactionSchema defines the schema of the subdocument
const reactionSchema = new Schema({
    reactionId: { 
        type: Schema.Types.ObjectId, default: () => new Types.ObjectId() 
    },
    reactionBody: { 
        type: String, 
        required: true, 
        maxlength: 280, 
        minlength: 4, 
    },
    userName: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, default: Date.now, get: (today) => dateFormat(today) 
    }, 
    //   * Use a getter method to format the timestamp on query (this could be a virtual)
},
    {
        toJSON: { 
            getters: true, 
        }, 
        id: false,
    });

const thoughtsSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            maxLength: 280, 
            minLength: 1 
        },
        createdAt: { 
            type: Date, 
            required: true, 
            default: Date.now, get: (today) => dateFormat(today) 
        },
        // Use a getter method to format the timestamp on query

        //(The user that created this thought)
        userName: { 
            type: String, 
            required: true },
        // `reactions` (These are like replies)
        //  Array of nested documents created with the `reactionSchema`
        reactions: [reactionSchema]
    },
    {
        toJSON: { getters: true }, id: false,
    }
);




// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
reactionSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    })

// Uses mongoose.model() to create model
const Thought = mongoose.model('Thought', thoughtsSchema);

module.exports = Thought;

