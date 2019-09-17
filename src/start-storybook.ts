import * as waitForPort from "wait-for-localhost";
import { createDebug, DisposableResource, executeCommand } from "@codechecks/utils";

const debug = createDebug("vis-reg-storybook:startStorybook");

interface StartStorybookOptions {
  startServerCmd: string;
  cmd: string;
  port: number;
}

export async function startStorybook(
  options: StartStorybookOptions,
): Promise<DisposableResource<undefined>> {
  debug("Starting storybook with cmd: ", options.startServerCmd);

  // missing check if port is not already used

  const startServerCmd = executeCommand({
    cmd: options.startServerCmd,
    cwd: options.cmd,
  });

  debug("Waiting for port: ", options.port);
  await waitForPort({ port: options.port, useGet: true });
  debug(`Port: ${options.port} available!`);

  return {
    resource: undefined,
    dispose: () => {
      debug("Disposing");
      startServerCmd.kill();
    },
  };
}
