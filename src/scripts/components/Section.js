export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  setItem(element) {
    this._container.append(element);
  }
  clear() {
    this._container.innerHTML = "";
  }
  renderItem(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  prependItem(element) {
    this._container.prepend(element);
  }
}
