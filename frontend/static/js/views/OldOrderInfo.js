export default async function ChangeOrderInfo() {
  let carId = JSON.parse(sessionStorage.getItem("carID"));
  let orderId = JSON.parse(sessionStorage.getItem("orderId"));
  let getCarInfoDetails = document.querySelector(".car-info-details");
  let getCarInfoDetails2 = document.querySelector(".car-info-details2");
  let getCarInfoDetails3 = document.querySelector(".car-info-details3");
  let submitButton = document.querySelector(".submitButton");
  let carName = JSON.parse(sessionStorage.getItem("carName"));
  let carModel = JSON.parse(sessionStorage.getItem("carModel"));
  let carDetail = JSON.parse(sessionStorage.getItem("carDetails"));
  let carPrice = JSON.parse(sessionStorage.getItem("carPrice"));
  let carType = JSON.parse(sessionStorage.getItem("carType"));

  getCarInfoDetails.innerHTML = "Märke: " + carName + " | Modell: " + carModel;
  getCarInfoDetails2.innerHTML = carDetail;
  getCarInfoDetails3.innerHTML =
    "Typ: " + carType + " | Pris: " + carPrice + " kr/dygn";

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/orders";
  });

  return;
}
