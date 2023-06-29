const express = require("express");

const noticeController = require("../Controllers/notice");

const router = express.Router();

router.get("/notices", noticeController.getNotices);

router.post("/notice", noticeController.createNotice);

router.get("/notice/:id", noticeController.getNoticeById);

router.put("/notice/:id", noticeController.updateNotice);

router.delete("/notice/:id", noticeController.deleteNotice);

module.exports = router;
