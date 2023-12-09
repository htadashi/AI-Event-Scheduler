chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "create-gcal-url",
        title: "Create Google Calendar event",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "create-gcal-url") {
        chrome.storage.sync.get(["apiKey"], function(result) {
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

                const now = new Date();
                const localTime = now.toLocaleTimeString();
                const localDate = now.toLocaleDateString();

                const model = "gpt-3.5-turbo";
                const prompt = `"""
                Create a Google Calendar link to add an event to Google Calendar based on this text: ${info.selectionText}.
                Take into account that my current local time is ${localTime}, and today is ${localDate}. 
                The final output should solely consist of the Google Calendar link. Never include any text other than the calendar link in your response.
                """`
                const message = {role: "user", content: prompt};
                const max_tokens = 256;

                fetch(endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${apiKey}`
                        },
                        body: JSON.stringify({
                            model: model,
                            messages: [message],
                            max_tokens: max_tokens
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        const calendarURL = data.choices[0].message.content;
                        chrome.scripting.insertCSS({
                            target: { tabId: tab.id },
                            css: 'body { cursor: default; }'
                        });
                        chrome.tabs.create({
                            url: calendarURL
                        });
                    });
            }
        });
    }
});