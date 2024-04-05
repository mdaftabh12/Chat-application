const userController = require("../controllers/userController");

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const app = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.set("view engin", "ejs");
app.set("views", "./views");
router.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.get("/register", userController.userRegister);
router.post("/register", upload.single("image"), userController.register);

module.exports = router;
