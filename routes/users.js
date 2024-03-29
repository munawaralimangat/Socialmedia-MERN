import exppress from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from '../controllers/users.js';
import {verifyToken} from '../middleware/auth.js'

const router = exppress.Router()

//READ
router.get('/:id',verifyToken,getUser);
router.get('/:id',verifyToken,getUserFriends);

//UPDATE
router.patch('/:id/:friendId',verifyToken,addRemoveFriend);

export default router;
