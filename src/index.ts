import execa = require("execa");
import { codechecks } from "@codechecks/client";
import { visRegCodecheck } from "@codechecks/vis-reg";
import { dir as tmpDir } from "tmp-promise";
import * as waitForPort from "wait-for-localhost";

import { UserOptions, parseUserOptions } from "./options";

export async function visRegStorybook(_options: UserOptions = {}): Promise<void> {
  const options = parseUserOptions(_options);

  const { path: tmpPathDir } = await tmpDir();

  console.log("Start cmd", options.startServerCmd);
  const startServerCmd = execa.command(options.startServerCmd, {
    timeout: 300000, // @todo we should fine a way to only timeout when there was no new output for x seconds
    cwd: codechecks.context.workspaceRoot,
  });
  // wait for port
  await waitForPort({ port: 9001 });

  console.log("STORYBOOK time!");
  await execa(
    require.resolve("zisui/lib/node/cli.js"),
    ["--outDir", tmpPathDir, options.storybookUrl],
    {
      timeout: 300000, // @todo we should fine a way to only timeout when there was no new output for x seconds
      cwd: codechecks.context.workspaceRoot,
    },
  );

  await visRegCodecheck({
    collectionName: options.collectionName,
    imagesPath: tmpPathDir,
  });
  await startServerCmd.kill();
}

export default visRegStorybook;
