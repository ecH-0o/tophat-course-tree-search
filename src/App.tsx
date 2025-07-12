import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import CourseSearch from './pages/CourseSearch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CourseSearch mode="default" />} />
      <Route path="/styled" element={<CourseSearch mode="styled" />} />
    </Routes>
  );
}

export default App;
