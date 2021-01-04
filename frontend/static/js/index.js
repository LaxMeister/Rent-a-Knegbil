import Dashboard from "./views/Dashboard.js";
import Rent from "./views/Rent.js";
import Orders from "./views/Orders.js";
import RentList from "./views/RentList.js";
import RentCar from "./views/RentCar.js";
import RentCarInfo from "./views/RentCarinfo.js";
import FirstLogin from "./views/FirstLogin.js";
import MyOrders from "./views/MyOrders.js";
import ChangeOrder from "./views/ChangeOrder.js";
import ChangeOrderInfo from "./views/ChangeOrderInfo.js";
import OldOrderInfo from "./views/OldOrderInfo.js";
import OldOrder from "./views/OldOrder.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/dashboard", view: Dashboard },
    { path: "/rent", view: Rent },
    { path: "/rentCar", view: RentCar },
    { path: "/orders", view: Orders },
    { path: "/ChangeOrder", view: ChangeOrder },
    { path: "/OldOrder", view: OldOrder },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();

  if (match.result == "/rent") {
    RentList();
  }
  if (match.result == "/rentCar") {
    RentCarInfo();
  }
  if (match.result == "/" || match.result == "/dashboard") {
    FirstLogin();
  }
  if (match.result == "/orders") {
    MyOrders();
  }
  if (match.result == "/ChangeOrder") {
    ChangeOrderInfo();
  }
  if (match.result == "/OldOrder") {
    OldOrderInfo();
  }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
