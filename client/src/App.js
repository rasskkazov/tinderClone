import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const authToken = cookies.AuthToken;

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                {authToken && (
                    <Route path={"/dashboard"} element={<Dashboard />} />
                )}
                {authToken && (
                    <Route path={"/onboarding"} element={<OnBoarding />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};
export default App;
