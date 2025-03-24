import SavePngScreenBtn from "./SavePngScreenBtn";
import ThemeToggleBtn from "./ThemeToggleBtn";

const WalletGraph = () => {
  return (
    <section className="walletGraphContainer">
      <header className="walletGraphHeader">
        <ThemeToggleBtn />
        <SavePngScreenBtn />
      </header>
      <h1>Wallet Graph</h1>
    </section>
  );
};

export default WalletGraph;
