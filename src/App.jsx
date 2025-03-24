import "./App.css";
import Sidebar from "./components/Sidebar";
import WalletGraphPage from "./components/WalletGraphPage";

const App = () => {
  return (
    <main className="hornetContainer">
      <Sidebar />
      <WalletGraphPage />
    </main>
  );
};

export default App;
