import express from "express"
export const booksRouter = express.Router()
import * as controller from '../controllers/booksController.js'

// fill in route for the rest of endpoints i make
booksRouter.route('/').get(controller.getAllBooks)