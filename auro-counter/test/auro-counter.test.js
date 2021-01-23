import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/auro-counter.js';

describe('auro-counter', () => {
  it('sets the CSS class on auro-counter > div element', async () => {
    const el = await fixture(html`
      <auro-counter cssclass="testClass"></auro-counter>
    `);

    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('auro-counter is accessible', async () => {
    const el = await fixture(html`
      <auro-counter cssclass="testClass"></auro-counter>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-counter custom element is defined', async () => {
    const el = await !!customElements.get("auro-counter");

    await expect(el).to.be.true;
  });
});
