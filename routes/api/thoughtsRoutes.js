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
// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
router.route("/").get(getThoughts).post(createThought);

// * `GET` to get a single thought by its `_id`
// * `DELETE` to remove a thought by its `_id`
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// * `PUT` to update a thought by its `_id`
router.route('/:thoughtId').put(updateThought);

// ---

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field
router.route('/id:/thoughts/reactions').put();

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
router.route('/id:/thoughts/reactions').delete();

module.exports = router;