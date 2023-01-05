document.getElementById("api-key-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const apiKey = document.getElementById("api-key-input").value;
    chrome.storage.sync.set({apiKey: apiKey}, () => {alert("💾 Saved")});
});