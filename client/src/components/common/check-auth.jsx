import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  //case1 if userwant to aceess home page but user not authenticated then nagigate to login otherwise check the role is admin then navigate to dashboard and otherwise shopHome
  if (location.pathname == "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }


  //case2
  //iff not authentticated and not regiseter and login it forcbly sent to login and register 
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }
  //case2

  //case3
  //check role if it is admin than  it navigate to dashboard otherwise shoppingHome
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }



  //case4
  //if authenticated but role will not admin and forcibly it want to take admin then unauth page is acccess
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }


  //case5 if user is authenticated it check role of it if the role is admin and it forccily want to access shop then it will navigate tp dashboard
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>
    {children}</>;
}

export default CheckAuth;