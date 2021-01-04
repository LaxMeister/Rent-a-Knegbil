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
      <label class="labelRent" for="rentDate">Hyra från:</label>
      <input class="rentDate" type="date" id="rentDate" name="rentDate" value="">
      <label class="labelReturn" for="renturnDate">Återlämnas:</label>
      <input class="returnDate" type="date" id="returnDate" name="returnDate" value="">
      <input class="submitButton" type="submit" value="Hyr">
      
      </form>
  </div>
    </div>
        `;
  }
}
