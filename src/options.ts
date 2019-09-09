export interface UserOptions {
  storybookUrl?: string;
  startServerCmd?: string;
  collectionName?: string;
}

export type Options = Required<UserOptions>;

export function parseUserOptions(userOptions: UserOptions): Options {
  return {
    collectionName: userOptions.collectionName || "Storybook",
    storybookUrl: userOptions.storybookUrl || "http://localhost:9001",
    startServerCmd:
      userOptions.startServerCmd || "./node_modules/.bin/start-storybook --ci -p 9001",
  };
}
