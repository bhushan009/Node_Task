import { Response } from "express";
import moment = require("moment");
import { Constants } from "../../config/constants";
import { Utils } from "../../helpers/utils";
import { EventUtils } from "./eventUtils";

export class EventController {
    private eventUtils: EventUtils = new EventUtils();

    //list category
    public categoryList = async(req: any, res: Response) => {
        try {
            const Categories = await this.eventUtils.categoryList();
            return res.status(Constants.SUCCESS_CODE).json(Categories);
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ error: req.t("ERR_INTERNAL_SERVER") });
        }
    }

    //Add event
    public addEvent = async(req: any,res: Response) => {
        try {
            await this.eventUtils.addEvent(req.body);
            return res.status(Constants.SUCCESS_CODE).send({Message: req.t("EVENT_ADDED")});
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ error: req.t("ERR_INTERNAL_SERVER") });
        }
    }

    //get all event
    public listEvent = async(req: any, res: Response) => {
        try {
            const { skip, limit } = Utils.getSkipLimit(req.query.page, req.query.limit);
            const Products = await this.eventUtils.listEvent(skip,limit,req.query.title);
            return res.status(Constants.SUCCESS_CODE).send(Products);
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ error: req.t("ERR_INTERNAL_SERVER") });
        }
    }

    //update event
    public updateEvent = async(req: any, res: Response) => {
        try {
            req.body.UpdatedAt = moment(new Date()).tz(Constants.TIMEZONE).format(Constants.DATE_TIME_FORMAT);
            await this.eventUtils.updateEvent(req.body,req.params.id);
            return res.status(Constants.SUCCESS_CODE).send({ message: req.t("EVENT_UPDATED") });
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ error: req.t("ERR_INTERNAL_SERVER") });
        }
    }

    //delete event
    public deleteEvent = async(req: any, res: Response ) => {
        try {
            await this.eventUtils.deleteEvent(req.params.id);
            return res.status(Constants.SUCCESS_CODE).send({ message: req.t("EVENT_DELETED") });
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ error: req.t("ERR_INTERNAL_SERVER") });
        }
    }
}