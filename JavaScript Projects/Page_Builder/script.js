class PageBuilder {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.selectedElement = null;
    this.init();
  }

  init() {
    document.querySelectorAll(".toolbar button").forEach((button) => {
      button.addEventListener("click", (event) => this.addElement(event));
    });
    document
      .getElementById("clear")
      .addEventListener("click", () => this.clearCanvas());
    document
      .getElementById("save-page")
      .addEventListener("click", () => this.savePage());
    document
      .getElementById("apply-styles")
      .addEventListener("click", () => this.applyStyles());
    document.querySelectorAll(".bg-btn").forEach((btn) => {
      btn.addEventListener("click", (event) =>
        this.changeElementBackground(event)
      );
    });
    document
      .getElementById("canvas-bg-color")
      .addEventListener("input", (event) => this.changeCanvasBackground(event));
    this.initTextEditor();
  }

  addElement(event) {
    const elementType = event.target.getAttribute("data-element");
    let newElement;

    switch (elementType) {
      case "heading":
        newElement = document.createElement("h1");
        newElement.textContent = "New Heading";
        break;

      case "paragraph":
        newElement = document.createElement("p");
        newElement.textContent = "New paragraph. Click to edit.";
        break;

      case "image":
        newElement = document.createElement("img");
        newElement.src = "https://via.placeholder.com/150";
        break;

      case "card":
        newElement = document.createElement("div");
        newElement.classList.add("card");
        newElement.innerHTML = `
          <h3>Card Title</h3>
          <p>Card content</p>
        `;
        break;

      case "div":
        newElement = document.createElement("div");
        newElement.textContent = "New Div";
        newElement.style.border = "1px solid #ddd";
        newElement.style.padding = "10px";
        break;

      default:
        return;
    }

    this.addToCanvas(newElement);
  }

  addToCanvas(element) {
    element.draggable = true;
    element.addEventListener("click", () => this.selectElement(element));
    this.canvas.appendChild(element);
  }

  clearCanvas() {
    this.canvas.innerHTML = ""; // Clear all child elements
    this.canvas.style.backgroundColor = "white"; // Reset background color to white
  }

  savePage() {
    const htmlContent = this.canvas.innerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "saved_page.html";
    link.click();
  }

  changeElementBackground(event) {
    const color = event.target.getAttribute("data-color");
    if (this.selectedElement) {
      this.selectedElement.style.backgroundColor = color;
    }
  }

  changeCanvasBackground(event) {
    this.canvas.style.backgroundColor = event.target.value;
  }

  selectElement(element) {
    this.selectedElement = element;

    // Pre-fill style editor with selected element's current properties
    document.getElementById("text-content").value =
      this.selectedElement.innerText || "";
    document.getElementById("font-size").value =
      parseInt(getComputedStyle(this.selectedElement).fontSize) || 16;
    document.getElementById("color").value = this.rgbToHex(
      getComputedStyle(this.selectedElement).color
    );
    document.getElementById("bg-color").value = this.rgbToHex(
      getComputedStyle(this.selectedElement).backgroundColor
    );
    document.getElementById("padding").value =
      parseInt(getComputedStyle(this.selectedElement).padding) || 0;
    document.getElementById("margin").value =
      parseInt(getComputedStyle(this.selectedElement).margin) || 0;
    document.getElementById("width").value =
      this.selectedElement.offsetWidth || "";
    document.getElementById("height").value =
      this.selectedElement.offsetHeight || "";
  }

  applyStyles() {
    if (this.selectedElement) {
      const horizontal = document.getElementById("align-horizontal").value;
      const vertical = document.getElementById("align-vertical").value;

      this.selectedElement.style.fontSize = `${
        document.getElementById("font-size").value
      }px`;
      this.selectedElement.style.color = document.getElementById("color").value;
      this.selectedElement.style.backgroundColor =
        document.getElementById("bg-color").value;
      this.selectedElement.style.padding = `${
        document.getElementById("padding").value
      }px`;
      this.selectedElement.style.margin = `${
        document.getElementById("margin").value
      }px`;
      this.selectedElement.style.width = `${
        document.getElementById("width").value
      }px`;
      this.selectedElement.style.height = `${
        document.getElementById("height").value
      }px`;
      this.selectedElement.style.textAlign = horizontal;

      if (vertical === "middle") {
        this.selectedElement.style.display = "flex";
        this.selectedElement.style.alignItems = "center";
        this.selectedElement.style.justifyContent = "center";
      } else {
        this.selectedElement.style.display = "";
        this.selectedElement.style.alignItems = "";
        this.selectedElement.style.justifyContent = "";
      }

      this.canvas.style.justifyContent = this.getAlign(horizontal);
      this.canvas.style.alignItems = this.getAlign(vertical);
    }
  }

  getAlign(value) {
    const mapping = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
      top: "flex-start",
      middle: "center",
      bottom: "flex-end",
    };
    return mapping[value] || "flex-start";
  }

  rgbToHex(rgb) {
    const rgbArray = rgb.match(/\d+/g);
    return rgbArray
      ? `#${rgbArray
          .map((x) => parseInt(x).toString(16).padStart(2, "0"))
          .join("")}`
      : "#ffffff";
  }

  initTextEditor() {
    document
      .getElementById("text-content")
      .addEventListener("input", (event) => {
        if (this.selectedElement) {
          this.selectedElement.innerText = event.target.value;
        }
      });
  }
}

document.addEventListener("DOMContentLoaded", () => new PageBuilder("canvas"));
