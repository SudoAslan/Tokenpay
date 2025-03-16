"use client";
import React, { useState } from "react";

export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sender, setSender] = useState("");
  const [recipient, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  const isValidEthereumAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async () => {
    if (isValidEthereumAddress(walletAddress)) {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5000/balance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setError("Fehler beim Abrufen der Daten vom Server.");
          setBalance(null);
          return;
        }

        const data = await response.json();
        const balance = data.balance;

        console.log("API Response: ", balance);
        
        if (typeof balance === "number") {
          setBalance(balance);
          setValid(true)
        } else {
          setError("Ungültige Antwort vom Server.");
          setBalance(null);
        }
      } catch (err) {
        setError("Netzwerkfehler! Bitte versuche es später noch einmal.");
        setBalance(null);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Ungültige Wallet-Adresse! Bitte gib eine gültige Ethereum-Adresse ein.");
      setBalance(null);
    }
  };

  const handleTransaction = async () => {
    setMessage("");  
    if (!isValidEthereumAddress(sender)) {
      setMessage("Ungültige Sender-Adresse! Bitte gib eine gültige Ethereum-Adresse ein.");
      return;
    }
  
    if (!isValidEthereumAddress(recipient)) {
      setMessage("Ungültige Empfänger-Adresse! Bitte gib eine gültige Ethereum-Adresse ein.");
      return;
    }
  
    const transactionData = {
      sender,
      recipient,
      amount: parseFloat(amount),
    };
  
    try {
      const response = await fetch("http://localhost:5000/transaction/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
  
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setMessage("Transaktion erfolgreich!");
        reset();
      } else {
        setMessage(`Fehler: ${data.error}`);
      }
    } catch (error) {
      setMessage("Netzwerkfehler. Bitte versuche es später erneut.");
    }
  };
  
  const reset = () => {
    setReceiver("");
    setSender("");
    setAmount("");
    setShowForm(false);
  }

  return (
    <main className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Wallet Check</h1>
      <input
        type="text"
        placeholder="Wallet-Adresse eingeben"
        className="px-4 py-2 border rounded-lg mb-4 w-[460px]"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition"
      >
        {loading ? "Lädt..." : "Kontostand abrufen"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {balance !== null && (
        <p className="mt-4 text-lg font-semibold">Kontostand: {balance} ETH</p>
      )}

      {valid &&(

        <button
        onClick={() => setShowForm(!showForm)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
        >
        Neue Transaktion
      </button>
      )}

      {showForm && (
        <div className="mt-6 w-96 p-4 border rounded-lg shadow-md w-[500px]">
          <input
            type="text"
            placeholder="Absender-Adresse"
            className="w-full p-2 border rounded mb-2"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Empfänger-Adresse"
            className="w-full p-2 border rounded mb-2"
            value={recipient}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <input
            type="number"
            placeholder="Betrag in ETH"
            className="w-full p-2 border rounded mb-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleTransaction}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800 transition"
          >
            Senden
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
    </main>
  );
}
