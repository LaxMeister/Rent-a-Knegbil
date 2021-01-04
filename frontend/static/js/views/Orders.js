import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Settings");
  }

  async getHtml() {
    return `
        <div class="lager">
        <section class="darker"></section>
      </div>
      <div class="order-container" id="order-container">
      <div class="titlebox-order">
          <h1>Mina ordrar</h1>
      </div>
      <div class="table-container" id="table-container">
      <div class="inactive-orders">
      <h2>Inaktiva ordrar</h2>
      <table class="inactive-table">
      <thead>
      <tr>
      <th class = "th1">Bil</th>
      <th class = "th3">Datum uthyrning</th>
      <th class = "th2">Datum återlämnad</th>
      </tr>
      </thead>
      <tbody class="tbody">
      </tbody>
      </table>
      </div>
      <div class="active-orders">
      <h2>Aktiva ordrar</h2>
      <table class="active-table">
      <thead>
      <tr>
      <th class = "th1">Bil</th>
      <th class = "th3">Datum uthyrning</th>
      <th class = "th2">Datum återlämnad</th>
      </tr>
      </thead>
      <tbody>
      </tbody>
      </table>
      </div>
      </div>
        </div>
        `;
  }
}
