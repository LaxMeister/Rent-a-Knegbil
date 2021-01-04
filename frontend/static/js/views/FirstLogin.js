export default function FirstLogin() {
  let loginBool = false;
  fetchUser();

  function fetchUser() {
    fetch("http://localhost:8081/api/v1/currentUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((user) => {
        sessionStorage.setItem("UserId", JSON.stringify(user.id));
        sessionStorage.setItem("UserName", JSON.stringify(user.name));
      });
  }

  function redirectToLogin() {
    window.location.href = "http://localhost:8081/login";
  }
}
