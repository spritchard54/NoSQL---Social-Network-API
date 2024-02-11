const { Thought, User } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.id });
      if (!users) {
        return res.status(404).json({ message: "No users with that ID" });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const users = await User.findByIdAndDelete({
        _id: req.params.id,
      });

      if (!users) {
        res.status(404).json({
          message: "No users with that ID",
        });
      }

      const thoughts = await Thought.updateMany(
        {
          users: req.params.usersId,
        },
        {
          $pull: {
            users: req.params.usersId,
          },
        },
        {
          new: true,
        }
      );

      if (!thoughts) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "user and thoughts deleted!" });
    } catch (err) {
      // console.log(err);
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend
  async addFriend(req, res) {
    try {
      // console.log(`You are adding a friend.`);
      // console.log(req.params);

      const user = await User.findOneAndUpdate(
        //changed from findOneAndUpdate
        {
          _id: req.params.userId,
        },
        {
          $addToSet: {
            friends: req.params.friendId,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: {
            friends: req.params.friendId,
          },
        },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
