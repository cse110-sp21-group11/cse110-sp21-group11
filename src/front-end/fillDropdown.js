import {  adderDropdown, currentObject, creationMenu } from "./index.js";

export let creationDropdownContents = {
    "index": [
        {
            title: "New Future Log",
            listener: () => {
                creationMenu.setKind("futureLog");
                creationMenu.show();
            }
        },
        {
            title: "New Collection",
            listener: () => {
                creationMenu.setKind("collection");
                creationMenu.show();
            }
        }
    ],

    "futureLog": [
        {
            title: "New Monthly Log",
            listener: () => {
                creationMenu.setKind("monthlyLog");
                creationMenu.show();
            }
        },
        {
            title: "New Tracker",
            listener: () => {
                creationMenu.setKind("tracker");
                creationMenu.show();
            }
        }
    ],

    "monthlyLog": [
        {
            title: "New Daily Log",
            listener: () => {
                creationMenu.setKind("dailyLog");
                creationMenu.show();
            }
        },
        {
            title: "New Tracker",
            listener: () => {
                creationMenu.setKind("tracker");
                creationMenu.show();
            }
        }
    ]
};


export function openCreationDropdown(x, y) {
    if (creationDropdownContents[currentObject.objectType] === undefined) {
        return;
    }

    adderDropdown.setPosition(x, y);

    adderDropdown.fillDropdown(creationDropdownContents[currentObject.objectType]);
}

export function openUtilDropdown(x, y, item) {
    if (utilDropdownContents[currentObject.objectType] === undefined) {
        return;
    }

    adderDropdown.setPosition(x, y);

    
 let utilDropdownContents = {
    "index": [
        {
            title: "Delete",
            listener: () => {
                item
            }
        }
    ],
    "futureLog": [
    ],
    "monthlyLog": [
    ],
    "dailyLog": [
    ]
}


    adderDropdown.fillDropdown(utilDropdownContents[currentObject.objectType]);
}
