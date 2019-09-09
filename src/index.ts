import execa = require("execa");
import { codechecks } from "@codechecks/client";
import { visRegCodecheck } from "@codechecks/vis-reg";
import { dir as tmpDir } from "tmp-promise";

import { UserOptions, parseUserOptions } from "./options";

export async function visRegStorybook(_options: UserOptions = {}): Promise<void> {
  const options = parseUserOptions(_options);

  const { path: tmpPathDir } = await tmpDir();

  console.log(`Gathering screenshots to ${tmpPathDir}`);
  await execa(
    require.resolve("zisui/lib/node/cli.js"),
    ["--serverCmd", options.startServerCmd, "--outDir", tmpPathDir, options.storybookUrl],
    {
      timeout: 300000, // @todo we should fine a way to only timeout when there was no new output for x seconds
      cwd: codechecks.context.workspaceRoot,
    },
  );

  await visRegCodecheck({
    collectionName: options.collectionName,
    imagesPath: tmpPathDir,
  });
}

export default visRegStorybook;
