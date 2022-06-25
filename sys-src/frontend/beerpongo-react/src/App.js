import './App.css';
import GameMenu from './components/GameMenu';
import GamePage from "./components/GamePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserContext} from "./context/UserContext";
import {useState} from "react";


function App() {
    const [userID, setUserID] = useState(0);
    const value = {userID, setUserID};
    return (
      <UserContext.Provider value={value}>
          <BrowserRouter>
                <Routes>
                      <Route exact path='/' element={<GameMenu/>}/>
                      <Route exact path='/game/:id' element={<GamePage/>}/>
                </Routes>
          </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
