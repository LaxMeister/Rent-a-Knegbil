export default async function SortCarsByName() {
  let sortBtn = document.querySelector(".sortbtn");
  let sortBtn2 = document.querySelector(".sortbtn2");
  let rootDiv = document.querySelector(".list-container");
  let Bool = false;
  let myCars = [];
  sortBtn.addEventListener("click", () => {
    sortName();
  });
  sortBtn2.addEventListener("click", () => {
    sortModel();
  });

  function sortName() {
    if (Bool !== true) {
      sortListA();
      Bool = true;
    } else {
      sortListB();
      Bool = false;
    }
  }

  function sortModel() {
    if (Bool !== true) {
      sortListC();
      Bool = true;
    } else {
      sortListD();
      Bool = false;
    }
  }

  function sortListA() {
    let carList = document.querySelector(".carList");

    while (carList.firstChild) carList.removeChild(carList.firstChild);
    let myCars2 = [];
    fetch("http://localhost:8081/api/v1/cars", { credentials: "include" })
      .then((response) => response.json())
      .then((cars) => {
        cars.sort((a, b) => a.name.localeCompare(b.name));
        cars.forEach((car) => {
          myCars2.push(car);
          const carDiv = document.createElement("div");
          carDiv.id = car.id;
          carDiv.classList.add("Cars");
          carDiv.setAttribute("value", car.name);
          // carDiv.setAttribute("value", car.id);
          const newCar = document.createElement("li");
          newCar.append(car);
          newCar.innerText =
            "Märke: " +
            car.name +
            " | " +
            "Model: " +
            car.model +
            " | " +
            "Pris: " +
            car.price +
            " kr/dygn";
          newCar.classList.add(car.name + "-" + car.model);
          let rentBtn = document.createElement("button");
          rentBtn.classList.add("rentBtn");
          rentBtn.innerHTML = "Hyr";
          rentBtn.onclick = () => rentCar();
          let detailsBtn = document.createElement("button");
          detailsBtn.classList.add("detailsBtn");
          detailsBtn.innerHTML = "Detaljer";
          detailsBtn.onclick = () => SelectDiv();
          carDiv.appendChild(newCar);
          carDiv.appendChild(rentBtn);
          carDiv.appendChild(detailsBtn);
          carList.appendChild(carDiv);
          rootDiv.appendChild(carList);
          console.log("CARS AFTER SORT: " + car.name);

          function SelectDiv() {
            // console.log("CAR ID: " + myCars2.id);
            let getNodeID = event.currentTarget.parentNode.id;
            // console.log(
            //   "CAR ID: " + car[getNodeID - 1].id + " | NODE ID: " + getNodeID
            // );
            // if (getNodeID == myCars[getNodeID - 1].id) {
            //   modalHeaderH2.innerText =
            //     myCars[getNodeID - 1].name +
            //     " | " +
            //     myCars[getNodeID - 1].model;
            //   insideModalBody.innerText = myCars[getNodeID - 1].details;
            //   insideModalBody2.innerText =
            //     " Pris: " + myCars[getNodeID - 1].price + " kr/dygn";
            //   modalRentBtn.onclick = () => fromModalGoToRentCar();
            //   displayModal();
            // } else {
            //   console.log("no hello for u");
            // }
          }
        });
      });
  }

  function sortListB() {
    let carList = document.querySelector(".carList");

    while (carList.firstChild) carList.removeChild(carList.firstChild);

    fetch("http://localhost:8081/api/v1/cars", { credentials: "include" })
      .then((response) => response.json())
      .then((cars) => {
        cars.sort((a, b) => b.name.localeCompare(a.name));
        cars.forEach((car) => {
          // myCars2.push(car);
          const carDiv = document.createElement("div");
          carDiv.id = car.id;
          carDiv.classList.add("Cars");
          carDiv.setAttribute("value", car.name);
          // carDiv.setAttribute("value", car.id);
          const newCar = document.createElement("li");
          newCar.append(car);
          newCar.innerText =
            "Märke: " +
            car.name +
            " | " +
            "Model: " +
            car.model +
            " | " +
            "Pris: " +
            car.price +
            " kr/dygn";
          newCar.classList.add(car.name + "-" + car.model);
          let rentBtn = document.createElement("button");
          rentBtn.classList.add("rentBtn");
          rentBtn.innerHTML = "Hyr";
          rentBtn.onclick = () => rentCar();
          let detailsBtn = document.createElement("button");
          detailsBtn.classList.add("detailsBtn");
          detailsBtn.innerHTML = "Detaljer";
          detailsBtn.onclick = () => SelectDiv();
          carDiv.appendChild(newCar);
          carDiv.appendChild(rentBtn);
          carDiv.appendChild(detailsBtn);
          carList.appendChild(carDiv);
          rootDiv.appendChild(carList);

          function SelectDiv() {
            let getNodeID = event.currentTarget.parentNode.id;
            console.log(
              "CAR ID: " + myCars[getNodeID - 1].id + " | NODE ID: " + getNodeID
            );
            if (getNodeID == myCars[getNodeID - 1].id) {
              modalHeaderH2.innerText =
                myCars[getNodeID - 1].name +
                " | " +
                myCars[getNodeID - 1].model;
              insideModalBody.innerText = myCars[getNodeID - 1].details;
              insideModalBody2.innerText =
                " Pris: " + myCars[getNodeID - 1].price + " kr/dygn";
              modalRentBtn.onclick = () => fromModalGoToRentCar();
              displayModal();
            } else {
              console.log("no hello for u");
            }
          }
        });
      });
  }

  function sortListC() {
    let carList = document.querySelector(".carList");

    while (carList.firstChild) carList.removeChild(carList.firstChild);

    fetch("http://localhost:8081/api/v1/cars", { credentials: "include" })
      .then((response) => response.json())
      .then((cars) => {
        cars.sort((a, b) => a.model.localeCompare(b.model));
        cars.forEach((car) => {
          // myCars2.push(car);
          const carDiv = document.createElement("div");
          carDiv.id = car.id;
          carDiv.classList.add("Cars");
          carDiv.setAttribute("value", car.name);
          const newCar = document.createElement("li");
          newCar.append(car);
          newCar.innerText =
            "Märke: " +
            car.name +
            " | " +
            "Model: " +
            car.model +
            " | " +
            "Pris: " +
            car.price +
            " kr/dygn";
          newCar.classList.add(car.name + "-" + car.model);
          let rentBtn = document.createElement("button");
          rentBtn.classList.add("rentBtn");
          rentBtn.innerHTML = "Hyr";
          rentBtn.onclick = () => rentCar();
          let detailsBtn = document.createElement("button");
          detailsBtn.classList.add("detailsBtn");
          detailsBtn.innerHTML = "Detaljer";
          detailsBtn.onclick = () => SelectDiv();
          carDiv.appendChild(newCar);
          carDiv.appendChild(rentBtn);
          carDiv.appendChild(detailsBtn);
          carList.appendChild(carDiv);
          rootDiv.appendChild(carList);

          function SelectDiv() {
            let getNodeID = event.currentTarget.parentNode.id;
            // console.log(
            //   "CAR ID: " + myCars[getNodeID - 1].id + " | NODE ID: " + getNodeID
            // );
            if (getNodeID == myCars[getNodeID - 1].id) {
              modalHeaderH2.innerText =
                myCars[getNodeID - 1].name +
                " | " +
                myCars[getNodeID - 1].model;
              insideModalBody.innerText = myCars[getNodeID - 1].details;
              insideModalBody2.innerText =
                " Pris: " + myCars[getNodeID - 1].price + " kr/dygn";
              modalRentBtn.onclick = () => fromModalGoToRentCar();
              displayModal();
            } else {
              console.log("no hello for u");
            }
          }
        });
      });
  }

  function sortListD() {
    let carList = document.querySelector(".carList");

    while (carList.firstChild) carList.removeChild(carList.firstChild);

    fetch("http://localhost:8081/api/v1/cars", { credentials: "include" })
      .then((response) => response.json())
      .then((cars) => {
        cars.sort((a, b) => b.model.localeCompare(a.model));
        cars.forEach((car) => {
          const carDiv = document.createElement("div");
          carDiv.id = car.id;
          carDiv.classList.add("Cars");
          carDiv.setAttribute("value", car.name);
          const newCar = document.createElement("li");
          newCar.append(car);
          newCar.innerText =
            "Märke: " +
            car.name +
            " | " +
            "Model: " +
            car.model +
            " | " +
            "Pris: " +
            car.price +
            " kr/dygn";
          newCar.classList.add(car.name + "-" + car.model);
          let rentBtn = document.createElement("button");
          rentBtn.classList.add("rentBtn");
          rentBtn.innerHTML = "Hyr";
          rentBtn.onclick = () => rentCar();
          let detailsBtn = document.createElement("button");
          detailsBtn.classList.add("detailsBtn");
          detailsBtn.innerHTML = "Detaljer";
          detailsBtn.onclick = () => SelectDiv();
          carDiv.appendChild(newCar);
          carDiv.appendChild(rentBtn);
          carDiv.appendChild(detailsBtn);
          carList.appendChild(carDiv);
          rootDiv.appendChild(carList);

          function SelectDiv() {
            let getNodeID = event.currentTarget.parentNode.id;
            console.log(
              "CAR ID: " + myCars[getNodeID - 1].id + " | NODE ID: " + getNodeID
            );
            if (getNodeID == myCars[getNodeID - 1].id) {
              modalHeaderH2.innerText =
                myCars[getNodeID - 1].name +
                " | " +
                myCars[getNodeID - 1].model;
              insideModalBody.innerText = myCars[getNodeID - 1].details;
              insideModalBody2.innerText =
                " Pris: " + myCars[getNodeID - 1].price + " kr/dygn";
              modalRentBtn.onclick = () => fromModalGoToRentCar();
              displayModal();
            } else {
              console.log("no hello for u");
            }
          }
        });
      });
  }

  return;
}
