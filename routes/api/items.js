let express = require("express");

router = express.Router();

let auth = require("../../middleware/auth");
let User = require("../../models/UserModel");

router.get("/", auth, async (req, res) => {
  let id = req.user.id;

  let user = await User.findById({ _id: id }).catch((e) => console.error(e));

  if (!user) {
    return res.status(400).json({ msg: "No user found" });
  } else {
    return res.json(user.list);
  }
});

router.post("/", auth, async (req, res) => {
  let id = req.user.id;
  let { item } = req.body;

  if (item === undefined || !item) {
    return res.json({ msg: "Please add a item" });
  } else {
    let user = await User.findById({ _id: id }).catch((e) => console.error(e));

    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    } else {
      User.updateOne(
        { _id: id },
        { $push: { list: item } },
        async (err, raw) => {
          if (err) {
            return res
              .status(501)
              .json({ msg: "Cannot add item to user's list" });
          } else {
            res.json(item);
          }
        }
      );
    }
  }
});

router.delete("/:name", auth, async (req, res) => {
  let { name } = req.params;
  let id = req.user.id;
  let check = false;

  const listArr = await User.findById({ _id: id })
    .select("list")
    .catch((e) => console.error(e));

  listArr.list.forEach((item) => {
    if (item === name) {
      check = true;
    }
  });

  try {
    if (name.length > 0 && check) {
      const itemDel = await User.updateOne(
        { _id: id },
        { $pull: { list: name } },
        (err, raw) => {
          if (err) throw err;
        }
      );

      res.json({ success: "Item removed" });
    } else {
      return res.status(404).json({ Error: "No such item to delete" });
    }
  } catch (err) {
    return res.status(204).json({ Error: "Error deleting item" });
  }
});

module.exports = router;
