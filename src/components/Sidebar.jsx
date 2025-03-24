import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetWalletTransactionsQuery } from "../store/apis/walletAddressApi";
import { resetGraph, setGraphData } from "../store/slices/walletGraphSlice";

const Sidebar = () => {
  const [isInflow, setIsInflow] = useState(true);
  const [walletAddress, setWalletAddress] = useState(
    "bc1q6nxdnz58kexp48sm2t3scwqcw9stt7r8s7uuwn"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const dispatch = useDispatch();

  const [getWalletData, { data, isFetching, error, reset }] =
    useLazyGetWalletTransactionsQuery();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!walletAddress.trim()) return;

    reset();
    dispatch(resetGraph());
    getWalletData(walletAddress);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth > 900) setIsSidebarOpen(false); // Ensure sidebar stays open on larger screens
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (data?.txs) {
      dispatch(setGraphData(data.txs));
    }
  }, [data, dispatch]);

  const transactions = data?.txs || [];

  const inflows = transactions.flatMap((tx) =>
    tx.out.map((output) => ({
      wallet: tx.inputs[0]?.prev_out?.addr || "Unknown",
      amount: output.value / 1e8,
    }))
  );

  const outflows = transactions.flatMap((tx) =>
    tx.inputs.map((input) => ({
      wallet: tx.out[0]?.addr || "Unknown",
      amount: input.prev_out.value / 1e8,
    }))
  );

  return (
    <>
      {isMobile && !isSidebarOpen && (
        <button
          className="sidebarToggleBtn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
      )}
      <aside className={`sidebarContainer ${isSidebarOpen ? "open" : ""}`}>
        <section className="header">
          {isMobile && (
            <button
              className="closeSidebarBtn"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✖
            </button>
          )}
          <p>TOGGLE VISIBLE TRACE NODES:</p>

          <form onSubmit={handleSearch}>
            <label htmlFor="searchInp" className="searchInputContainer">
              <span>Add Wallet Address:</span>
              <div>
                <input
                  type="text"
                  id="searchInp"
                  placeholder="Enter Wallet Address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <button type="submit">Search</button>
              </div>
            </label>
          </form>

          <section className="tabSection">
            <button
              onClick={() => setIsInflow(true)}
              className={isInflow ? "active" : ""}
            >
              Inflows
            </button>
            <button
              onClick={() => setIsInflow(false)}
              className={!isInflow ? "active" : ""}
            >
              Outflows
            </button>
          </section>
        </section>
        {isFetching && <p>Loading...</p>}
        {error && <p>Error fetching data</p>}

        <ul className="transactionList">
          {(isInflow ? inflows : outflows).map((tx, index) => (
            <li key={index}>
              {tx.wallet} - {tx.amount} BTC
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
