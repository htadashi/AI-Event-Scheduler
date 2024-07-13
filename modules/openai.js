
export function buildRequestOpenAI(selectionText, apiKey, model) {
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const prompt = `Create an event for ${selectionText}`;
    const message = { role: "user", content: prompt };
    const tools = [
        {
            "type": "function",
            "function": {
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
    const tool_choice = { "type": "function", "function": { "name": "get_event_information" } };

    const request_body = JSON.stringify({
        model: model,
        messages: [message],
        tools: tools,
        tool_choice: tool_choice
    });
    const request = {
        endpoint: endpoint,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: request_body
        }
    };

    return request;
}

export function parseResponseOpenAI(data) {
    const event = JSON.parse(data.choices[0].message.tool_calls[0].function.arguments);
    return event;
}