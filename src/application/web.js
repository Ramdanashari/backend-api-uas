import express from "express";
import {publicRouter} from "../route/public-api.js";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {productRouter, userRouter} from "../route/api.js";

const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(productRouter);
web.use(userRouter);

web.use(errorMiddleware);

export default web;