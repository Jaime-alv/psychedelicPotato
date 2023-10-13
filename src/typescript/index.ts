const gridCanvas: HTMLElement = document.querySelector(".grid-canvas")!;
const rainbowMode: HTMLElement = document.querySelector(".rainbow-mode")!;
const CANVAS_SIZE: number = 500;
const DEFAULT_BACKGROUND_COLOUR: string = "black";
var RAINBOW_MODE: boolean = false;

function createGridItem(gridSize: number, backgroundColor: string) {
    let gridItemSize: string = `${gridSize}px`;
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.setAttribute("style", `width: ${gridItemSize}; height: ${gridItemSize};`);
    gridItem.addEventListener("mouseenter", () => {
        gridItem.style.backgroundColor = backgroundColor;
    });
    gridCanvas.appendChild(gridItem);
}

function calculateGridItemSizePercentage(gridItems: number = 16): number {
    let pixels: number = CANVAS_SIZE / gridItems;
    return pixels;
}

function setCanvasSize() {
    let canvasSize = `${CANVAS_SIZE}px`;
    gridCanvas.style.width = canvasSize;
    gridCanvas.style.height = canvasSize;
}

function displayGridItems(gridCount: number = 16) {
    const gridItemSize: number = calculateGridItemSizePercentage(gridCount);
    const totalGridItem: number = gridCount * gridCount;
    for (let i = 1; i < totalGridItem + 1; i++) {
        const backgroundColour: string = setGridBackgroundColour();
        createGridItem(gridItemSize, backgroundColour);
    }
}

function setGridBackgroundColour(): string {
    if (RAINBOW_MODE) {
        return randomizeBackgroundColour();
    } else {
        return DEFAULT_BACKGROUND_COLOUR;
    }
}

function randomizeBackgroundColour(): string {
    const randomColour: string = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColour}`;
}

function displayCurrentBackgroundColour(backgroundColor: string) {
    const currentColour: HTMLElement = document.querySelector(".current-colour")!;
    currentColour.style.backgroundColor = backgroundColor;
}

setCanvasSize();

rainbowMode.addEventListener("click", () => {
    if (RAINBOW_MODE) {
        RAINBOW_MODE = false;
        displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
        displayGridItems(16);
    } else {
        RAINBOW_MODE = true;
        displayGridItems(16);
    }
});

displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
displayGridItems(16);
