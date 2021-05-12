import moment = require("moment");
import { Constants } from "../config/constants";
import * as fs from "fs";

export class Utils {

    /** get skip and limit to avoid multiple code lines */
    public static getSkipLimit = (page: number, recordsPerPage: number = null) => {
        let skip = 0;
        const limit = recordsPerPage ? recordsPerPage : Constants.RECORDS_PER_PAGE; // for paginate records
        if (page) {
            skip = (page - 1) * limit;
        }
        return { limit, skip };
    }
}


