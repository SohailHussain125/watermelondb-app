import './App.css';
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { database } from './database';
import { AppRoutes } from './routes';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <DatabaseProvider database={database}>
      <SnackbarProvider maxSnack={3}>
        <AppRoutes />
      </SnackbarProvider>
    </DatabaseProvider>
  );
}

export default App;
