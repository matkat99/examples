class CriticalSlider extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.percentage = 0.0;
  }

  static get observedAttributes() {
    return ["percentage", "date"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  async connectedCallback() {
    await this.getData();
    this.render();
  }
  async getData() {
    const res = await fetch(
      "https://run.mocky.io/v3/af2c5368-8c5d-4c7e-9ced-9e272de09812"
    ); // Replace with your API endpoint
    if (res.ok) {
      const data = await res.json();
      this.percentage = data.percentage || "0";
      this.date = data.date || "";
    }
  }
  render() {
    // if you are passing in the values as HTML attributes then use these lines...
    // const percentage = this.getAttribute("percentage") || "0";
    // const date = this.getAttribute("date") || "";
    // if you are fetching the data from the api then use these lines
    const percentage = this.percentage || "0";
    const date = this.date || "";
    const numericPercentage = parseFloat(percentage);
    const barWidth = isNaN(numericPercentage) ? 5 : numericPercentage;

    this.shadowRoot.innerHTML = `
              <style>
                  /* Styles for the custom component (shadow DOM) */
                  :host {
                      --bubblePosition: calc(${barWidth}% - 20px)
                  }
                  .water-level-container {
                      background-color: #000;
                      color: #fff;
                      padding: 20px;
                      
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      width: fit-content;
                      box-sizing: border-box;
                  }
  
                  .water-level-header {
                      font-size: 1.5em;
                      margin-bottom: 10px;
                      display: flex;
                      gap: 20px;
                      align-items: center;
                      justify-content: space-between;
                  }
                  ::slotted(h3) {
                      margin: 0;
                  }
  
                  .date-pill {
                      background-color: #fff;
                      color: #000;
                      padding: 5px 10px;
                      border-radius: 5px;
                      font-size: 0.8em;
                  }
  
                  .indicator-bar-container {
                      width: 100%;
                      max-width: 600px;
                      height: 40px;
                      background-color: #333;
                      border-radius: 5px;
                      overflow: hidden;
                      position: relative;
                      margin-bottom: 10px;
                      display: flex;
                  }
  
                  .indicator-bar {
                      height: 100%;
                      border-radius: 5px;
                      background-image: linear-gradient(to right,#ff0000 25%,
            #ffcc00 60%,
            #ccff00 70%,
            #00ffcc 80%,
            #00ccff);
                      width: 100%;
                  }
  
                  .indicator-labels {
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                      max-width: 600px;
                      font-size: 0.8em;
                      text-transform: uppercase;
                      color: #ccc;
                      margin-bottom: 5px;
                  }
  
                  .percentage-bubble {
                      position: absolute;
                      left: var(--bubblePosition);
                      top: 7px;
                      background-color: #fff;
                      color: #000;
                      padding: 5px 10px;
                      border-radius: 5px;
                      font-size: 0.9em;
                      white-space: nowrap;
                      transform: translateX(-50%);
                      animation: slide 1s;
                  }
                  @keyframes slide {
                      from {
                          left: -10px;
                      }
                      to {
                          left: var(--bubblePosition);
                      }
                  }
                  ::slotted(a) {
                      font-size: 0.9em;
                      color: #00ccff;
                      text-decoration: none;
                  }
              </style>
              <div class="water-level-container">
                  <div class="water-level-header">
                      <slot name="title"></slot>
                      ${date ? `<span class="date-pill">${date}</span>` : ""}
                  </div>
                  <div class="indicator-labels">
                      <span>Collapse</span>
                      <span>Critical</span>
                      <span>Healthy</span>
                  </div>
                  <div class="indicator-bar-container">
                      <div class="indicator-bar"></div>
                      <div class="percentage-bubble">${percentage}%</div>
                  </div>
                  <slot name="link"></slot>
              </div>
          `;
  }
}

customElements.define("critical-slider", CriticalSlider);
