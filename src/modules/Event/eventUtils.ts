import * as My from "jm-ez-mysql";
import { Tables } from "../../config/tables";

export class EventUtils {

    //get all category
    public async categoryList (){
        try {
            return await My.findAll(Tables.CATEGORY, ["id", "Category"]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //add event
    public async addEvent(EventDetail: JSON) {
        try {
            return await My.insert(Tables.EVENT, EventDetail);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    
    //list event
    public async listEvent(skip: number = null, limit: number = null, title: string =""){
        try {
            let limitQuery = "";
            if (limit) {
                limitQuery = `LIMIT ${skip}, ${limit}`;
            }
            let whereQuery = `0 = 0`;
            if (title) {
                whereQuery += ` AND (title LIKE '%${title}%')`;
            }
            const joinQuery = `${Tables.EVENT} e LEFT JOIN ${Tables.CATEGORY} c ON e.Category = c.id`
            const { result, count } = await My.findAllWithCount(joinQuery, 'e.id', ['e.id', 'e.Title','e.Description','c.Category'], `${whereQuery}`, ` ${limitQuery}`);
            return ({Result: result, TotalRows: count});
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //check event exists or not
    public async checkEvent(id: number){
        try {
            return await My.first(Tables.EVENT,['id','title'],'id = ?',[id]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //update event
    public async updateEvent(details, id){
        try {
            return await My.updateFirst(Tables.EVENT, details, 'id = ?', [id]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //delete event
    public async deleteEvent(id) {
         try {
             return await My.delete(Tables.EVENT, 'id = ?', [id]);
         } catch (err) {
            console.error(err);
            throw err;
         }
    }
}