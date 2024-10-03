import './App.css';
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { database } from './database';
import { AppRoutes } from './routes'
function App() {
  return (
    <DatabaseProvider database={database}>
      <AppRoutes />
    </DatabaseProvider>
  );
}

export default App;
