

(async function() {
    const bookmarks = [];
    let page = 1;
    const maxRetries = 3; 
    
    async function fetchPage(page, retryCount = 0) {
        const url = page === 1 ? "https://www.natomanga.com/bookmark" : `https://www.natomanga.com/bookmark?page=${page}`;
        console.log(`Fetching page ${page}${retryCount > 0 ? ` (retry ${retryCount})` : ''}...`);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            const items = doc.querySelectorAll(".user-bookmark-item");
            if (!items || items.length === 0) {
                console.log("No more items found");
                return false;
            }
            
            items.forEach(item => {
                const titleElement = item.querySelector(".bm-title a");
                const lastUpdatedElement = item.querySelector(".chapter-datecreate");
                
                if (titleElement) {
                    bookmarks.push({
                        title: titleElement.innerText.trim(),
                        lastUpdated: lastUpdatedElement ? lastUpdatedElement.innerText.trim() : "N/A"
                    });
                }
            });
            
            console.log(`Found ${items.length} items on page ${page}`);
            return true;
            
        } catch (error) {
            console.error(`Error on page ${page}:`, error);
            
            // Retry logic
            if (retryCount < maxRetries) {
                console.log(`Retrying page ${page} after 2 seconds...`);
                await new Promise(resolve => setTimeout(resolve, 2000)); 
                return await fetchPage(page, retryCount + 1);
            } else {
                console.error(`Failed to fetch page ${page} after ${maxRetries} retries`);
                return false;
            }
        }
    }
    
    // Fetch all pages
    while (await fetchPage(page)) {
        await new Promise(resolve => setTimeout(resolve, 1000));  // Add 1 second delay between pages
        page++;
    }
    
    console.log(`Total bookmarks found: ${bookmarks.length}`);
    
    // Download JSON file
    const jsonData = JSON.stringify(bookmarks, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'natomanga-bookmarks.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
})();