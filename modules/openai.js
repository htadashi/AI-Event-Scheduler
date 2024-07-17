export function buildRequestOpenAI(selectionText, apiKey, model, GET_EVENT_PARAMETERS) {
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const prompt = `Create an event for ${selectionText}. Consider that the current date is ${new Date().toISOString()}.`;
    const message = { role: "user", content: prompt };
    const tools = [
        {
            "type": "function",
            "function": {
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