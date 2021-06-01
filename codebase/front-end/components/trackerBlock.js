import * as localStorage from "../localStorage/userOperations.js";
import {createEditor} from "./blockController.js";

export class TrackerBlock extends HTMLElement {
	constructor(title, parent, tracker, trackerMenu) {
		super();
		let template = document.createElement("template");
		template.innerHTML = `
			<style>

				#title{
					cursor: pointer;
					border-bottom: 2px solid rgba(255,255,255,0.4);
					transition: 0.2s;
				}
	
				#title:hover{
					border-bottom: 2px solid rgba(255,255,255,0.9);
					transition: 0.2s;
				}

				#editorIcons{
					position: relative;
					display: inline;
					vertical-align: top;
				}
				
				#editorIcons img{
					margin-right: 7px;
					height: 15px;
					cursor: pointer;
					filter: var(--icon-filter);
				}

				@media screen and (max-width: 700px) {
					.plus{
						position: absolute;
					}
				}
			</style>
			<div id="container">
				<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons"/><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons"/></div>
				<span id="title">Test</span>
			</div>
		`;
		this.parent = parent;
		this.item = tracker;
		this.trackerMenu = trackerMenu;
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.trackerButton = this.shadowRoot.querySelector(".plus");
		this.plusButton = this.shadowRoot.querySelector("#editorIcons img");
		this.plusButton = this.shadowRoot.querySelector("#editorIcons img + img");
		this.titleSpan = this.shadowRoot.getElementById("title");
		this.titleSpan.innerHTML = title;
	}

	connectedCallback() {
		console.log('inside callback');
		//this.trackerButton = this.shadowRoot.getElementById("plus");
		this.plusButton.onclick = () => {
			this.createTracker();
		};

		this.titleSpan.onclick = () => {
			this.trackerMenu.clear();
			this.trackerMenu.title = this.titleSpan.innerHTML;
			this.trackerMenu.isInsideTracker = true;
			createEditor(this.trackerMenu.shadowRoot.getElementById("editor"), this.item, null, (success) => {

			});
		};
	}

	createTracker() {
		localStorage.createTracker(this.title.innerHTML, [], this.parent, (err, tracker) => {
			if (err) {
				console.log(err);
			} else {
				console.log(tracker);
			}
		});
	}
}

window.customElements.define('tracker-block', TrackerBlock);