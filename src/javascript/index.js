const gridContainer = document.querySelector(".grid-canvas");
const CANVAS_SIZE = 500;
function createGridItem(gridSize) {
    console.log(gridSize);
    let gridItemSize = `${gridSize}px`;
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.setAttribute("style", `width: ${gridItemSize}; height: ${gridItemSize};`);
    gridItem.addEventListener("mouseenter", () => {
        gridItem.style.backgroundColor = "black";
    });
    gridContainer.appendChild(gridItem);
}
function calculateGridItemSizePercentage(gridItems = 16) {
    let pixels = (CANVAS_SIZE / gridItems);
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
        createGridItem(gridItemSize);
    }
}
setCanvasSize();
displayGridItems(16);
//# sourceMappingURL=index.js.map