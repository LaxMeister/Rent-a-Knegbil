import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Rent a Knegbil");
  }

  async getHtml() {
    return `
    <div class="lager">
    <section class="darker"></section>
  </div>
  <div class="list-container" id="list-container">
  <div class="car-info">
      <h2 class="car-info-details"></h2>
      <hr class="hrLine2">
      <h2 class="car-info-details2"></h2>
      <hr class="hrLine2">
      <h2 class="car-info-details3"></h2>
      <form class="rentForm">
      <input class="submitButton" type="submit" value="Avsluta order">
      
      </form>
  </div>
    </div>
        `;
  }
}
