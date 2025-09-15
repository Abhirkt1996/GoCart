import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// Auth Seller
export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)

            if(!isSeller){
            return NextResponse.json({ error: 'not authorized' }, { status: 401 });
        }
        const storeInfo = await prisma.store.findUnique({where: {userId}})

        return NextResponce.json({isSeller, storeInfo})
    } catch (error) {
         console.error(error);
      return NextResponce.json({ error: error.code || error.message }, {status:400 })   
    }
}