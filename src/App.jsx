import "./App.css";
import Sidebar from "./components/Sidebar";
import WalletGraph from "./components/WalletGraph";

const App = () => {
  return (
    <main className="hornetContainer">
      <Sidebar />
      <WalletGraph />
    </main>
  );
};

export default App;
