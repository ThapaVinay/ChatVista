import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async(req, res, next) => {
    try {
        const { email } = req.body;
        if(!email)
        {
            return res.json({msg:"Email required", status:false});
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.findUnique({where:{email}});
        if(!user)
        {
            return res.json({msg:"User not found", status:false});
        }
        else{
            return res.json({msg:"User found", status:true, data: user});
        }

    } catch (err) {
        next(err);  // Pass the error to the next middleware or error handler
    }
}