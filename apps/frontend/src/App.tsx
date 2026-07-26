import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./pages/Register"
import ProtectedRouter from "./middleware/ProtectedRouter";
import { CodeEditor } from "./pages/CodeEditor";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";

const App = ()=>{
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/join" element={<Register/>}/>
        <Route path="/:roomId" element={<Register />} />
        <Route path="/code/:roomId" element = {<ProtectedRouter><CodeEditor/></ProtectedRouter>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
