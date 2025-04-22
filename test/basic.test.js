const { listBusyPorts, killPort } = require('../src/index');
const find = require('find-process');

jest.mock('find-process', () => jest.fn());

describe('Port Checker', () => {
  test('killPort handles no processes found', async () => {
    find.mockResolvedValueOnce([]);
    await killPort(1234);
    expect(find).toHaveBeenCalledWith('port', 1234);
  });

  test('killPort tries to kill found process', async () => {
    const pid = process.pid; // safe to use current pid for mocking
    find.mockResolvedValueOnce([{ pid }]);
    const spy = jest.spyOn(process, 'kill').mockImplementation(() => {});

    await killPort(1234);

    expect(spy).toHaveBeenCalledWith(pid);
    spy.mockRestore();
  });
});
