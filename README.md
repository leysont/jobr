# Jobr

### Running

The recommended way to run Jobr is via the official .exe file from Releases.

#### Run via official .exe from Releases
- requirements:
  - Windows
- instructions:
  - Go to the [latest release](https://github.com/leysont/jobr/releases/latest) and download the .exe file
  - Launch the .exe file
    - If SmartScreen complains, click "More info" and then "Run anyway"
    - If the firewall complains, you can click "Cancel"; the app will still work
  - A Terminal window will open and Jobr will open in the browser automatically
    - If the browser doesn't open automatically, open it manually and navigate to http://localhost:5173
    - The website will work as long as the Terminal window is open

#### Run via Node
- requirements:
  - Node.js
- instructions:
  - Download this repository
    - If Git is available: clone this repository with `git clone https://github.com/leysont/jobr.git`
    - If Git isn't available: Download the ZIP file
  - Make sure you're in the terminal and in the project directory
  - Install node dependencies: `npm install`
  - Build the project: `npm run build`
  - Start the server: `node server.cjs`

#### Run development version
- requirements:
  - Node.js
- instructions:
  - Clone this repository with `git clone https://github.com/leysont/jobr.git`
  - Make sure you're in the terminal and in the project directory
  - Install node dependencies: `npm install`
  - Start the server: `npm run dev`
    - The website will be available at http://localhost:5173
    - You can make changes to the code and the website will automatically update