// ### API Routes

// **`/api/users`**

const router = require('express').router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/usersController');

// * `GET` all users
// * `POST` a new user: 
router.route('/').get(getUsers).post(createUser);

// * `GET` a single user by its `_id` and populated thought and friend data
// * `DELETE` to remove user by its `_id`
router.route('/:id').get(getSingleUser).delete(deleteUser);

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// ```

// * `PUT` to update a user by its `_id` 
router.route('/:id').put(updateUser);

// **BONUS**: Remove a user's associated thoughts when deleted.

// **`/api/users/:userId/friends/:friendId`**

// * `POST` to add a new friend to a user's friend list
router.route('/api/users/:userId/friends/:friendId').post(addFriend);

// * `DELETE` to remove a friend from a user's friend list
router.route('/api/users/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;