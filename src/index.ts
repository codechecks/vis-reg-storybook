import execa = require("execa");
import { codechecks } from "@codechecks/client";

export async function check(_options: any = {}): Promise<void> {
  await execa(
    require.resolve("zisui/lib/node/cli.js"),
    ["--serverCmd", "start-storybook -p 9001", "http://localhost:9001"],
    {
      timeout: 100000,
      cwd: codechecks.context.workspaceRoot,
    },
  );
}

export default check;
