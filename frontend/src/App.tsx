import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Suspense } from 'react';
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Register from "./components/login/Register";
import { Provider } from "react-redux";
import store from "./components/redux/store/store";
import CabApprovalForm from "./components/cab/cab";
import BookingHistory from "./components/booking/booking";
import Requests from "./components/requests/requests";

const Login = React.lazy(()=> import("./components/login/Login"))
const Header = React.lazy(()=> import("./components/core/Header"))

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
      <Suspense fallback = {<h1>Loading...</h1>}>
      <Header />
      <Routes>
        <Route path='/register' Component={Register} />
        <Route path='/login' Component={Login} />
        <Route path='/' Component={Login} />
        <Route path='*' Component={PageNotFound} />
        <Route path="/booking" Component={BookingHistory} />
        <Route path= '/cab' Component={CabApprovalForm} />
        <Route path= '/requests' Component={Requests} />
        </Routes>
        </Suspense>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;