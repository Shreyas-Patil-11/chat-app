const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const message = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updateAt: 1 });

    const projectedMessges = message.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: message.sender.text,
      };
    });
    res.json(projectedMessges);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
