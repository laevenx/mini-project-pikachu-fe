import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { Button } from "antd";

import List from "./pages/List";

import Mypoke from "./pages/MyPoke";


function App() {

  return (
    <Router>
      <header>
        <div style={{ backgroundColor: "#6fa3f7", paddingTop: 15 }}>
           <Link to="/list"> <Button>List</Button></Link>
           <Link to="/Mypoke"> <Button>myPoke</Button></Link>
        </div>
      </header>
      
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/list" element={<List />} />
        <Route path="/detail/:name" element={<Detail />} />
        <Route path="/Mypoke" element={<Mypoke />} />
      
    </Routes>
    </Router>
  );
}

export default App;
