import * as EditableList from "./editable-list.js";
import WordCount from "./word-count.js";
import ShoppingCart from "./shopping-cart.js";

// basic example of a simple web component
class NewElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    // shadow.innerHTML = `
    //   <style>
    //     h2 {
    //       color: red;
    //     }
    //       </style>
    //       <h2><slot></slot></h2>`;
  }
  connectedCallback() {
    console.log(this);
  }
}
customElements.define("new-element", NewElement);
