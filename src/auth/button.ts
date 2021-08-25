import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import './auth.scss';

@customElement('auth-button')
export default class AuthButton extends LitElement {

  @property({type: Boolean}) opened = false;

  protected render() {
    return html`
    <button class="btn btn-default btn-lit-element" @click=${this.clickHandler}
      data-toggle="tooltip" data-placement="left" data-original-title="'Lit-Element'">
      <span class="fas fa-users"></span>
    </button>
    `;
  }
  // Disable shadow DOM
  protected createRenderRoot() {
    return this;
  }

  clickHandler() {
    this.opened = !this.opened
    console.log(this.opened);
  }
}
