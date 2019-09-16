import { codechecks } from "@codechecks/client";
import { createDebug, createTmpDir, execute } from "@codechecks/utils";
import { visRegCodecheck } from "@codechecks/vis-reg";

import { UserOptions, parseUserOptions } from "./options";
import { using } from "@codechecks/utils";
import { startStorybook } from "./start-storybook";

const debug = createDebug("vis-reg-storybook");

export async function visRegStorybook(_options: UserOptions = {}): Promise<void> {
  const options = parseUserOptions(_options);

  const tmpDir = await createTmpDir();

  const createStorybook = () =>
    startStorybook({
      cmd: codechecks.context.workspaceRoot,
      port: 9001,
      startServerCmd: options.startServerCmd,
    });

  await using({ createStorybook }, async () => {
    debug("Running zisui ", options.startServerCmd);

    await execute({
      file: require.resolve("zisui/lib/node/cli.js"),
      args: ["--outDir", tmpDir, options.storybookUrl],
      cwd: codechecks.context.workspaceRoot,
    });

    debug("Running vis reg codecheck");

    await visRegCodecheck({
      collectionName: options.collectionName,
      imagesPath: tmpDir,
    });
  });
}

export default visRegStorybook;
