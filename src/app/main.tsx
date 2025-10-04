import "../index.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import GamesManager from "./games/manager";

export const gamesManager = new GamesManager("gameData")

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);

export async function init() {
  await gamesManager.load()
}
