import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WalletGraph = () => {
  const graphData = useSelector((state) => state.walletGraph?.graphNodes || []);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!graphData.length) return;

    const nodes = new Map();
    const edges = [];

    graphData.forEach((tx) => {
      const sender = tx.inputs[0]?.prev_out?.addr || "Unknown";
      const senderDate = new Date(tx.time * 1000).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });

      tx.out.forEach((output) => {
        const receiver = output.addr || "Unknown";
        const amount = output.value / 1e8;

        if (!nodes.has(sender)) {
          nodes.set(sender, {
            name: sender,
            value: sender,
            symbolSize: 140,
            draggable: true,
            fixed: true,
            x: Math.random() * 1200,
            y: Math.random() * 800,
            itemStyle: { color: "#3498db" },
            walletData: {
              address: sender,
              entity: "Unknown",
              amount,
              tokenType: "BTC",
              transactionType: "Outflow",
              date: senderDate,
            },
            label: {
              show: true,
              position: "inside",
              color: "#fff",
              fontSize: 12,
              formatter:
                sender.length > 12 ? sender.slice(0, 12) + "..." : sender,
            },
          });
        }

        if (!nodes.has(receiver)) {
          nodes.set(receiver, {
            name: receiver,
            value: receiver,
            symbolSize: 140,
            draggable: true,
            fixed: true,
            x: Math.random() * 1200,
            y: Math.random() * 800,
            itemStyle: { color: "#e74c3c" },
            walletData: {
              address: receiver,
              entity: "Unknown",
              amount,
              tokenType: "BTC",
              transactionType: "Inflow",
              date: senderDate,
            },
            label: {
              show: true,
              position: "inside",
              color: "#fff",
              fontSize: 12,
              formatter:
                receiver.length > 12 ? receiver.slice(0, 12) + "..." : receiver,
            },
          });
        }

        edges.push({
          source: sender,
          target: receiver,
          value: amount,
          lineStyle: {
            color: "#f1c40f",
            width: 2,
            curveness: 0.3,
          },
          symbol: ["none", "arrow"],
          emphasis: {
            lineStyle: { width: 3 },
          },
        });
      });
    });

    setChartOptions({
      tooltip: {
        trigger: "item",
        alwaysShowContent: false,
        formatter: (params) => {
          if (params.dataType === "edge") {
            return `<b>Transaction</b><br/><b>From:</b> ${params.data.source}<br/><b>To:</b> ${params.data.target}<br/><b>Amount:</b> ${params.data.value} BTC`;
          }
          if (params.data.walletData) {
            const {
              address,
              entity,
              amount,
              tokenType,
              transactionType,
              date,
            } = params.data.walletData;
            return `
              <b>Address:</b> ${address}<br/>
              <b>Entity:</b> ${entity}<br/>
              <b>Amount:</b> ${amount.toFixed(8)} BTC<br/>
              <b>Token Type:</b> ${tokenType}<br/>
              <b>Transaction Type:</b> ${transactionType}<br/>
              <b>Date:</b> ${date}
            `;
          }
          return `Wallet: ${params.data.name}`;
        },
        backgroundColor: "#2c3e50",
        borderColor: "#34495e",
        borderWidth: 1,
        textStyle: { color: "#ecf0f1" },
      },
      series: [
        {
          type: "graph",
          layout: "none",
          roam: true,
          draggable: false,
          focusNodeAdjacency: false,
          label: {
            show: true,
            position: "inside",
            fontSize: 12,
            color: "#fff",
          },
          data: Array.from(nodes.values()),
          links: edges,
        },
      ],
    });
  }, [graphData]);

  return (
    <div style={{ width: "100%", height: "calc(100vh - 36px - 40px)" }}>
      <ReactECharts option={chartOptions} style={{ height: "100%" }} />
    </div>
  );
};

export default WalletGraph;
