import './App.css';
import HelperRouters from './routes/HelperRoutes';
import { gapi } from "gapi-script";

function App() {
/*
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "235018902178-9792lbks00l0ul7l2rufr4re2jcsnkos.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });*/

  return (
    <div className="App">
      <HelperRouters/>
    </div>
  );
}

export default App;
