# AI Event Scheduler
AI Event Scheduler is a chrome extension that allows you to quickly and easily create Google calendar events by simply simply selecting a text and clicking a button.

![demo](https://user-images.githubusercontent.com/2355491/210706757-323e764e-ee9f-464d-baf8-475c8862bb18.gif)
**Disclaimer**: This extension is not affiliated with the webpage shown above. 

## Setup and use guide
> [!NOTE]
> An unofficial video tutorial is [available](https://www.youtube.com/watch?v=6B1MTuXShIQ), courtesy of [TAB Nation](https://www.youtube.com/@TABNationAutomation).

### Installation

To install the extension:

1. Download the ZIP file and unzip to a folder.
2. In Chrome, go to chrome://extensions and enable developer mode.
3. Click "Load unpacked" and select the unzipped folder.

### Configuration

1. Click the button in the browser to open the quick action popup:

    ![image](https://github.com/user-attachments/assets/06106765-b67c-4823-9b51-b482ad9acfad)

2. Click the settings button
3. Select the AI model to use and enter the corresponding API key

### Usage
1. Click the button in the browser to open the quick action popup:

    ![image](https://github.com/user-attachments/assets/06106765-b67c-4823-9b51-b482ad9acfad)

1. Choose which mode to use:
    - <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/776f3c38-313b-4c94-a2cd-e60409ef5cee" width=18px height=18px>
        <img alt="new tab" src="https://github.com/user-attachments/assets/164c663d-2e8d-4dd9-8f66-ead2dff4427c" width=18px height=18px>
      </picture> <b>new tab mode</b>: opens a new tab with the Google calendar page setup according to the selected text. Recommended when there is only a single event.
    - <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/5aea6dfe-e120-457a-a67a-c1a7f80ddc4d" width=18px height=18px>
        <img alt="new tab" src="https://github.com/user-attachments/assets/42e9f9c0-259e-4f19-8ce5-b5fe8378c052" width=18px height=18px>
      </picture> <b>.ical mode</b>: generate an .ics file that can be imported into Google calendar. Recommended when there are multiple events.
    - <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/666cfc2a-4011-4e04-b2c0-a81bdd81537d" width=18px height=18px>
        <img alt="new tab" src="https://github.com/user-attachments/assets/5d6b7f11-8a94-4ccf-9a7c-668f1c5d6b48" width=18px height=18px>
      </picture> <b>automatic mode</b>: automatically detects the type of text and uses the appropriate mode.
    
