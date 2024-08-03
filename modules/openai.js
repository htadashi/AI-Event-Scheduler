export function buildRequestOpenAI(request_params, apiKey, model) {

    const prompt = request_params.prompt;
    let tools = [];
    for (const func of request_params.functions) {
        tools.push({
            "type": "function",
            "function": func
        });
    }

    let tool_choice;
    if (request_params.functions.length === 1) {
        tool_choice = { "type": "function", "function": { "name": request_params.functions[0].name } };
    } else {
        tool_choice = "required";
    }

    const message = { role: "user", content: prompt };
    const request_body = JSON.stringify({
        model: model,
        messages: [message],
        tools: tools,
        tool_choice: tool_choice
    });
    const request = {
        endpoint: "https://api.openai.com/v1/chat/completions",
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

    const parsedResponse = {
        function_used: data.choices[0].message.tool_calls[0].function.name,
        event: JSON.parse(data.choices[0].message.tool_calls[0].function.arguments)
    }

    return parsedResponse;
}