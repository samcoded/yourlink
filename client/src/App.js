import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './pages/Main';
import Header from './pages/nav/Header';
// import Footer from './pages/nav/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';



function App() {
  return (
    <>

      appppp
      {/* <Header /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
