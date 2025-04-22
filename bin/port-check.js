#!/usr/bin/env node

const { listBusyPorts, killPort } = require('../src/index');

const args = process.argv.slice(2);

if (args.includes('--list')) {
  listBusyPorts().catch(console.error);
} else if (args.includes('--kill')) {
  const portIndex = args.indexOf('--kill') + 1;
  const port = args[portIndex];
  if (!port) {
    console.error('❌ Please provide a port number to kill. Example: port-check --kill 3000');
    process.exit(1);
  }
  killPort(port).catch(console.error);
} else {
  console.log(`
Usage:
  port-check --list           List all busy ports
  port-check --kill <port>    Kill process running on the specified port
  `);
}
