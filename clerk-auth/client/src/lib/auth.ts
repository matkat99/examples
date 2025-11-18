import { Clerk } from '@clerk/clerk-js'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export async function initClerk() {
const clerk = new Clerk(clerkPubKey)
await clerk.load()

return clerk
}