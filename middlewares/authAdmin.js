 import { clerkClient } from "@clerk/nextjs/server"

 
 const authAdmin = async (userId) => {
    try {
        if(!userId) return false

        const client = await clerkClient()
        const user = await client.user.getUser(userId)

        return process.env.ADMIN_EMAIL.split(',').includes(user.emailAddresses[0].emailAddresses)
    } catch (error) {
        console.error(error)
        return false
    }
 }

 export default authAdmin