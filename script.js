import { elements } from "./data.js";

const wrapper = document.querySelector(".wrapper");

const createField = () => {
  elements.forEach((element) => {
    const cell = document.createElement("div");
    cell.classList.add("cells");
    cell.setAttribute("data-image", element.image);

    const icon = document.createElement("i");
    icon.className = element.icon;
    cell.appendChild(icon);

    wrapper.appendChild(cell);
  });
};
createField();

const cells = document.querySelectorAll(".cells");

class TableGame {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.id = 0;
    this.arrayClosest = [];
  }
  addId() {
    cells.forEach((elem) => {
      this.id++;
      elem.id = `${this.id}`;
    });
  }
  getElementById(id) {
    return document.getElementById(id);
  }
  getClosest(id) {
    const intId = +id;
    const width = this.width;
    const height = this.height;

    const getTop = () =>
      intId - width > 0 ? this.getElementById(intId - width) : null;
    const getBottom = () =>
      intId + width <= width * height
        ? this.getElementById(intId + width)
        : null;
    const getLeft = () =>
      intId % width !== 1 ? this.getElementById(intId - 1) : null;
    const getRight = () =>
      intId % width !== 0 ? this.getElementById(intId + 1) : null;

    const getTopLeft = () =>
      getTop() && getLeft() ? this.getElementById(intId - width - 1) : null;
    const getTopRight = () =>
      getTop() && getRight() ? this.getElementById(intId - width + 1) : null;
    const getBottomLeft = () =>
      getBottom() && getLeft() ? this.getElementById(intId + width - 1) : null;
    const getBottomRight = () =>
      getBottom() && getRight() ? this.getElementById(intId + width + 1) : null;

    this.arrayClosest = [
      getTop(),
      getBottom(),
      getLeft(),
      getRight(),
      getTopLeft(),
      getTopRight(),
      getBottomLeft(),
      getBottomRight(),
    ].filter(Boolean);

    return this.arrayClosest;
  }
  deleteTheSame(target) {
    let array = this.getClosest(target.id);
    array.forEach((elem) => {
      if (
        elem.dataset.image === target.dataset.image &&
        elem.childNodes[0] !== undefined
      ) {
        elem.childNodes[0].remove();
        this.deleteTheSame(elem);
      }
    });
  }
}

const game = new TableGame(6, 7);
game.addId();

wrapper.addEventListener("click", (event) => {
  let elem;
  if (event.target.tagName === "I") {
    elem = event.target.parentNode;
  } else {
    elem = event.target;
  }
  game.deleteTheSame(elem);
});
