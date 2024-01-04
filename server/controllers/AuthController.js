import getPrismaInstance from "../utils/PrismaClient.js";
import { generateToken04 } from "../utils/TokenGenerator.js";

// during first login
export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ msg: "Email required", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    } else {
      return res.json({ msg: "User found", status: true, data: user });
    }
  } catch (err) {
    next(err); // Pass the error to the next middleware or error handler
  }
};

// update onboard details in database
export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;

    if (!email || !name || !profilePicture) {
      return res.send("Email, name and Image are required");
    }

    const prisma = getPrismaInstance();
    const user = await prisma.user.create({
      data: { email, name, about, profilePicture },
    });
    return res.json({ msg: "Success", status: true, user });
  } catch (err) {
    console.log(err);
  }
};

// to get contacts
export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
        about: true,
      },
    });

    // group same initials together
    const userGroupedByInitialLetter = {};
    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();

      if (!userGroupedByInitialLetter[initialLetter]) {
        userGroupedByInitialLetter[initialLetter] = [];
      }
      userGroupedByInitialLetter[initialLetter].push(user);
    });
    return res.status(200).send({ users: userGroupedByInitialLetter });
  } catch (err) {
    console.log(err);
  }
};

export const generateToken = (req, res, next) => {
  try {
    const appId = parseInt(process.env.ZEGO_APP_ID);
    const serverSecret = process.env.ZEGO_SERVER_SECRET;
    const userId = req.params.userId;
    const effectiveTime = 3600;
    const payload = "";
    if (appId && serverSecret && userId) {
      const token = generateToken04(
        appId,
        userId,
        serverSecret,
        effectiveTime,
        payload
      );

      res.status(200).json({ token });
    }
    return res
      .status(400)
      .send("User id, app id and server secret is required !");
  } catch (err) {
    next(err);
  }
};
