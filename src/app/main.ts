import GamesManager from "./games/manager"

export const gamesManager = new GamesManager("gameData")

export async function init() {
  await gamesManager.load()
}