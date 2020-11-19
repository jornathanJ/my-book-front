export interface EventInfo {
    eventData: any;
    eventName?: EVENT_NAME;
    senderId?: string;
    identifier?: string | number;
    value?:any;
}

export enum EVENT_NAME {
    ROW_CLICKED,
    BUTTON_CLICKED
}