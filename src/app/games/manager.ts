import { createDirIfDoesntExist, createFileIfDoesntExist, readDataDir, readDataFile } from "@/lib/files"
import Game from "./game"
import { toast } from "@/components/ui/sonner"
import { sep } from "@tauri-apps/api/path"
import { Event, EventHandler, Listener } from "@/util/event/event"

export interface GameConfig {
  displayName: string
}

export class GamesManagerFetchedGamesEvent extends Event {

  constructor(private games: Game[]) {
    super()
  }

  getGames() {
    return this.games
  }
}

export default class GamesManager {

  private games: Game[]
  private onFetchedGamesEvent: EventHandler<GamesManagerFetchedGamesEvent>

  constructor (private rootDir: string) {
    this.games = []

    this.onFetchedGamesEvent = new EventHandler()
  }

  async load() {
    await this.makeFiles()
    await this.fetchGames()
  }

  getGamesPath() {
    return this.rootDir + sep() + "games"
  }

  private async makeFiles() {
    const gamesPath = this.getGamesPath()
    const historyFile = this.rootDir + sep() + "history.json"

    await createDirIfDoesntExist(gamesPath)
    await createFileIfDoesntExist(historyFile, JSON.stringify([]))
  }

  private jsonIsGameConfig(value: GameConfig): value is GameConfig {
    if (value.displayName)
      return true
    return false
  }

  private showFetchingGameFailedMessage(gameName: string, description: string) {
    toast({
      title: "Failed to load game",
      description: `${gameName}: ${description}`
    })
  }

  async fetchGames() {
    this.games = []
    const gamesPath = this.getGamesPath()

    const entries = await readDataDir(gamesPath)

    if (!entries)
      throw new Error("Couldn't read games folder (doesn't exist?)")

    for (let i=0;i<entries.length;i++) {
      if (!entries[i].isDirectory)
        continue

      const config = await readDataFile(gamesPath + sep() + entries[i].name + sep() + "game.json")
      if (config === undefined) {
        this.showFetchingGameFailedMessage(entries[i].name, "Missing game config (game.json).")
        continue
      }

      let configJSON

      try {
        configJSON = JSON.parse(config)
      } catch(err) {
        this.showFetchingGameFailedMessage(entries[i].name, "Game config appears to be invalid JSON.")
        console.error("Game config appears to be invalid JSON: " + entries[i].name)
      }

      if (!configJSON)
        continue
      
      if (this.jsonIsGameConfig(configJSON))
        this.games.push(new Game(entries[i].name, configJSON))
      else {
        this.showFetchingGameFailedMessage(entries[i].name, "Game config appears to be missing certain fields.")
        console.warn("Game config appears to be missing certain fields: " + entries[i].name)
      }
    }

    const event = new GamesManagerFetchedGamesEvent(this.getGames())
    this.onFetchedGamesEvent.fire(event)
  }

  onFetchedGames(callback: Listener<GamesManagerFetchedGamesEvent>) {
    this.onFetchedGamesEvent.addListener(callback)
  }

  offFetchedGames(callback: Listener<GamesManagerFetchedGamesEvent>) {
    this.onFetchedGamesEvent.addListener(callback)
  }

  getGames() {
    return this.games
  }
}
