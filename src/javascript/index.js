const gridCanvas = document.querySelector(".grid-canvas");
const rainbowMode = document.querySelector(".rainbow-mode");
const CANVAS_SIZE = 500;
const DEFAULT_BACKGROUND_COLOUR = "black";
var RAINBOW_MODE = false;
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
function calculateGridItemSizePercentage(gridItems = 16) {
    let pixels = CANVAS_SIZE / gridItems;
    return pixels;
}
function setCanvasSize(canvas) {
    let canvasSize = `${CANVAS_SIZE}px`;
    canvas.style.width = canvasSize;
    canvas.style.height = canvasSize;
}
function displayGridItems(gridCount = 16, parent) {
    const gridItemSize = calculateGridItemSizePercentage(gridCount);
    const totalGridItem = gridCount * gridCount;
    for (let i = 1; i < totalGridItem + 1; i++) {
        const backgroundColour = setGridBackgroundColour();
        createGridItem(gridItemSize, backgroundColour, parent);
    }
}
function setGridBackgroundColour() {
    if (RAINBOW_MODE) {
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
function reCreateCanvas() {
    let parent = document.querySelector(".grid-container");
    let child = document.querySelector(".grid-canvas");
    child.remove();
    let newCanvas = document.createElement("div");
    newCanvas.classList.add("grid-canvas");
    newCanvas.style.border = "3px solid green;";
    setCanvasSize(newCanvas);
    parent.appendChild(newCanvas);
    return newCanvas;
}
setCanvasSize(gridCanvas);
rainbowMode.addEventListener("click", () => {
    if (RAINBOW_MODE) {
        RAINBOW_MODE = false;
        alert(RAINBOW_MODE);
        displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
        let canvas = reCreateCanvas();
        displayGridItems(16, canvas);
    }
    else {
        RAINBOW_MODE = true;
        alert(RAINBOW_MODE);
        let canvas = reCreateCanvas();
        displayGridItems(16, canvas);
    }
});
displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
displayGridItems(16, gridCanvas);
//# sourceMappingURL=index.js.map