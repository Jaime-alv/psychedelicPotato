const gridContainer = document.querySelector(".grid-canvas");
const rainbowMode = document.querySelector(".rainbow-mode");
const CANVAS_SIZE = 500;
const DEFAULT_BACKGROUND_COLOUR = "black";
var RAINBOW_MODE = false;
function createGridItem(gridSize, backgroundColor) {
    let gridItemSize = `${gridSize}px`;
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.setAttribute("style", `width: ${gridItemSize}; height: ${gridItemSize};`);
    gridItem.addEventListener("mouseenter", () => {
        gridItem.style.backgroundColor = backgroundColor;
    });
    gridContainer.appendChild(gridItem);
}
function calculateGridItemSizePercentage(gridItems = 16) {
    let pixels = CANVAS_SIZE / gridItems;
    return pixels;
}
function setCanvasSize() {
    let canvasSize = `${CANVAS_SIZE}px`;
    gridContainer.style.width = canvasSize;
    gridContainer.style.height = canvasSize;
}
function displayGridItems(gridCount = 16) {
    const gridItemSize = calculateGridItemSizePercentage(gridCount);
    const totalGridItem = gridCount * gridCount;
    for (let i = 1; i < totalGridItem + 1; i++) {
        const backgroundColour = setGridBackgroundColour();
        createGridItem(gridItemSize, backgroundColour);
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
setCanvasSize();
rainbowMode.addEventListener("click", () => {
    if (RAINBOW_MODE) {
        RAINBOW_MODE = false;
        displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
        displayGridItems(16);
    }
    else {
        RAINBOW_MODE = true;
        displayGridItems(16);
    }
});
displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
//# sourceMappingURL=index.js.map