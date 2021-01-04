import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Rent a Knegbil - Hyr bil");
  }

  async getHtml() {
    return `
        <div class="lager">
        <section class="darker"></section>
      </div>
      <div class="list-container" id="list-container">
      <div class="titlebox">
          <h1>Hyr bil</h1>
      </div>
        </div>
        
        
        `;
  }
}
