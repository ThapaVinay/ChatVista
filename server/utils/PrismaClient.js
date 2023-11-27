import { PrismaClient } from "@prisma/client";

// we will access database using this object
let prismaInstance = null;

function getPrismaInstance(){
    if(!prismaInstance)
    {
        prismaInstance = new PrismaClient();
    }
    return prismaInstance;
}

export default getPrismaInstance;