"use client";

import Link from "next/link";
import { useKanda } from "../hooks/scaffold-eth/useKanda";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function Home() {
  const { allHeritages } = useKanda();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">🏛️ KANDA</h1>
        <p className="text-2xl text-gray-600 mb-2">Own Your Heritage. Preserve Your Pride. Profit From Your Past.</p>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          The first platform where African elders become digital millionaires while preserving culture for future
          generations.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/create"
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors"
          >
            🎤 Create Heritage
          </Link>
          <Link
            href="/marketplace"
            className="px-8 py-4 border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-colors"
          >
            🏪 Explore Marketplace
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{allHeritages?.length || 0}</div>
          <div className="text-gray-600">Heritage Items</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">23</div>
          <div className="text-gray-600">Languages</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
          <div className="text-gray-600">Communities</div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="max-w-4xl mx-auto bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🚨 The Cultural Crisis We Face TODAY</h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            📉 <strong>Every 14 days</strong>, another African language dies forever
          </li>
          <li>
            👴 <strong>90% of African elders</strong> will take their stories to the grave - unrecorded, unrewarded
          </li>
          <li>
            🏛️ <strong>$2.6 billion</strong> annual revenue from "African-inspired" content goes to foreign companies
          </li>
          <li>
            💰 <strong>Wakanda generated $1.3B</strong> for Marvel while real African communities remain poor
          </li>
        </ul>
        <p className="mt-4 text-lg font-semibold text-red-700">
          We are losing our cultural wealth to digital colonialism.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-orange-50 rounded-xl p-6">
          <div className="text-3xl mb-3">🎤</div>
          <h3 className="font-bold text-xl mb-2">Voice-First Recording</h3>
          <p className="text-gray-600">Record in any African language. No typing, no blockchain knowledge needed.</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6">
          <div className="text-3xl mb-3">👥</div>
          <h3 className="font-bold text-xl mb-2">Elder Verification</h3>
          <p className="text-gray-600">Community elders verify authenticity, preventing cultural appropriation.</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="font-bold text-xl mb-2">Lifetime Royalties</h3>
          <p className="text-gray-600">Earn 60% of every license fee. Your heritage pays you forever.</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <div className="text-3xl mb-3">🌍</div>
          <h3 className="font-bold text-xl mb-2">Global Reach</h3>
          <p className="text-gray-600">Universities, Netflix, documentaries - reach buyers worldwide.</p>
        </div>
      </div>
    </div>
  );
}
