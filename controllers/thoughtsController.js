const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      // .populate('users');

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  // async createThought(req, res) {
  //     try {
  //         const thought = await Thought.create(req.body);
  //         res.json(thought);
  //     } catch (err) {
  //         console.log(err);
  //         return res.status(500).json(err);
  //     }
  // },

  // Add a thought to a user
  async createThought(req, res) {
    try {
      console.log("You are adding a thought");
      console.log(req.body);

      const thought = await Thought.create(req.body);

      const user = await User.findByIdAndUpdate(
        {
          _id: req.body.userId,
        },
        {
          $addToSet: {
            thoughts: thought._id,
          },
        },
        {
          runValidators: true,
          new: true,
        });

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      console.log(req.params.thoughtId);

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }
      res.json({ message: "Thought deleted" });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
