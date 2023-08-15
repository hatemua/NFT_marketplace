import UAuth from "@uauth/js";
import Callback from "./callback";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function LoginUD() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const uauth = new UAuth({
    clientID: "db9bc76f-a465-483e-9022-de0bd19ffe95",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet email profile:optional social:optional",
  });

  const login = () => {
    uauth.loginWithPopup().then((authorization) => {
      console.log(authorization);
      alert("Signed in successfully");
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    });
  };

  const logout = () => {
    uauth.logout();
    setIsLoggedIn(false);
    alert("logged out successfully");
    localStorage.setItem("isLoggedIn", "false");
    router.push("/");
  };

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (
      window.ethereum &&
      window.ethereum?.selectedAddress &&
      storedLoginStatus === "true"
    ) {
      setIsLoggedIn(true);
      // router.push("/");
    }
    // else {
    //   setIsLoggedIn(false);
    // }
  }, []);

  const router = useRouter();

  return (
    <div id="Loginwithud">
      {!isLoggedIn && (
        <button
          className="default-btn small-btn move-right"
          onClick={login}
          style={{ width: "100px", height: "50px" }}
        >
          Sign in
        </button>
      )}
      {isLoggedIn && (
        <button
          className="default-btn small-btn move-right m-2"
          onClick={logout}
          style={{ width: "100px", height: "50px" }}
        >
          Log out
        </button>
      )}
    </div>
  );
}

export default LoginUD;
