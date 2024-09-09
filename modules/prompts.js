const get_event_information_function = {
    "name": "get_event_information",
    "description": "Get the event information from the input text.",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "description": "The title of the event."
            },
            "start_date": {
                "type": "string",
                "description": "The start date and time of the event. If it is an all-day event, use the format YYYYMMDD. Otherwise, use the format YYYYMMDDTHHMMSSZ."
            },
            "end_date": {
                "type": "string",
                "description": "The end date and time of the event if it exists. If it is an all-day event, use the format YYYYMMDD. Otherwise, use the format YYYYMMDDTHHMMSSZ."
            },
            "location": {
                "type": "string",
                "description": "The location of the event."
            },
            "description": {
                "type": "string",
                "description": "The description of the event. Maximum number of characters is 800."
            }
        },
        "required": ["title", "start_date", "location", "description"]
    }
}

const generate_ical_file_function = {
    "name": "generate_ical_file",
    "description": "Generate an .ical file based on the events listed in the input text.",
    "parameters": {
        "type": "object",
        "properties": {
            "filename": {
                "type": "string",
                "description": "The filename of the .ical file."
            },
            "ical": {
                "type": "string",
                "description": ".ical file in text format."
            },
        },
        "required": ["filename", "ical"]
    }
}


export function GCalLink(selectionText) {

    const params = {
        prompt: `Assume today's date is ${new Date().toISOString()}.
        Assume the desired timezone is ${Intl.DateTimeFormat().resolvedOptions().timeZone}.
        Extract the event information of this text and convert it from desired timezone to UTC: ${selectionText}`,
        functions: [get_event_information_function]
    }

    return params;
}

export function iCalDownload(selectionText) {

    const params = {
        prompt: `Assume today's date is ${new Date().toISOString()}.
        Assume the desired timezone is ${Intl.DateTimeFormat().resolvedOptions().timeZone}.
        Generate an .ical file based on the events listed in the following text, and convert it from desired timezone to UTC: ${selectionText}.`,
        functions: [generate_ical_file_function]
    }

    return params;
}

export function autoSelect(selectionText) {

    const params = {
        prompt: `Assume today's date is ${new Date().toISOString()}. 
        Assume the the desired timezone is ${Intl.DateTimeFormat().resolvedOptions().timeZone}
        Analyze the following text: ${selectionText} 

        Does it contain a single date or more than one date?
                
        If the text contains more than one date, use the function generate_ical_file_function(), else 
        if the text contains a single date, use the function get_event_information_function() instead.
        `
        ,
        functions: [get_event_information_function, generate_ical_file_function]
    }

    return params;
}