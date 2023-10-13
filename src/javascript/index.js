const gridCanvas = document.querySelector(".grid-canvas");
const rainbowMode = document.querySelector(".rainbow-mode");
const canvasSizeButton = document.querySelector(".submit-button");
const CANVAS_SIZE = 500;
const DEFAULT_BACKGROUND_COLOUR = "black";
const DEFAULT_CANVAS_GRID_ITEMS = 10;
const MIN_GRID_SIZE = 3;
const MAX_GRID_SIZE = 100;
class BoardConfiguration {
    constructor(rainbowMode, canvasGridItems, canvasSize) {
        this._rainbowMode = rainbowMode;
        this._canvasGridItems = canvasGridItems;
        this._canvasSize = canvasSize;
    }
    set rainbowMode(value) {
        this._rainbowMode = value;
    }
    set canvasGridItems(value) {
        this._canvasGridItems = value;
    }
    get rainbowMode() {
        return this._rainbowMode;
    }
    get canvasGridItems() {
        return this._canvasGridItems;
    }
    get canvasSize() {
        return this._canvasSize;
    }
}
function createGridItem(gridSize, backgroundColor, parent) {
    let gridItemSize = `${gridSize}px`;
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.setAttribute("style", `width: ${gridItemSize}; height: ${gridItemSize};`);
    gridItem.addEventListener("mouseenter", () => {
        gridItem.style.backgroundColor = backgroundColor;
    });
    parent.appendChild(gridItem);
}
function calculateGridItemSizePercentage(canvasSize, gridItems) {
    let pixels = canvasSize / gridItems;
    return pixels;
}
function setCanvasSize(canvasSize, canvas) {
    let canvasSizeCSS = `${canvasSize}px`;
    canvas.style.width = canvasSizeCSS;
    canvas.style.height = canvasSizeCSS;
}
function displayGridItems(canvasConf, parent) {
    let gridItemSize = calculateGridItemSizePercentage(canvasConf.canvasSize, canvasConf.canvasGridItems);
    let totalGridItem = canvasConf.canvasGridItems * canvasConf.canvasGridItems;
    for (let i = 1; i < totalGridItem + 1; i++) {
        const backgroundColour = setGridBackgroundColour(canvasConf.rainbowMode);
        createGridItem(gridItemSize, backgroundColour, parent);
    }
}
function setGridBackgroundColour(rainbowMode) {
    if (rainbowMode) {
        return randomizeBackgroundColour();
    }
    else {
        return DEFAULT_BACKGROUND_COLOUR;
    }
}
function randomizeBackgroundColour() {
    const randomColour = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColour}`;
}
function displayCurrentBackgroundColour(backgroundColor) {
    const currentColour = document.querySelector(".current-colour");
    currentColour.style.backgroundColor = backgroundColor;
}
function reCreateCanvas(canvasSize) {
    let parent = document.querySelector(".grid-container");
    let child = document.querySelector(".grid-canvas");
    child.remove();
    let newCanvas = document.createElement("div");
    newCanvas.classList.add("grid-canvas");
    setCanvasSize(canvasSize, newCanvas);
    parent.appendChild(newCanvas);
    return newCanvas;
}
function validateNewCanvasSize(input) {
    let gridSize = 0;
    try {
        let value = Number.parseInt(input);
        if (value <= MAX_GRID_SIZE && value >= MIN_GRID_SIZE) {
            gridSize = value;
        }
    }
    catch (error) {
        alert(error);
        gridSize = DEFAULT_CANVAS_GRID_ITEMS;
    }
    return gridSize;
}
function createCanvas(canvasConf) {
    let canvas = reCreateCanvas(canvasConf.canvasSize);
    displayGridItems(canvasConf, canvas);
}
function main(canvasConf) {
    alert("Invoke main");
    setCanvasSize(canvasConf.canvasSize, gridCanvas);
    displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
    displayGridItems(canvasConf, gridCanvas);
    canvasSizeButton.addEventListener("click", () => {
        let newCanvasValue = document.querySelector(".submit-text");
        let possibleNewValue = newCanvasValue.value;
        let newCanvasGridSizeValue = validateNewCanvasSize(possibleNewValue);
        canvasConf.canvasGridItems = newCanvasGridSizeValue;
        createCanvas(canvasConf);
    });
    rainbowMode.addEventListener("click", () => {
        if (canvasConf.rainbowMode) {
            canvasConf.rainbowMode = false;
            displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
            createCanvas(canvasConf);
        }
        else {
            canvasConf.rainbowMode = true;
            createCanvas(canvasConf);
        }
    });
}
let canvasConfiguration = new BoardConfiguration(false, DEFAULT_CANVAS_GRID_ITEMS, CANVAS_SIZE);
main(canvasConfiguration);
//# sourceMappingURL=index.js.map