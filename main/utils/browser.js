import * as childProcess from "child_process";
import CDP from "chrome-remote-interface";

export const spawn = async () => {
  const process = childProcess.spawn("google-chrome", [
    "--remote-debugging-port=9222",
  ]);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
  try {
    CDP(async (client) => {
      await client.close();
    });
  } catch (e) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 10000);
    });
  }
  return process;
};

export const close = async (process) => {
  process.kill();
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
};
