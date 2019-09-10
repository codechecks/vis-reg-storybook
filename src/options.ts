import * as which from "npm-which";
import { codechecks } from "@codechecks/client";
export interface UserOptions {
  storybookUrl?: string;
  startServerCmd?: string;
  collectionName?: string;
}

export type Options = Required<UserOptions>;

export function parseUserOptions(_userOptions?: UserOptions): Options {
  const userOptions = _userOptions || {};
  const w = which(codechecks.context.workspaceRoot);
  const res = w.sync("start-storybook");

  return {
    collectionName: userOptions.collectionName || "Storybook",
    storybookUrl: userOptions.storybookUrl || "http://localhost:9001",
    startServerCmd: userOptions.startServerCmd || `${res} --ci -p 9001`,
  };
}
