const gridContainer: HTMLElement = document.querySelector(".grid-canvas")!;
const CANVAS_SIZE: number = 500;

function createGridItem(gridSize: number) {
    console.log(gridSize);
    let gridItemSize: string = `${gridSize}px`;
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.setAttribute("style", `width: ${gridItemSize}; height: ${gridItemSize};`);
    gridItem.addEventListener("mouseenter", () => {
        gridItem.style.backgroundColor = "black";
    })
    gridContainer.appendChild(gridItem);
}

function calculateGridItemSizePercentage(gridItems: number = 16): number {
    let pixels: number = (CANVAS_SIZE / gridItems);
    return pixels
}

function setCanvasSize() {
    let canvasSize = `${CANVAS_SIZE}px`;
    gridContainer.style.width = canvasSize;
    gridContainer.style.height = canvasSize;
}

function displayGridItems(gridCount: number = 16) {
    const gridItemSize: number = calculateGridItemSizePercentage(gridCount);
    const totalGridItem: number = gridCount * gridCount;
    for (let i = 1; i < totalGridItem + 1; i++) {
        createGridItem(gridItemSize);
    }
}

setCanvasSize();
displayGridItems(16);
