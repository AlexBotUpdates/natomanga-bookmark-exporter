# Natomanga Bookmark Exporter

A simple script to export your bookmarks from natomanga.com into a JSON file.

## Features

- Exports all bookmarked manga titles and their last update times
- Handles pagination automatically
- Includes retry logic for failed requests
- Exports data in JSON format
- Works directly in browser console

## Usage

1. Go to [https://www.natomanga.com/bookmark](https://www.natomanga.com/bookmark)
2. Make sure you're logged in and can see your bookmarks
3. Open your browser's Developer Console:
   - Chrome/Edge: Press F12 or right-click -> Inspect -> Console
   - Firefox: Press F12 or right-click -> Inspect -> Console
4. Copy the entire script content
5. Paste it into the console and press Enter
6. Wait for the script to finish processing all pages
7. The browser will automatically download a `natomanga-bookmarks.json` file

    ## Output Format

    The script generates a JSON file with the following structure:
    ```json
    [
        {
            "title": "Manga Title",
            "lastUpdated": "Last updated: 2024-01-01 12:00:00"
        }
    ]
    ```
## Error Handling

- The script will automatically retry failed requests up to 3 times
- There's a 2-second delay between retries
- There's a 1-second delay between pages to avoid overwhelming the server
- Failed pages after all retries will be skipped, but the script will continue with remaining pages

## Requirements

- Modern web browser (Chrome, Firefox, Edge, etc.)
- JavaScript enabled
- Active login session on natomanga.com

## Notes

- The script needs to be run while you're on the bookmarks page
- The export time depends on how many bookmarks you have
- The console will show progress as pages are processed