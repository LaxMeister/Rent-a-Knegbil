export default async function RentList() {
  let Bool = false;
  const rootDiv = document.querySelector(".list-container");
  let btnDiv = document.createElement("div");
  btnDiv.classList.add("btnDiv");
  let sortBtn = document.createElement("button");
  sortBtn.classList.add("sortbtn");
  sortBtn.innerHTML = "Sortera märke";
  sortBtn.onclick = () => sortName();
  let sortBtn2 = document.createElement("button");
  sortBtn2.classList.add("sortbtn2");
  sortBtn2.innerHTML = "Sortera Typ";
  sortBtn2.onclick = () => sortType();
  btnDiv.appendChild(sortBtn);
  btnDiv.appendChild(sortBtn2);
  rootDiv.appendChild(btnDiv);
  let myCars = [];
  fetch("http://localhost:8081/api/v1/cars", { credentials: "include" })
    .then((response) => response.json())
    .then((cars) => {
      // console.log(cars);
      const carList = document.createElement("ul");
      carList.classList.add("carList");
      cars.forEach((car) => {
        myCars.push(car);
        // console.log("MyCars: " + myCars);
        if (car.booked !== true) {
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
            " Typ: " +
            car.type +
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
                "Typ: " +
                myCars[getNodeID - 1].type +
                " | Pris: " +
                myCars[getNodeID - 1].price +
                " kr/dygn";
              modalRentBtn.onclick = () => fromModalGoToRentCar();
              displayModal();
            } else {
              console.log("no hello for u");
            }
          }
        }
      });
    });

  console.log(myCars);

  let modal = document.createElement("div");
  modal.classList.add("modal");
  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  let modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  let modalHeaderH2 = document.createElement("H2");
  modalHeaderH2.classList.add("header-h2");

  modalHeader.appendChild(modalHeaderH2);
  let modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  let insideModalBody = document.createElement("p");
  insideModalBody.classList.add("modal-body-p");
  modalBody.appendChild(insideModalBody);
  let hrLine = document.createElement("hr");
  hrLine.classList.add("hrLine");
  let insideModalBody2 = document.createElement("p");
  insideModalBody2.classList.add("modal-body-p2");
  let modalRentBtn = document.createElement("button");
  modalRentBtn.classList.add("modalRentBtn");
  modalRentBtn.innerHTML = "Hyr";

  let modalCloseBtn = document.createElement("button");
  modalCloseBtn.classList.add("modalCloseBtn");
  modalCloseBtn.innerHTML = "Stäng";
  modalCloseBtn.onclick = () => closeModal();
  modalBody.appendChild(hrLine);
  modalBody.appendChild(insideModalBody2);
  modalBody.appendChild(modalRentBtn);
  modalBody.appendChild(modalCloseBtn);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);
  rootDiv.appendChild(modal);

  // Get the modal
  let myModal = document.querySelector(".modal");

  // Get the button that opens the modal
  let btn = document.querySelector("modalCloseBtn");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  function displayModal() {
    let getNodeID = event.currentTarget.parentNode.id;
    if (getNodeID == myCars[getNodeID - 1].id) {
      sessionStorage.setItem("carID", JSON.stringify(myCars[getNodeID - 1].id));
      sessionStorage.setItem(
        "carName",
        JSON.stringify(myCars[getNodeID - 1].name)
      );
      sessionStorage.setItem(
        "carModel",
        JSON.stringify(myCars[getNodeID - 1].model)
      );
      sessionStorage.setItem(
        "carPrice",
        JSON.stringify(myCars[getNodeID - 1].price)
      );
      sessionStorage.setItem(
        "carDetails",
        JSON.stringify(myCars[getNodeID - 1].details)
      );
      sessionStorage.setItem(
        "carType",
        JSON.stringify(myCars[getNodeID - 1].type)
      );
      myModal.style.display = "block";
    }
  }

  // sortBtn.addEventListener("click", displayModal);

  // // When the user clicks on <span> (x), close the modal
  function closeModal() {
    myModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      myModal.style.display = "none";
    }
  };

  function fromModalGoToRentCar() {
    // closeModal();
    window.location.href = "/rentCar";
  }

  function rentCar() {
    let getNodeID = event.currentTarget.parentNode.id;
    if (getNodeID == myCars[getNodeID - 1].id) {
      sessionStorage.setItem("carID", JSON.stringify(myCars[getNodeID - 1].id));
      sessionStorage.setItem(
        "carName",
        JSON.stringify(myCars[getNodeID - 1].name)
      );
      sessionStorage.setItem(
        "carModel",
        JSON.stringify(myCars[getNodeID - 1].model)
      );
      sessionStorage.setItem(
        "carPrice",
        JSON.stringify(myCars[getNodeID - 1].price)
      );
      sessionStorage.setItem(
        "carDetails",
        JSON.stringify(myCars[getNodeID - 1].details)
      );
      sessionStorage.setItem(
        "carType",
        JSON.stringify(myCars[getNodeID - 1].type)
      );
      window.location.href = "/rentCar";
    }
  }

  function sortName() {
    if (Bool !== true) {
      sortListA();
      Bool = true;
    } else {
      sortListB();
      Bool = false;
    }
  }

  function sortType() {
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
            " Typ: " +
            car.type +
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
                "Typ: " +
                myCars[getNodeID - 1].type +
                " | Pris: " +
                myCars[getNodeID - 1].price +
                " kr/dygn";
              modalRentBtn.onclick = () => fromModalGoToRentCar();
              displayModal();
            } else {
              console.log("no hello for u");
            }
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
            " Typ: " +
            car.type +
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
                "Typ: " +
                myCars[getNodeID - 1].type +
                " | Pris: " +
                myCars[getNodeID - 1].price +
                " kr/dygn";
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
        cars.sort((a, b) => a.type.localeCompare(b.type));
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
            " Typ: " +
            car.type +
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
                "Typ: " +
                myCars[getNodeID - 1].type +
                " | Pris: " +
                myCars[getNodeID - 1].price +
                " kr/dygn";
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
        cars.sort((a, b) => b.type.localeCompare(a.type));
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
            " Typ: " +
            car.type +
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
                "Typ: " +
                myCars[getNodeID - 1].type +
                " | Pris: " +
                myCars[getNodeID - 1].price +
                " kr/dygn";
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
