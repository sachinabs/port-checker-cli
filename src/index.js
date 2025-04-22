const find = require('find-process');
const net = require('net');

/**
 * Checks whether a given port is currently in use on the system.
 *
 * @param {number} port - The port number to check.
 * @returns {Promise<boolean>} Resolves to `true` if the port is busy, otherwise `false`.
 */
function isPortBusy(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(true)); // Port is in use
    server.once('listening', () => {
      server.close(() => resolve(false)); // Port is free
    });

    server.listen(port);
  });
}

/**
 * Scans and logs a list of busy ports within the specified range.
 *
 * @param {[number, number]} [range=[1, 65535]] - An optional tuple specifying the start and end port range.
 * @returns {Promise<void>} Logs busy ports to the console.
 */
async function listBusyPorts(range = [1, 65535]) {
  const [start, end] = range;
  console.log('🔎 Scanning ports. This may take a moment...');

  const results = await Promise.all(
    Array.from({ length: end - start + 1 }, (_, i) => start + i)
      .map(async (port) => {
        const busy = await isPortBusy(port);
        return busy ? port : null;
      })
  );

  const busyPorts = results.filter(Boolean);
  if (busyPorts.length === 0) {
    console.log('✅ No busy ports found.');
  } else {
    console.log('🚫 Busy ports:');
    busyPorts.forEach((p) => console.log(`- Port ${p}`));
  }
}

/**
 * Attempts to find and kill the process using a specific port.
 *
 * @param {number} port - The port number to free up.
 * @returns {Promise<void>} Logs results of the kill operation to the console.
 */
async function killPort(port) {
  try {
    const list = await find('port', port);
    if (!list.length) {
      console.log(`✅ No process found on port ${port}`);
      return;
    }

    for (const proc of list) {
      try {
        process.kill(proc.pid);
        console.log(`🔪 Killed process PID ${proc.pid} on port ${port}`);
      } catch (err) {
        console.error(`❌ Failed to kill PID ${proc.pid}: ${err.message}`);
      }
    }
  } catch (err) {
    console.error('❌ Error finding/killing process:', err.message);
  }
}

module.exports = {
  listBusyPorts,
  killPort,
};
