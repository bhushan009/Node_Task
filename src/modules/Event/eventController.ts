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

    public viewEvent = async(req: any, res: Response) => {
        try {
            const dates = await this.eventUtils.getDates(req.params.id);
            let dateArr = [];
            if(req.body.Interval == 'Every' && req.body.Time == 'day') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(1, 'days');
                }
            }
            if(req.body.Interval == 'Every' && req.body.Time == 'week') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(7, 'days');
                }
            }
            if(req.body.Interval == 'Every' && req.body.Time == 'month') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(1, 'month');
                }
            }
            if(req.body.Interval == 'Every' && req.body.Time == 'year') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(1, 'years');
                }
            }
            //Every Other days
            if(req.body.Interval == 'Every Other' && req.body.Time == 'day') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(2, 'days');
                }
            }
            if(req.body.Interval == 'Every Other' && req.body.Time == 'week') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(14, 'days');
                }
            }
            if(req.body.Interval == 'Every Other' && req.body.Time == 'month') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(2, 'month');
                }
            }
            if(req.body.Interval == 'Every Other' && req.body.Time == 'year') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(2, 'years');
                }
            }
            //Every Third
            if(req.body.Interval == 'Every Third' && req.body.Time == 'day') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(3, 'days');
                }
            }
            if(req.body.Interval == 'Every Third' && req.body.Time == 'week') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(28, 'days');
                }
            }
            if(req.body.Interval == 'Every Third' && req.body.Time == 'month') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(3, 'month');
                }
            }
            if(req.body.Interval == 'Every Third' && req.body.Time == 'year') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(3, 'years');
                }
            }
            //Every Fourth
            if(req.body.Interval == 'Every Fourth' && req.body.Time == 'day') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(4, 'days');
                }
            }
            if(req.body.Interval == 'Every Fourth' && req.body.Time == 'week') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(29, 'days');
                }
            }
            if(req.body.Interval == 'Every Fourth' && req.body.Time == 'month') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(4, 'month');
                }
            }
            if(req.body.Interval == 'Every Fourth' && req.body.Time == 'year') {
                let S_date = moment(dates.Start_date);
                let E_date = moment(dates.End_date);
                while(S_date <= E_date) {
                    dateArr.push(moment(S_date).format('YYYY-MM-DD'));
                    S_date = moment(S_date).add(4, 'years');
                }
            }
            return res.status(Constants.SUCCESS_CODE).send(dateArr);
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ error: req.t("ERR_INTERNAL_SERVER") });
        }
    }
}