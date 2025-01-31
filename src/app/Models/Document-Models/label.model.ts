export class Label {
    constructor(obj: Label) {
        Object.assign(this, obj);
    }
    _id?: string;
    title: string;
    documents?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    selected?: boolean = false;
    __v?: string;
    static getApiModel(label: Label): any {
        let labelOutput = new Label(label);
        delete labelOutput.selected;
        delete labelOutput.createdAt;
        delete labelOutput.updatedAt;
        delete labelOutput.__v;
        return labelOutput;
    }
}
