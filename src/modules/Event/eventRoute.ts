import { Router } from "express";
import { Validator } from "../../validate";
import { EventModel } from "./eventModel";
import { EventController } from "./eventController";
import { EventMiddleware } from "./eventMiddleware";

const router: Router = Router();
const v: Validator = new Validator();
const eventController = new EventController();
const eventMiddleware = new EventMiddleware();

//category list
router.get('/category', eventController.categoryList);

//Event API
router.post('/add',v.validate(EventModel), eventMiddleware.checkDates, eventController.addEvent);
router.get("/", eventController.listEvent);
router.post("/update/:id",eventMiddleware.checkEvent, eventController.updateEvent);
router.delete("/:id",eventMiddleware.checkEvent, eventController.deleteEvent);

export const EventRoute: Router = router;