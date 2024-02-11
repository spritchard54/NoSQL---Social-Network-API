const dayjs = require("dayjs");
const mongoose = require("mongoose");
const { Schema, Types } = require("mongoose");

var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

dayjs().format('Q Do k kk X x')

// The reactionSchema defines the schema of the subdocument
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 4,
    },
    userName: {
      type: String,
      required: true,
    },
    //   * Use a getter method to format the timestamp on query (this could be a virtual)
    createdAt: {
      type: Date,
      default: Date.now,
      get: (today) => dayjs(today).format('MMM Do, YYYY [at] h:mma'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      // get: (today) => dateFormat(today),
      get: (today) => dayjs(today).format('MMM Do, YYYY [at] h:mma'),
    },
    // Use a getter method to format the timestamp on query

    //(The user that created this thought)
    userName: {
      type: String,
      required: true,
    },
    // `reactions` (These are like replies)
    //  Array of nested documents created with the `reactionSchema`
    reactions: [reactionSchema],
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Uses mongoose.model() to create model
const Thought = mongoose.model("Thought", thoughtsSchema);

module.exports = Thought;
