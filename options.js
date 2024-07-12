document.getElementById("configuration-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const apiKey = document.getElementById("api-key-input").value;
    const defaultModel = document.getElementById("model-select").value;
    chrome.storage.sync.set({
        apiKey: apiKey,
        defaultModel: defaultModel
    }, () => { alert("💾 Saved") });
});