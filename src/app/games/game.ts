import { GameConfig } from "./manager";

export default class Game {

  constructor (private name: string, private config: GameConfig) {
    
  }

  getName() {
    return this.name;
  }

  getConfig() {
    return this.config;
  }
}
