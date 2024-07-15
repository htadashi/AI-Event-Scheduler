export const GET_EVENT_PARAMETERS = {
    "title": {
        "type": "string",
        "description": "The title of the event."
    },
    "start_date": {
        "type": "string",
        "description": "The start date of the event. If it is an all-day event, use the format YYYYMMDD. Otherwise, use the format YYYYMMDDTHHMMSSZ."
    },
    "end_date": {
        "type": "string",
        "description": "The end date of the event if it exists. If it is an all-day event, use the format YYYYMMDD. Otherwise, use the format YYYYMMDDTHHMMSSZ."
    },
    "location": {
        "type": "string",
        "description": "The location of the event."
    },
    "description": {
        "type": "string",
        "description": "The description of the event. Maximum number of characters is 800."
    }
}