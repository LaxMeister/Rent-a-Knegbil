export default function MyOrders() {
  let user = JSON.parse(sessionStorage.getItem("UserId"));
  var table = document.querySelector(".inactive-table");
  var table2 = document.querySelector(".active-table");
  let myOrders = [];

  setTimeout(() => {
    listOrders();
  }, 800);
  setTimeout(() => {
    listOrders2();
  }, 850);

  fetch("http://localhost:8081/api/v1/onecustomersorders/" + user, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((orders) => {
      //   console.log(orders);
      orders.forEach((order) => {
        myOrders.push(order);
      });
      return MyOrders;
    });

  function listOrders() {
    for (let i = 0; i < myOrders.length; i++) {
      if (user == myOrders[i].customerId && myOrders[i].booked !== true) {
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = myOrders[i].car;
        cell2.innerHTML = myOrders[i].rentDate;
        cell3.innerHTML = myOrders[i].returnDate;
        row.classList.add("old-rows");
        row.id = myOrders[i].id;
        addClickToRowsOldOrder();
      }
    }
  }

  function listOrders2() {
    for (let i = 0; i < myOrders.length; i++) {
      if (user == myOrders[i].customerId && myOrders[i].booked !== false) {
        var row = table2.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = myOrders[i].car;
        cell2.innerHTML = myOrders[i].rentDate;
        cell3.innerHTML = myOrders[i].returnDate;
        row.classList.add("rows");
        row.id = myOrders[i].id;
        console.log(myOrders[i].id);
        addClickToRowsChange();
      }
    }
  }

  function addClickToRowsChange() {
    let getRows = document.getElementsByClassName("rows");
    for (let i = 0; i < getRows.length; i++) {
      var row = getRows[i];
      row.addEventListener("click", clickFunctionChange);
    }
  }

  function addClickToRowsOldOrder() {
    let getRows = document.getElementsByClassName("old-rows");
    for (let i = 0; i < getRows.length; i++) {
      var row = getRows[i];
      row.addEventListener("click", clickFunctionOldOrder);
    }
  }

  function clickFunctionChange() {
    let getNode = event.currentTarget.id;
    let getRows = document.getElementsByClassName("rows");
    for (var i = 0; i < getRows.length; i++) {
      if (getNode == getRows[i].id) {
        sessionStorage.setItem("orderId", getRows[i].id);
        console.log(getRows[i].id);
        fetch("http://localhost:8081/api/v1/orders/" + getRows[i].id, {
          credentials: "include",
        })
          .then((response) => response.json())
          .then((order) => {
            sessionStorage.setItem("carID", order.carId);
          });
        window.location.href = "/ChangeOrder";
      }
    }
  }

  function clickFunctionOldOrder() {
    let getRows = document.getElementsByClassName("old-rows");
    let getNode = event.currentTarget.id;
    for (var i = 0; i < getRows.length; i++) {
      if (getNode == getRows[i].id) {
        console.log("OLD ORDER!");
        sessionStorage.setItem("orderId", getRows[i].id);
        console.log(getRows[i].id);
        fetch("http://localhost:8081/api/v1/orders/" + getRows[i].id, {
          credentials: "include",
        })
          .then((response) => response.json())
          .then((order) => {
            sessionStorage.setItem("carID", order.carId);
          });
        setTimeout(() => {
          getCarDetails();
        }, 100);
      }
    }
  }

  function getCarDetails() {
    let specificCarId = JSON.parse(sessionStorage.getItem("carID"));

    fetch("http://localhost:8081/api/v1/cars/" + specificCarId, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((car) => {
        sessionStorage.setItem("carName", JSON.stringify(car.name));
        sessionStorage.setItem("carModel", JSON.stringify(car.model));
        sessionStorage.setItem("carPrice", JSON.stringify(car.price));
        sessionStorage.setItem("carDetails", JSON.stringify(car.details));
      });
    setTimeout(() => {
      window.location.href = "/OldOrder";
    }, 150);
  }

  return;
}
