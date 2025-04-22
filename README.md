# 🛠️ port-checker-cli

A cross-platform Node.js utility to **list busy ports** and **kill processes** on specific ports — works on **Windows**, **macOS**, and **Linux**.

---

## Features

- 🔍 List all busy ports  
- 🔪 Kill a process running on a specific port  
- 💻 Works on Windows, macOS, and Linux  
- 🧱 Use as a CLI tool **or** as a Node.js module  

---

## 📦 Installation

```bash
npm install -g port-checker-cli
````

🔧 You can also use it locally with npx
```bash
npx port-checker-cli --list
```

---

## Usage

### CLI

#### List all busy ports:

```bash
port-check --list
```

#### Kill the process running on a specific port:

```bash
port-check --kill 3000
```

---

### As a Module

You can also use it inside Node.js projects:

```js
const { listBusyPorts, killPort } = require('port-checker-cli');

(async () => {
  await listBusyPorts([3000, 3010]); // Check ports 3000–3010
  await killPort(3000); // Kill process on port 3000
})();
```

---

## 🛠️ API

### `listBusyPorts([start, end])`

Returns a list of busy ports within a given range.

- **start** (number) – starting port (default: 1)
    
- **end** (number) – ending port (default: 65535)
    

### `killPort(port)`

Kills the process running on the specified port.

---

## 📋 License

MIT License

---

## ✨ Author

Created with ❤️ by [Anish Bala Sachin](https://github.com/sachinabs)
