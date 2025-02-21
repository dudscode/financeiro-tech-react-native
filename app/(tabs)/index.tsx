import { useState } from "react";
import { BalanceCard } from "@/components/BalanceCard";

export default function HomeScreen() {
  const [saldo, setSaldo] = useState({ tipo: "Conta Corrente", valor: 5000 });
  const [loading, setLoading] = useState(false);

  return <BalanceCard saldo={saldo} loading={loading} />;
}
