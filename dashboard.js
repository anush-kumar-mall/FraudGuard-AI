import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/dashboard/summary", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Expenses: {data.totalExpenses}</p>
      <p>Fraud Alerts: {data.fraudCount}</p>
    </div>
  );
}
