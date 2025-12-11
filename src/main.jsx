import {BrowserRouter , Routes , Route} from 'react-router-dom';
import './index.css'
import ReactDOM from 'react-dom/client';
import {Home} from './pages/home';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
           <Route path='/' element={Home} /> 
        </Routes>   
    </BrowserRouter>
)
