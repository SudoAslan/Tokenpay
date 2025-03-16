"use client";

import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-6">TokenPay</h1>
      <Link href="/wallet">
        <button className="px-8 py-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105">
          Zum Wallet
        </button>
      </Link>
    </main>
  );
}
