export function buildRequestGemini(selectionText, apiKey, GET_EVENT_PARAMETERS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const prompt = `Create an event for ${selectionText}. Consider that the current date is ${new Date().toISOString()}.`;
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
                    "properties": GET_EVENT_PARAMETERS,
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