// **`/api/thoughts`**
const router = require('express').Router();


const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
  } = require('../../controllers/thoughtsController');
// * `GET` to get all thoughts
router.route("/").get(getThoughts);

// * `GET` to get a single thought by its `_id`
// * `DELETE` to remove a thought by its `_id`
router.route('/:id').get(getSingleThought).delete(deleteThought);

// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
router.route('/thoughts').post(createThought);

// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// ```

// * `PUT` to update a thought by its `_id`
router.route('/:id').put(updateThought);

// ---

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field
router.route('/id:/thoughts/reactions').put();

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
router.route('/id:/thoughts/reactions').delete();

module.exports = router;