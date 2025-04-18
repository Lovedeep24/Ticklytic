import './App.css'
// import Ab from './pages2/Ab'
// import Login2 from './pages2/Login2'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MediaStreamProvider } from "./Context/MediaStreamContext";
// import {MediaStreamProvider} from './'
// import ProtectedRoute from './ProtectedRoute';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import Results from './pages/Results';
import Permissions from './pages/Permissions1';
import AdminPortal from './pages/AdminPortal';
import AddQuestion from './pages/AddQuestion';
import Submissions from './pages/Submissions';
import TestCluster from './pages/TestCluster';
import CreateTest from './pages/CreateTest';
import AdminTestPage from './pages/AdminTestPage';
function App() {

  return (
    <MediaStreamProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/addquestions" element={<AddQuestion />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/createTest" element={<CreateTest/>} />
          <Route path="/testCluster" element={<AdminTestPage/>} />
          <Route path="/result" element={<Results />} />
          <Route path="/test/:testId" element={<Test />} />
          <Route path="/tests" element={<TestCluster />} />
     
        </Routes>
      </Router>
    </MediaStreamProvider>

  )
}

export default App
