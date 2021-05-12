import { IsNotEmpty } from "class-validator";

import { Model } from "../../model";

export class EventModel extends Model {
    @IsNotEmpty()
    public Title: string

    @IsNotEmpty()
    public Description: string

    @IsNotEmpty()
    public Category: number

    @IsNotEmpty()
    public Start_date: any;

    @IsNotEmpty()
    public End_date: any;

    constructor(body: any) {
        super();
        const {
            Title,
            Description,
            Category,
            Start_date,
            End_date
        } = body;
        this.Title = Title;
        this.Description = Description;
        this.Category = Category;
        this.Start_date = Start_date;
        this.End_date = End_date;
    }
}