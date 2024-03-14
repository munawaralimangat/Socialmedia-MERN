import express  from "express";
import { getFeedPosts,getUsersPosts,likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get('/',verifyToken,getFeedPosts);
router.get('/:userId/posts',verifyToken,getUsersPosts);


/*UPDATE */
router.post('/:id/like',verifyToken,likePost)

export default router;