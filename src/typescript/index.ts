const gridCanvas: HTMLElement = document.querySelector(".grid-canvas")!;
const rainbowMode: HTMLElement = document.querySelector(".rainbow-mode")!;
const canvasSizeButton: HTMLElement = document.querySelector(".submit-button")!;
const CANVAS_SIZE: number = 500;
const DEFAULT_BACKGROUND_COLOUR: string = "black";
const DEFAULT_CANVAS_GRID_ITEMS: number = 10;
const MIN_GRID_SIZE: number = 3;
const MAX_GRID_SIZE: number = 100;

class BoardConfiguration {
    _rainbowMode: boolean;
    _canvasGridItems: number;
    _canvasSize: number;
    constructor(rainbowMode: boolean, canvasGridItems: number, canvasSize: number) {
        this._rainbowMode = rainbowMode;
        this._canvasGridItems = canvasGridItems;
        this._canvasSize = canvasSize;
    }

    public set rainbowMode(value: boolean) {
        this._rainbowMode = value;
    }

    public set canvasGridItems(value: number) {
        this._canvasGridItems = value;
    }

    public get rainbowMode(): boolean {
        return this._rainbowMode;
    }

    public get canvasGridItems(): number {
        return this._canvasGridItems;
    }

    public get canvasSize(): number {
        return this._canvasSize;
    }
}

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

function calculateGridItemSizePercentage(canvasSize: number, gridItems: number): number {
    let pixels: number = canvasSize / gridItems;
    return pixels;
}

function setCanvasSize(canvasSize: number, canvas: HTMLElement) {
    let canvasSizeCSS = `${canvasSize}px`;
    canvas.style.width = canvasSizeCSS;
    canvas.style.height = canvasSizeCSS;
}

function displayGridItems(canvasConf: BoardConfiguration, parent: HTMLElement) {
    let gridItemSize: number = calculateGridItemSizePercentage(canvasConf.canvasSize, canvasConf.canvasGridItems);
    let totalGridItem: number = canvasConf.canvasGridItems * canvasConf.canvasGridItems;
    for (let i = 1; i < totalGridItem + 1; i++) {
        const backgroundColour: string = setGridBackgroundColour(canvasConf.rainbowMode);
        createGridItem(gridItemSize, backgroundColour, parent);
    }
}

function setGridBackgroundColour(rainbowMode: boolean): string {
    if (rainbowMode) {
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

function reCreateCanvas(canvasSize: number): HTMLElement {
    let parent: HTMLElement = document.querySelector(".grid-container")!;
    let child: HTMLElement = document.querySelector(".grid-canvas")!;
    child.remove();
    let newCanvas: HTMLDivElement = document.createElement("div");
    newCanvas.classList.add("grid-canvas");
    setCanvasSize(canvasSize, newCanvas);
    parent.appendChild(newCanvas);
    return newCanvas;
}

function validateNewCanvasSize(input: string): number {
    let gridSize: number = 0;
    try {
        let value: number = Number.parseInt(input);
        if (value <= MAX_GRID_SIZE && value >= MIN_GRID_SIZE) {
            gridSize = value;
        }
    } catch (error) {
        alert(error);
        gridSize = DEFAULT_CANVAS_GRID_ITEMS;
    }
    return gridSize;
}

function createCanvas(canvasConf: BoardConfiguration) {
    let canvas = reCreateCanvas(canvasConf.canvasSize);
    displayGridItems(canvasConf, canvas);
}

function main(canvasConf: BoardConfiguration) {
    alert("Invoke main");
    setCanvasSize(canvasConf.canvasSize, gridCanvas);
    displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
    displayGridItems(canvasConf, gridCanvas);

    canvasSizeButton.addEventListener("click", () => {
        let newCanvasValue: HTMLInputElement = document.querySelector(".submit-text")!;
        let possibleNewValue: string = newCanvasValue.value;
        let newCanvasGridSizeValue: number = validateNewCanvasSize(possibleNewValue);
        canvasConf.canvasGridItems = newCanvasGridSizeValue;
        createCanvas(canvasConf);
    });

    rainbowMode.addEventListener("click", () => {
        if (canvasConf.rainbowMode) {
            canvasConf.rainbowMode = false;
            displayCurrentBackgroundColour(DEFAULT_BACKGROUND_COLOUR);
            createCanvas(canvasConf);
        } else {
            canvasConf.rainbowMode = true;
            createCanvas(canvasConf);
        }
    });
}

let canvasConfiguration = new BoardConfiguration(false, DEFAULT_CANVAS_GRID_ITEMS, CANVAS_SIZE);
main(canvasConfiguration);
