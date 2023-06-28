import { PrismaClient } from "@prisma/client";
import type { H3Event } from "h3";

let prismaClient: PrismaClient


/*
Use in your API routes like this: 
usePrisma(event).user.findMany()
*/

export const usePrisma = (event: H3Event) => {

    if (!prismaClient) {
        console.log("Creating new PrismaClient");
        prismaClient = new PrismaClient({})
    }

    const client = prismaClient.$extends(
        useSupabaseRowLevelSecurity({
            claimsFn: () => event.context.user,
            logging: true,
            policyError: createError({
                statusCode: 403,
                statusMessage: "Forbidden",
                message: "Not enough permissions to access this resource",
            }),
        })
    )

    type ExtendedPrismaClient = typeof client

    return client as ExtendedPrismaClient


};