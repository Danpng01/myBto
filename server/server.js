// server.js
const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3001;

app.get('/api/notifications', (req, res) => {
  const pythonProcess = spawn('python', ['notifscraper.py']);

  let dataString = '';

  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    // Parse dataString into the format expected by the Vue.js app and send it
    const notifications = parseNotifications(dataString);
    console.log(notifications)
    res.json(notifications);
  });
});

function parseNotifications(dataString) {
    // Regular expression to match dates in the format "01 Apr 2024"
    const dateRegex = /\d{2} \w{3} \d{4}/;

    // Function to clean each line of unwanted characters
    const cleanLine = (line) => line.replace(/�/g, "'");

    // Split the entire string by lines and clean each line
    const lines = dataString.split("\n").map(line => cleanLine(line));
    
    const entries = [];
    let currentEntry = [];
    let capture = false; // Flag to start capturing lines into currentEntry
    
    lines.forEach((line, index) => {
        if (dateRegex.test(line)) {
            if (currentEntry.length > 0) {
                const entryContent = currentEntry.join(" ");
                entries.push({ id: entries.length + 1, title: entryContent });
                currentEntry = [];
            }
            capture = true;
        } else if (line.includes("Read more")) {
            capture = false;
        } else if (capture) {
            currentEntry.push(line);
        }
        
        if (index === lines.length - 1 && currentEntry.length > 0) {
            const entryContent = currentEntry.join(" ");
            entries.push({ id: entries.length + 1, title: entryContent });
        }
    });
    
    return entries;
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});