import * as waitForPort from "wait-for-localhost";
import { createDebug, DisposableResource, executeCommand } from "@codechecks/utils";

const debug = createDebug("vis-reg-storybook");

interface StartStorybookOptions {
  startServerCmd: string;
  cmd: string;
  port: number;
}

export async function startStorybook(
  options: StartStorybookOptions,
): Promise<DisposableResource<undefined>> {
  debug("Starting storybook with cmd: ", options.startServerCmd);

  const startServerCmd = executeCommand({
    cmd: options.startServerCmd,
    cwd: options.cmd,
  });

  await waitForPort({ port: options.port });

  return {
    resource: undefined,
    dispose: () => startServerCmd.kill(),
  };
}
