import { useState } from "react";

const Sidebar = () => {
  const [isInflow, setIsInflow] = useState(true);

  return (
    <aside className="sidebarContainer">
      <p>TOGGLE VISIBLE TRACE NODES:</p>

      <form>
        <label htmlFor="searchInp" className="searchInputContainer">
          <span>Add Wallet Address:</span>
          <div>
            <input
              type="text"
              id="searchInp"
              placeholder="Enter Wallet Address"
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
    </aside>
  );
};

export default Sidebar;
