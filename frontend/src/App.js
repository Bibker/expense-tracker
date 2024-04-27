import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import React, { useMemo, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Incomes/Income";
import Expenses from "./Components/Expenses/Expenses";
import { GlobalProvider, useGlobalContext } from "./Context/globalContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/signup";
import ForgetPassword from "./Components/Forget-Password/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled
      bg={bg}
      className='App'
    >
      {orbMemo}
      <MainLayout>
        <Router>
          <GlobalProvider>
            <Navigation
              active={active}
              setActive={setActive}
            />
            <div className='main'>
              <Routes>
                <Route
                  path='/'
                  element={<Login />}
                />
                <Route
                  path='/login'
                  element={<Login />}
                />
                <Route
                  path='/signup'
                  element={<Signup />}
                />
                <Route
                  path='/forget-password'
                  element={<ForgetPassword />}
                />
                <Route
                  path='/reset-password'
                  element={<ResetPassword />}
                />
                <Route
                  path='/dashboard'
                  element={<Dashboard />}
                />
                <Route
                  path='/income'
                  element={<Income />}
                />
                <Route
                  path='/expense'
                  element={<Expenses />}
                />
              </Routes>
            </div>
          </GlobalProvider>
        </Router>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  .main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px, solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
