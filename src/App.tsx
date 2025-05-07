import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppProvider';
import Dashboard from './features/dashboard/Dashboard';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Additional routes can be added here as the application grows */}
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
