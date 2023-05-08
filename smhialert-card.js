import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class SmhiAlertCard extends LitElement {
  static get styles() {
    return css`
      ha-card {
        padding: 16px;
      }
      .box {
        padding: 5px;
        box-shadow: 1px 1px 1px 1px #222222;
      }
      .district {
        font-size: large;
        text-decoration: underline;
        margin-top: 10px;
      }
      .header {
        @apply --paper-font-headline;
        color: var(--primary-text-color);
        padding: 4px 0 12px;
        line-height: 40px;
      }
      .msg {
        font-size: small;
        margin-top: 10px;
        border: 1px;
        border-style: dotted;
        line-height: 17px;
      }
      .noalerts {
        font-size: small;
        margin-top: 10px;
      }
      a {
        color: #FFFFFF;
      }
    `;
  }
  render() {
      return html`
      <ha-card>
        <div class="header">
          <div class="name">
            ${this.displayName()}
          </div>
          ${this._hasNoMessages(this.stateObj.attributes.messages) ? html`<span class="noalerts">Inga varningar.</span>` : html``}
          ${this.stateObj.attributes.messages.map(item => html`
            <div class="box">
              <div><span class="district">${item.area}</span></div>
                <div class="msg" style="color: {${item.event_color}};">
                    <span><b>Varning</b>: ${item.event}<span><br>
                    <span><b>Nivå</b>: ${item.severity}<span><br>
                    <span><b>Period</b>: ${this.timestamp_local(item.start)} - ${this.timestamp_local(item.end)}</span><br>
                </div>
            </div>
          `)}
        </div>
      </ha-card>
      `;
  }

  static get properties() {
      return {
          _hass: Object,
          _config: Object,
          _stateObj: Object,
          _error: String,
          _test: Array
      }
  }

  _hasNoMessages(x) {
      if (x.length > 0) {
          return false;
      }
      return true;
  }

  setConfig(config) {
      this._config = config;
  }

  set hass(hass) {
      this._hass = hass;
      this.stateObj = hass.states[this._config.entity];
  }

  displayName() {
    return this._config.name || this._config.title || this.stateObj.attributes.friendly_name;
  }

  timestamp_local(date) {
      return new Date(date).toLocaleString();
  }

  stopPropagation(e) {
      e.stopPropagation();
  }

}

customElements.define('smhialert-card', SmhiAlertCard);
