import { buildRequestOpenAI, parseResponseOpenAI } from "./modules/openai.js";
import { buildRequestGemini, parseResponseGemini } from "./modules/gemini.js";

chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "create-gcal-url",
        title: "Create Google Calendar event",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "create-gcal-url") {
        chrome.storage.sync.get(["apiKey", "defaultModel"], function (result) {
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: 'body { cursor: wait; }'
            });
            if (result.apiKey === undefined) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: '/icons/64.png',
                    title: 'AI Event Scheduler',
                    message: "API key is not set. Please set it in the extension options..",
                    priority: 1
                });
                chrome.runtime.openOptionsPage();
            } else {
                const apiKey = result.apiKey;
                const selectedText = info.selectionText;
                let model = result.defaultModel;
                if (model === undefined) model = "gpt-3.5-turbo";

                let request;
                if (model === "gpt-3.5-turbo" || model === "gpt-4o") {
                    request = buildRequestOpenAI(selectedText, apiKey, model);
                } else if (model === "gemini") {
                    request = buildRequestGemini(selectedText, apiKey);
                }

                fetch(request.endpoint, request.options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if ((data.error?.type === "invalid_request_error") ||
                            (data.error?.details?.[0]?.reason === 'API_KEY_INVALID') ||
                            (data.error?.code === 403)) {
                            throw new Error("Invalid API key");
                        }

                        let event;
                        if (model === "gpt-3.5-turbo" || model === "gpt-4o") {
                            event = parseResponseOpenAI(data);
                        } else if (model === "gemini") {
                            event = parseResponseGemini(data);
                        }

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
                        chrome.scripting.insertCSS({
                            target: { tabId: tab.id },
                            css: 'body { cursor: default; }'
                        });
                        if (error.message === "Invalid API key") {
                            chrome.notifications.create({
                                type: 'basic',
                                iconUrl: '/icons/64.png',
                                title: 'AI Event Scheduler',
                                message: "Invalid API key. Please set a valid API key in the extension options.",
                                priority: 1
                            });
                            chrome.runtime.openOptionsPage();
                        } else {
                            chrome.notifications.create({
                                type: 'basic',
                                iconUrl: '/icons/64.png',
                                title: 'AI Event Scheduler',
                                message: "An error occurred while creating the event. Please try again later.",
                                priority: 1
                            });
                        }
                    });
            }
        });
    }
});