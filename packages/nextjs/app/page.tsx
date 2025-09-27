"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "SE2Token",
    functionName: "totalSupply",
  });

  // Mock data for featured creators
  const featuredCreators = [
    {
      name: "Akan Proverbs",
      creator: "Elder Akosua",
      community: "Ashanti Kingdom",
      earnings: "$2,450",
      avatar: "👑",
    },
    {
      name: "Berber Jewelry",
      creator: "Amina Al-Amazigh",
      community: "Atlas Mountains",
      earnings: "$1,890",
      avatar: "💎",
    },
    {
      name: "Zulu Beadwork",
      creator: "Mama Nomsa",
      community: "KwaZulu-Natal",
      earnings: "$3,120",
      avatar: "🔸",
    },
    {
      name: "Sufi Poetry",
      creator: "Sheikh Omar",
      community: "Timbuktu Circle",
      earnings: "$2,780",
      avatar: "📜",
    },
  ];

  return (
    <>
      <style jsx global>{`
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-strong {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .stagger-1 {
          animation-delay: 0.1s;
        }
        .stagger-2 {
          animation-delay: 0.2s;
        }
        .stagger-3 {
          animation-delay: 0.3s;
        }
        .stagger-4 {
          animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .african-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF8C00' fill-opacity='0.1'%3E%3Cpath d='M60 60l30-30-30-30-30 30 30 30zm0-15l15-15-15-15-15 15 15 15z'/%3E%3Cpath d='M0 60l30-30-30-30v60zm120 0l-30-30 30-30v60z'/%3E%3Cpath d='M60 0l30 30-30 30L30 30 60 0zm0 120l30-30-30-30-30 30 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .kente-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2691E' fill-opacity='0.08'%3E%3Crect x='0' y='0' width='20' height='20'/%3E%3Crect x='40' y='0' width='20' height='20'/%3E%3Crect x='20' y='20' width='20' height='20'/%3E%3Crect x='60' y='20' width='20' height='20'/%3E%3Crect x='0' y='40' width='20' height='20'/%3E%3Crect x='40' y='40' width='20' height='20'/%3E%3Crect x='20' y='60' width='20' height='20'/%3E%3Crect x='60' y='60' width='20' height='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* Hero with African-inspired dark background */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-900 via-orange-900 to-red-900">
        {/* African pattern overlays */}
        <div className="absolute inset-0 african-pattern"></div>
        <div className="absolute inset-0 kente-pattern"></div>
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Floating geometric shapes with African colors */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl opacity-15 floating blur-sm"></div>
        <div
          className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-red-500 to-amber-500 rounded-full opacity-20 floating blur-sm"
          style={{ animationDelay: "-2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl opacity-10 floating blur-sm"
          style={{ animationDelay: "-4s" }}
        ></div>

        <div className="relative z-10 flex flex-col lg:flex-row max-w-7xl mx-auto px-6 py-16">
          {/* Left Column - Hero Content */}
          <div className="flex-1 flex flex-col justify-center lg:pr-16 fade-in">
            {/* Blockchain Badge */}
            <div className="mb-10 fade-in stagger-1">
              <div className="inline-flex items-center px-6 py-3 rounded-full glass">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-3 pulse-slow"></div>
                <span className="text-white font-medium text-sm tracking-wide">POWERED BY SCAFFOLD-ETH</span>
              </div>
            </div>

            {/* Main Heading - Original Style */}
            <div className="mb-12 fade-in stagger-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Preserve Culture,
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Own Heritage
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
                The first Web3 platform where African communities mint, trade, and preserve cultural heritage as
                authentic NFTs on the blockchain.
              </p>
            </div>

            {/* CTA Buttons - Original Orange Theme */}
            <div className="flex flex-col sm:flex-row gap-6 mb-16 fade-in stagger-3">
              <button className="group relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-xl font-semibold text-lg overflow-hidden hover-lift shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  <span className="mr-3">🔍</span>
                  Explore NFTs
                </span>
              </button>
              <button className="group glass-strong text-white px-10 py-5 rounded-xl font-semibold text-lg hover-lift border border-white/20 hover:border-white/40">
                <span className="flex items-center justify-center">
                  <span className="mr-3">▶️</span>
                  Start Creating
                </span>
              </button>
            </div>

            {/* Stats - Original Colors */}
            <div className="grid grid-cols-3 gap-8 fade-in stagger-4">
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-4xl lg:text-4xl font-bold text-orange-400 mb-2">1,247</div>
                <div className="text-sm text-gray-300 font-medium">Stories Preserved</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-4xl lg:text-4xl font-bold text-red-400 mb-2">453</div>
                <div className="text-sm text-gray-300 font-medium">Artisans Supported</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-4xl lg:text-4xl font-bold text-green-400 mb-2">12</div>
                <div className="text-sm text-gray-300 font-medium">Countries Active</div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Creators */}
          <div className="flex-1 mt-16 lg:mt-0 lg:pl-16">
            <div className="space-y-6">
              {featuredCreators.map((creator, index) => (
                <div
                  key={index}
                  className={`glass-strong rounded-2xl p-6 hover-lift fade-in stagger-${index + 1} group border border-white/10 hover:border-amber-400/30`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {creator.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">{creator.name}</h3>
                        <p className="text-gray-300 text-sm">{creator.creator}</p>
                        <div className="mt-2">
                          <span className="text-xs text-gray-400">Community</span>
                          <p className="text-sm font-medium text-gray-200">{creator.community}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">Earnings</span>
                      <p className="text-xl font-bold text-green-400">{creator.earnings}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connected Address - Floating Card */}
        {connectedAddress && (
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 fade-in">
            <div className="glass-strong rounded-2xl p-6 border border-white/20 hover-lift">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white">
                    🔗
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Connected Wallet</p>
                    <div className="text-white">
                      <Address address={connectedAddress} />
                    </div>
                  </div>
                </div>
                {totalSupply && (
                  <div className="text-right">
                    <p className="text-sm text-gray-300">Total Supply</p>
                    <p className="text-xl font-bold text-orange-400">{totalSupply.toString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Development Tools - Modern Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-strong rounded-2xl p-6 hover-lift group border border-white/10 hover:border-amber-400/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  🐛
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">Debug Contracts</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Tinker with your smart contract using the debug interface.
                  </p>
                  <Link
                    href="/debug"
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium text-sm"
                  >
                    Open Debug Tab →
                  </Link>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6 hover-lift group border border-white/10 hover:border-amber-400/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  🔍
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">Block Explorer</h3>
                  <p className="text-gray-300 text-sm mb-4">Explore your local transactions and blockchain data.</p>
                  <Link
                    href="/blockexplorer"
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium text-sm"
                  >
                    Open Explorer →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
