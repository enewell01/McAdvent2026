import "./styles.css";
import { motionOff } from "./festive";
import { installFestiveArt, installRockLayers } from "./pixels";
import { startSnow } from "./snow";
import { wireCopyButtons } from "./ui";

document.documentElement.classList.toggle("still", motionOff());
installRockLayers(document.documentElement);
installFestiveArt(document.documentElement);
wireCopyButtons();
startSnow(document.getElementById("snow") as HTMLCanvasElement, null, false);
