const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

app.post('/run-folder-creation', (req, res) => {
    try {
        // Get the desktop path
        const desktopPath = path.join(os.homedir(), 'Desktop');

        // Generate a timestamp with Beirut local time
        const timestamp = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Beirut',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
            .format(new Date())
            .replace(/[/,:\s]/g, '-')
            .replace(',', '_');

        // Create folder name and path
        const folderName = `Oscar_${timestamp}`;
        const folderPath = path.join(desktopPath, folderName);

        // Create the folder
        fs.mkdirSync(folderPath, { recursive: true });

        // Send a success response
        console.log(`Folder created at: ${folderPath}`);
        res.status(200).send(`Folder created at: ${folderPath}`);
    } catch (error) {
        console.error(`Error creating folder: ${error.message}`);
        res.status(500).send('Error creating folder');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
