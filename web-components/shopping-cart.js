//  unfinished example using LitElement
import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export default class ShoppingCart extends LitElement {
  static properties = {
    items: { type: Array }
  };

  static styles = css``;
  constructor() {
    super();
    this.items = ["apple", "banana", "orange"];
  }
  render() {
    return html`
      <div>
        <h1>Shopping Cart</h1>
        ${this.items.map((item) => html`<p>${item}</p>`)}
      </div>
    `;
  }
}
customElements.define("shopping-cart", ShoppingCart);
