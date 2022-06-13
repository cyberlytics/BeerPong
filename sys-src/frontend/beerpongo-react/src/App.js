import './App.css';
import GameMenu from './components/GameMenu';
import GamePage from "./components/GamePage";
import {Route, Routes} from "react-router-dom";


function App() {
  return (
      <Routes>
          <Route exact path='/' element={<GameMenu/>}>
          </Route>
          <Route exact path='/game/:id' element={<GamePage/>}>
          </Route>
      </Routes>
  );
}

export default App;
