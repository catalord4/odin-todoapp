import "./frontend/css/style.css";
import { mainPage } from "./frontend/home/mainPage";

const index = (function () {
  document.body.appendChild(mainPage());
})();
