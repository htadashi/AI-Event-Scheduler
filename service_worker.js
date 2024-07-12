chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "create-gcal-url",
        title: "Create Google Calendar event",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "create-gcal-url") {
        chrome.storage.sync.get(["apiKey"], function (result) {
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: 'body { cursor: wait; }'
            });
            if (result.apiKey === undefined) {
                alert("API key is not set. Please set it in the extension options.");
                chrome.runtime.openOptionsPage();
            } else {
                const apiKey = result.apiKey;
                const endpoint = "https://api.openai.com/v1/chat/completions";
                const model = "gpt-3.5-turbo";
                const prompt = `Create an event for ${info.selectionText}`;
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

                fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [message],
                        tools: tools,
                        tool_choice: tool_choice
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        const event = JSON.parse(data.choices[0].message.tool_calls[0].function.arguments);

                        // Format the dates
                        const startDate = event.start_date;
                        const endDate = event.end_date;

                        // URL encode the event details
                        const title = encodeURIComponent(event.title);
                        const location = encodeURIComponent(event.location);
                        const description = encodeURIComponent(event.description);

                        // Construct the Google Calendar URL
                        const calendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;

                        // Inserts a CSS rule to set the cursor back to default and opens a new tab with the generated Google Calendar URL
                        chrome.scripting.insertCSS({
                            target: { tabId: tab.id },
                            css: 'body { cursor: default; }'
                        });
                        chrome.tabs.create({
                            url: calendarURL
                        });
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                        chrome.scripting.insertCSS({
                            target: { tabId: tab.id },
                            css: 'body { cursor: default; }'
                        });
                        alert('An error occurred while creating the event. Please try again later.');
                    });
            }
        });
    }
});