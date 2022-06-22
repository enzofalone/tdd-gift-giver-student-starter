const express = require("express");
const router = express.Router();
const GiftExchange = require("../models/gift-exchange");
const { BadRequestError } = require("../utils/errors.js");

router.post("/pairs", async (req, res, next) => {
	try {
		const pairs = GiftExchange.pairs(req.body.names);
		res.status(200).json(pairs);
	} catch (err) {
		next(new BadRequestError(err));
	}
})
// .post((req, res, next) => {
// 	res.json(req.body.names);
// })

router.post("/traditional", async (req, res, next) => {
	try {
		const tradPairs = GiftExchange.traditional(req.body.names);
		res.status(200).json(tradPairs);
	} catch (err) {
		next(new BadRequestError(err));
	}
})

module.exports = router;