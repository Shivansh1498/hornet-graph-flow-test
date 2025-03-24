import SavePngScreenBtn from "./SavePngScreenBtn";
import ThemeToggleBtn from "./ThemeToggleBtn";
import WalletGraph from "./WalletGraph";

const WalletGraphPage = () => {
  return (
    <section className="walletGraphContainer">
      <header className="walletGraphHeader">
        <ThemeToggleBtn />
        <SavePngScreenBtn />
      </header>
      <WalletGraph />
    </section>
  );
};

export default WalletGraphPage;
