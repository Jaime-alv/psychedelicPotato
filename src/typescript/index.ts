const gridCanvas: HTMLElement = document.querySelector(".grid-canvas")!;
const rainbowMode: HTMLElement = document.querySelector(".rainbow-mode")!;
const CANVAS_SIZE: number = 500;
const DEFAULT_BACKGROUND_COLOUR: string = "black";
var RAINBOW_MODE: boolean = false;

function createGridItem(gridSize: number, backgroundColor: string, parent: HTMLElement) {
    let gridItemSize: string = `${gridSize}px`;
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.setAttribute("style", `width: ${gridItemSize}; height: ${gridItemSize};`);
    gridItem.addEventListener("mouseenter", () => {
        gridItem.style.backgroundColor = backgroundColor;
    });
    parent.appendChild(gridItem);
}

function calculateGridItemSizePercentage(gridItems: number = 16): number {
    let pixels: number = CANVAS_SIZE / gridItems;
    return pixels;
}

function setCanvasSize(canvas: HTMLElement) {
    let canvasSize = `${CANVAS_SIZE}px`;
    canvas.style.width = canvasSize;
    canvas.style.height = canvasSize;
}

function displayGridItems(gridCount: number = 16, parent: HTMLElement) {
    const gridItemSize: number = calculateGridItemSizePercentage(gridCount);
    const totalGridItem: number = gridCount * gridCount;
    for (let i = 1; i < totalGridItem + 1; i++) {
        const backgroundColour: string = setGridBackgroundColour();
        createGridItem(gridItemSize, backgroundColour, parent);
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

function reCreateCanvas(): HTMLElement {
    let parent: HTMLElement = document.querySelector(".grid-container")!;
    let child: HTMLElement = document.querySelector(".grid-canvas")!;
    child.remove();
    let newCanvas = document.createElement("div");
    newCanvas.classList.add("grid-canvas");
    setCanvasSize(newCanvas);
    parent.appendChild(newCanvas);
    return newCanvas;
}

setCanvasSize(gridCanvas);

rainbowMode.addEventListener("click", () => {
    if (RAINBOW_MODE) {
        RAINBOW_MODE = false;
        displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
        let canvas = reCreateCanvas();
        displayGridItems(16, canvas);
    } else {
        RAINBOW_MODE = true;
        let canvas = reCreateCanvas();
        displayGridItems(16, canvas);
    }
});

displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
displayGridItems(16, gridCanvas);
