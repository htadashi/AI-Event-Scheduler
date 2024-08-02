document.addEventListener('DOMContentLoaded', function () {
    // Options button        
    const optionsButton = document.getElementById('optionsButton');
    optionsButton.addEventListener('click', function () {
        chrome.runtime.openOptionsPage();
    });

    // Mode buttons selection
    chrome.storage.sync.get('selectedMode', function (data) {
        if (data.selectedMode) {
            switch (data.selectedMode) {
                case 'newTab':
                    newTabButton.click();
                    break;
                case 'ical':
                    icalButton.click();
                    break;
                case 'auto':
                    autoButton.click();
                    break;
            }
        }
    });

    const newTabButton = document.getElementById('newTabButton');
    const icalButton = document.getElementById('icalButton');
    const autoButton = document.getElementById('autoButton');
    const modeText = document.getElementById('modeText');

    newTabButton.addEventListener('click', function () {
        newTabButton.classList.add('active');
        icalButton.classList.remove('active');
        autoButton.classList.remove('active');
        modeText.innerHTML = '<b>Mode</b>: new tab';
        chrome.storage.sync.set({ selectedMode: 'newTab' });
    });

    icalButton.addEventListener('click', function () {
        icalButton.classList.add('active');
        newTabButton.classList.remove('active');
        autoButton.classList.remove('active');
        modeText.innerHTML = '<b>Mode</b>: .ical';
        chrome.storage.sync.set({ selectedMode: 'ical' });
    });

    autoButton.addEventListener('click', function () {
        autoButton.classList.add('active');
        newTabButton.classList.remove('active');
        icalButton.classList.remove('active');
        modeText.innerHTML = '<b>Mode</b>: automatic';
        chrome.storage.sync.set({ selectedMode: 'auto' });
    });
});