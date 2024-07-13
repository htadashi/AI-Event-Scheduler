export function buildRequestGemini(selectionText, apiKey) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const prompt = `Create an event for ${selectionText}`;
    const contents = {
        role: "user",
        parts: {
            text: prompt
        }
    };
    const tools = [
        {
            "function_declarations": {
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
                            "description": "The start date of the event in the format YYYYMMDDTHHMMSSZ. If it is an all-day event, use the format YYYYMMDD."
                        },
                        "end_date": {
                            "type": "string",
                            "description": "The end date of the event in the format YYYYMMDDTHHMMSSZ."
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
        }
    ];
    const tool_config = {
        "function_calling_config": {
            "mode": "ANY",
            "allowed_function_names": ["get_event_information"]
        }
    };

    const request_body = JSON.stringify({
        contents: contents,
        tools: tools,
        tool_config: tool_config
    });
    const request = {
        endpoint: endpoint,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: request_body
        }
    };

    return request;
}

export function parseResponseGemini(data) {
    const event = data.candidates[0].content.parts[0].functionCall.args;
    return event;
}