// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If use litElement base class
import { LitElement, html, css } from "lit-element";
import "@alaskaairux/auro-button";

// If using auroElement base class
// See instructions for importing auroElement base class https://git.io/JULq4
// import { html, css } from "lit-element";
// import AuroElement from '@alaskaairux/webcorestylesheets/dist/auroElement/auroElement';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * auro-counter provides users a way to ...
 *
 * @attr {String} cssClass - Applies designated CSS class to DOM element.
 */

// build the component class
class AuroCounter extends LitElement {
  constructor() {
    super();
    this.currentValue = 0;
    this.minValue = null;
    this.maxValue = null;
    this.udKeys = false;
    this.lrKeys = false;
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      // ...super.properties,
      cssClass:   { type: String },
      currentValue: { type: Number },
      minValue: { type: Number },
      maxValue: { type: Number },
      // Up & Down arrow key support
      udKeys: { type: Boolean },
      // Left & Right arrow key support
      lrKeys: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class=${this.cssClass}>
        <auro-button
          ?disabled="${this.currentValue === this.minValue}"
          @click="${this.decrement}"
        >
          -
        </auro-button>
        ${this.currentValue}
        <auro-button
          ?disabled="${this.currentValue === this.maxValue}"
          @click="${this.increment}"
        >
          +
        </auro-button>
        <slot></slot>
      </div>
    `;
  }

  decrement() {
    if (this.minValue !== null && this.currentValue > this.minValue) {
      this.currentValue -= 1;
    }
  }

  increment() {
    if (this.maxValue !== null && this.currentValue < this.maxValue) {
      this.currentValue += 1;
    }
  }

  handleArrowKey(key) {
    if (key === 'ArrowUp' || key === 'ArrowRight') {
      this.increment();
    }

    if (key === 'ArrowDown' || key === 'ArrowLeft') {
      this.decrement();
    }
  }

  firstUpdated() {
    // Monitor keyboard events only if we need to
    if (this.udKeys || this.lrKeys) {
      window.addEventListener("keydown", (event) => {
        // Process only arrow keys
        const minIndex = 0;

        if ([
          'ArrowUp',
          'ArrowDown'
        ].indexOf(event.key) >= minIndex && this.udKeys) {
          event.preventDefault();
          this.handleArrowKey(event.key);
        }

        if ([
          'ArrowLeft',
          'ArrowRight'
        ].indexOf(event.key) >= minIndex && this.lrKeys) {
          event.preventDefault();
          this.handleArrowKey(event.key);
        }
      });
    }
  }

  /*
    Testable requirements
    1. COMPLETE Init with a current value of 0
      a. COMPLETE expand by allowing a custom starting current value
      b. COMPLETE expand to support a min and max value
        This could be used to prevent negative number or otherwise
        constrain the bounds (e.g. don't add more to a shopping cart
        than items that exist in inventory))
    2. Enable keyboard support
      a. COMPLETE Up/Down arrow keys make sense
      b. COMPLETE Perhaps enable left/right arrow keys optional
      c. COMPLETE in practice should keyboard events only happen based on state?
        e.g. perhaps the count is actually in a input or other focusable
        element. Then have arrow keys increment only while the count has focus.
        This would likely be necessary to account of keyboard navigation of
        the overall web page the component is implemented on
      d. What about keyboard support via "tab" to the buttons and then
        activating the click event via the space bar or enter key?
      e. Clean UI should account for the buttons not moving location as
        the current value increases. e.g. 100 is wider rendered then 1
        and without good framing the content to the right of the current
        value (the button in this particular case) would jump as the
        current value changes.
      f. COMPLETE Since I support passing in a custom starting value I need to
        also make sure that the custom value is within the bounds of
        the minValue and maxValue if they exist. Implementation question
        would be if outside the bounds, what do we do? e.g. min 1 max 10
        and a starting value declared of 12. Im going start with the
        working assumption that if below min we set current to min.
        if greater than max we set current to max.
  */
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-counter")) {
  customElements.define("auro-counter", AuroCounter);
}
