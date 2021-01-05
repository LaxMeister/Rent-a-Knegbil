export default async function RentCarInfo() {
  let getCarInfoDetails = document.querySelector(".car-info-details");
  let getCarInfoDetails2 = document.querySelector(".car-info-details2");
  let getCarInfoDetails3 = document.querySelector(".car-info-details3");

  let carId = sessionStorage.getItem("carID");
  let carName = JSON.parse(sessionStorage.getItem("carName"));
  let carModel = JSON.parse(sessionStorage.getItem("carModel"));
  let carDetails = JSON.parse(sessionStorage.getItem("carDetails"));
  let carPrice = JSON.parse(sessionStorage.getItem("carPrice"));
  let carType = JSON.parse(sessionStorage.getItem("carType"));
  getCarInfoDetails.innerHTML = "Märke: " + carName + " | Modell: " + carModel;
  getCarInfoDetails2.innerHTML = carDetails;
  getCarInfoDetails3.innerHTML =
    "Typ: " + carType + " | Pris: " + carPrice + " kr/dygn";

  let RentBtn = document.querySelector(".submitButton");

  RentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let rentDate = document.querySelector(".rentDate").value;
    let returnDate = document.querySelector(".returnDate").value;
    let user = JSON.parse(sessionStorage.getItem("UserId"));
    let rent = rentDate + returnDate;

    console.log(user + carId);
    let url = "http://localhost:8081/api/v1/ordercar/" + user + carId;
    let request = new XMLHttpRequest();
    request.onload = function (e) {
      let result = request.response;
      alert(
        "Du har hyrt: " +
          carName +
          " " +
          carModel +
          "\nUthyrningsdatum: " +
          rentDate +
          "\nÅterlämningsdatum: " +
          returnDate
      );
      window.location.href = "/rent";
    };
    request.open("POST", url, true);
    request.withCredentials = true;
    request.responseType = "text";
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(rent);
    console.log(request.response);
  });

  return;
}
