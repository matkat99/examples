// Based off an example from MDN https://mdn.github.io/web-components-examples/editable-list/
const listTemplate = document.createElement("template");
listTemplate.innerHTML = `<style>
.add-item {
display: flex;
justify-content: space-between;
align-items: center;}
.icon {
    border: 0;
    background-color: transparent;
    font-size: 1.8em;
    cursor: pointer;
    &:hover {
        color: var(--hover-color,#007bff);
    }
          &:before {
        content: var(--add-icon,"⊕");
    }
}
</style>
<section>
    <slot name="title"></slot>
    <slot></slot>
    <div class="add-item">
        <slot name="label"></slot>
        <input type="text" placeholder="Add a new List Item"></input>
        <button class="add-button icon"></button>
    </div>
</section>`;

class EditableList extends HTMLElement {
  constructor() {
    // Call super to run the constructor of HTMLElement
    super();
    // Create a shadow DOM for this element
    const shadow = this.attachShadow({ mode: "open" });
    // clone the content of the template we created and insert it into our shadow DOM
    shadow.appendChild(listTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    console.log(this);
    const button = this.shadowRoot.querySelector(".add-button");
    button.addEventListener("click", this.addItem.bind(this));
  }
  addItem() {
    // Why can we get away with just targeting input? notice that we are not searching from `document`...we are searching from `this.shadowRoot`. We are in a bubble.
    const input = this.shadowRoot.querySelector("input");
    if (input.value) {
      const newItem = `<list-item>${input.value}</list-item>`;
      this.insertAdjacentHTML("beforeend", newItem);
      input.value = "";
    }
  }
}
customElements.define("editable-list", EditableList);

const itemTemplate = document.createElement("template");
itemTemplate.innerHTML = `<style>
li {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.icon {
    border: 0;
    background-color: transparent;
    font-size: 1.8em;
    cursor: pointer;
    &:hover {
        color: var(--hover-color,#007bff);
    }
        &:before {
        content: var(--remove-icon,"⊖");
    }
}
</style>
<li>
    <slot></slot>
    <button class="remove-button icon"></button>
</li>`;

class ListItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(itemTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    console.log("connectedCallback", this);
    const removeButton = this.shadowRoot.querySelector(".remove-button");
    removeButton.addEventListener("click", this.removeListItem);
  }
  removeListItem(e) {
    // e.target will be the button clicked...we need the parent element
    const parent = e.target.parentNode;
    parent.remove();
  }
}
customElements.define("list-item", ListItem);
