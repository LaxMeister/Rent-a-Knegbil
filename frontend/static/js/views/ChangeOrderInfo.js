export default async function ChangeOrderInfo() {
  let carId = JSON.parse(sessionStorage.getItem("carID"));
  let orderId = JSON.parse(sessionStorage.getItem("orderId"));
  let getCarInfoDetails = document.querySelector(".car-info-details");
  let getCarInfoDetails2 = document.querySelector(".car-info-details2");
  let getCarInfoDetails3 = document.querySelector(".car-info-details3");
  let submitButton = document.querySelector(".submitButton");
  let carName;
  let carModel;

  fetch("http://localhost:8081/api/v1/cars/" + carId, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((car) => {
      carName = car.name;
      carModel = car.model;
      getCarInfoDetails.innerHTML =
        "Märke: " + car.name + " | Modell: " + car.model;
      getCarInfoDetails2.innerHTML = car.details;
      getCarInfoDetails3.innerHTML =
        "Typ: " + car.type + " | Pris: " + car.price + " kr/dygn";
    });

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let url = "http://localhost:8081/api/v1/updateorder";
    let request = new XMLHttpRequest();
    request.onload = function (e) {
      let result = request.response;
      alert("Order: " + carName + " " + carModel + "\nHar avslutats");
      window.location.href = "/orders";
    };
    request.open("PUT", url, true);
    request.withCredentials = true;
    request.responseType = "text";
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(orderId);
    console.log(request.response);
  });

  return;
}
