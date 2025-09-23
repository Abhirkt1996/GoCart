import { clerkClient } from "@clerk/nextjs/server"

const authAdmin = async (userId) => {
    try {
        if (!userId) return false

        const user = await clerkClient.users.getUser(userId)

        const admins = process.env.ADMIN_EMAIL.split(',').map(email => email.trim())
        const userEmail = user.emailAddresses[0]?.emailAddress

        return admins.includes(userEmail)
    } catch (error) {
        console.error(error)
        return false
    }
}

export default authAdmin
