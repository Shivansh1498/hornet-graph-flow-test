# 🚀 Wallet Transactions Explorer

## 📌 Overview

This project is a **Wallet Transactions Explorer** that allows users to input a Bitcoin wallet address and visualize the **inflow** and **outflow** transactions in a graphical format. The project is built using **React, Redux, and Redux Toolkit**, and fetches real-time transaction data using an API.

## 🎯 Features

- 🔍 **Search Bitcoin Wallets** to get transaction data
- 📊 **Graphical Representation** of transactions
- 🔄 **Toggle between Inflows & Outflows**
- 🎨 **Dark Mode & Light Mode Support**
- 📱 **Fully Responsive with Sidebar Toggle**
- 🖱️ **Draggable Wallet Nodes** for better visualization and interaction

---

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit
- **State Management**: Redux
- **API Handling**: RTK Query
- **Styling**: CSS

---

## 🌐 API Used

This project fetches real-time Bitcoin transaction data using the following API:  
🔗 https://blockchain.info/rawaddr/{walletAddress}
The API returns detailed transaction history for a given Bitcoin wallet address.

Example API request: Replace `{walletAddress}` with the actual Bitcoin wallet address to fetch its transaction history.

---

## 🏗️ Installation & Setup

## Clone the repository

```bash
git clone https://github.com/Shivansh1498/hornet-graph-flow-test.git
cd hornet-graph-flow-test

npm install

npm run dev
The app will be running at http://localhost:5173

Build for production (optional)
npm run build

To run tests (if applicable)
npm test
```
