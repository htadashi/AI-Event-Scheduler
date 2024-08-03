export function buildRequestGemini(request_params, apiKey, model) {

    const prompt = request_params.prompt;
    const contents = {
        role: "user",
        parts: {
            text: prompt
        }
    };
    const tools = [
        {
            "function_declarations": request_params.functions
        }
    ];

    let allowed_function_names = [];
    for (const func of request_params.functions) {
        allowed_function_names.push(func.name);
    }

    const tool_config = {
        "function_calling_config": {
            "mode": "ANY",
            "allowed_function_names": allowed_function_names
        }
    };

    const request_body = JSON.stringify({
        contents: contents,
        tools: tools,
        tool_config: tool_config
    });
    const request = {
        endpoint: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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

    const parsedResponse = {
        function_used: data.candidates[0].content.parts[0].functionCall.name,
        event: data.candidates[0].content.parts[0].functionCall.args
    }

    return parsedResponse;
}