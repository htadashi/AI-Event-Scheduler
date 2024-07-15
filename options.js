document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

document.getElementById("configuration-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const apiKey = document.getElementById("api-key-input").value;
    const defaultModel = document.getElementById("model-select").value;
    chrome.storage.sync.set({
        apiKey: apiKey,
        defaultModel: defaultModel
    }, () => {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: '/icons/64.png',
            title: 'AI Event Scheduler',
            message: `💾 Saved. Current model: ${defaultModel}`,
            priority: 1
        });
    });
});