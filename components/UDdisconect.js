import UAuth from "@uauth/js"


function UDdis () {
         const uauth = new UAuth ({
  clientID: "db9bc76f-a465-483e-9022-de0bd19ffe95",
  redirectUri: "http://localhost:3000",
  scope: "openid wallet email profile:optional social:optional"
         })

         const login = () => { 
            uauth.loginWithPopup().then((authorization)=>{console.log(authorization)})
         }
         const logout = async () => {await uauth.logout();
          console.log("Logged out with Unstoppable");
        };

        
 return(
  <div id="Loginwithud">
<a className= "dropdown-item active" ><span className="me-1"><i
                                                   onClick={logout} style={{"width":"100px","hight":"50px"}} className="icofont-logout"></i></span>
                                            UD Disconnect</a>
  </div>


 )
}

export default UDdis;