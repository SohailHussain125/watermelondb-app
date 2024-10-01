import './App.css';
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { database } from './database';

function App() {
  return (
    <DatabaseProvider database={database}>

    <div className="App">
     
    </div>
    </DatabaseProvider>
  );
}

export default App;
