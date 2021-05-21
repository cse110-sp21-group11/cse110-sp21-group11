import { TextBlock } from "./components/block.js";
import * as localStorage from "./localStorage/userOperations.js";
import {router} from "./router.js";
import {controller} from "./components/blockController.js";
router.setState(document.location.hash, null);

let contentWrapper = document.getElementById("contentWrapper");
export let blockArray = [];

document.addEventListener("DOMContentLoaded", () => {
	let newBlock = new TextBlock(controller, (success) => {
		if (success){
			contentWrapper.appendChild(newBlock);
			blockArray.push(newBlock);
			controller.currentBlockIndex = blockArray.length - 1;
			newBlock.focus();
		}
	});
});

