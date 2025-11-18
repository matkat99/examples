import type {Request, Response} from "express";
import {Router} from "express";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";

const router: Router = Router();


// an unprotected route
router.get('/public', (req: Request, res: Response) => {
  return res.json({ message: 'This is a public route accessible to everyone.' });
});

// A protected route that requires authentication
router.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JS Backend SDK to get the user's User object
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid Clerk token' });
  }
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})

export default router;