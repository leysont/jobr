const http = require("http")
const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")

const PORT = 5173
const DIST = path.join(__dirname, "dist")

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST, req.url === "/" ? "index.html" : req.url)

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST, "index.html")
  }

  const ext = path.extname(filePath)
  const contentType = MIME_TYPES[ext] || "application/octet-stream"

  fs.readFile(filePath, (err, data) => {
    console.log("Serving:", filePath)
    if (err) {
      console.log("Error:", err.message)
      res.writeHead(500)
      res.end("Internal Server Error")
      return
    }
    res.writeHead(200, { "Content-Type": contentType })
    res.end(data)
  })
})

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`
  console.log(`Running at ${url}`)
  exec(`start ${url}`)
})
