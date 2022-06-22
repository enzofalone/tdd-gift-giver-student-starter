const express = require("express");
const morgan = require("morgan");
const giftExchangeRouter = require("./routes/gift-exchange.js");
const { NotFoundError } = require("./utils/errors.js");

const app = express();



app.use(morgan("tiny"));
app.use(express.json());
app.use("/gift-exchange", giftExchangeRouter)

app.get("/", (req, res) => {
    res.json({
        ping: "pong"
    });
    res.sendStatus(200);
})

// 404 errors that do not match any endpoints
app.use((req,res,next) => {
    return next(new NotFoundError);
})

// generic error handler -> anything unhandled
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    return res.status(status).json({
        error: {message,status}
    })
})

module.exports = app;