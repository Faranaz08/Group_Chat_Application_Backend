const Chat = require("../models/chat");
const User = require("../models/user");

exports.postChat = async (req, res, next) => {
  const { msg } = req.body;
  // console.log(msg);
  try {
    const chat = await req.user.createChat({
      message: msg,
    });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
};

exports.getChat = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });
    // console.log(chats);
    res.json({
      success: true,
      chats: chats,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
};
