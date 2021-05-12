import { Request, Response } from "express";
import { EventUtils } from "./eventUtils";
import { Constants } from "../../config/constants";

export class EventMiddleware {
    private eventUtils: EventUtils = new EventUtils()
    public checkDates = async (req: any, res: Response, next: () => void) => {
        if(req.body.Start_date < req.body.End_date){
            next();
        }else{
            return res.status(Constants.FAIL_CODE).json({ error: req.t("DATE_NOT_VALID"), code: Constants.FAIL_CODE });
        }
    }

    public checkEvent = async (req: any, res: Response, next: () => void) => {
        const event = await this.eventUtils.checkEvent(req.params.id);
        if(event){
            next();
        }else{
            return res.status(Constants.FAIL_CODE).json({ error: req.t("DATE_NOT_VALID"), code: Constants.FAIL_CODE });
        }
    }
}