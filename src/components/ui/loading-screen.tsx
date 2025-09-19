import { TinyGamesLogoWithText } from "./logo";

export default function LoadingScreen() {
  return (
    <div data-tauri-drag-region className="bg-secondary size-full absolute top-0 left-0 z-100 flex items-center justify-center">
      <div className="pointer-events-none">
        <TinyGamesLogoWithText className="w-64" />
      </div>
    </div>
  )
}
