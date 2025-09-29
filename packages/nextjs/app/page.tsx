"use client";

import Link from "next/link";
import Typewriter from "../components/Typewriter";
import { useKanda } from "../hooks/scaffold-eth/useKanda";

// adjust relative path if different

export default function Home() {
  const { allHeritages } = useKanda();

  return (
    <>
      {/* Glass + Animation + Patterns */}
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
        .african-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF8C00' fill-opacity='0.1'%3E%3Cpath d='M60 60l30-30-30-30-30 30 30 30zm0-15l15-15-15-15-15 15 15 15z'/%3E%3Cpath d='M0 60l30-30-30-30v60zm120 0l-30-30 30-30v60z'/%3E%3Cpath d='M60 0l30 30-30 30L30 30 60 0zm0 120l30-30-30-30-30 30 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* Hero Section (Left-Aligned) */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-900 via-orange-900 to-red-900">
        <div className="absolute inset-0 african-pattern"></div>
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column - Hero Content */}
          <div className="flex-1 flex flex-col justify-center lg:pr-16 fade-in">
            {/* Blockchain Badge */}
            <div className="mb-10 fade-in stagger-1">
              <div className="inline-flex items-center px-6 py-3 rounded-full glass">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-3 pulse-slow"></div>
                <span className="text-white font-medium text-sm tracking-wide">POWERED BY SCAFFOLD-ETH</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-12 fade-in stagger-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                KANDA
                <br />
                <span className="bg-gradient-to-r from-[#cda82c] via-[#c41e25] to-[#2f573a] bg-clip-text text-transparent">
                  <Typewriter
                    texts={["Own Your Heritage.", "Preserve Your Pride.", "Profit From Your Past."]}
                    typeSpeed={60}
                    deleteSpeed={40}
                    delay={1400}
                  />
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
                The first platform where African elders become digital millionaires while preserving culture for future
                generations.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-16 fade-in stagger-3">
              <Link
                href="/create"
                className="group relative bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-white px-10 py-5 rounded-xl font-semibold text-lg overflow-hidden hover-lift shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#e0c653] to-[#d43a3a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">🎤 Create Heritage</span>
              </Link>
              <Link
                href="/marketplace"
                className="group glass-strong text-white px-10 py-5 rounded-xl font-semibold text-lg hover-lift border border-white/20 hover:border-white/40"
              >
                🏪 Explore Marketplace
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 fade-in stagger-4">
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-4xl lg:text-4xl font-bold text-[#cda82c] mb-2">{allHeritages?.length || 0}</div>
                <div className="text-sm text-gray-300 font-medium">Heritage Items</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-4xl lg:text-4xl font-bold text-[#c41e25] mb-2">23</div>
                <div className="text-sm text-gray-300 font-medium">Languages</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-4xl lg:text-4xl font-bold text-[#2f573a] mb-2">12</div>
                <div className="text-sm text-gray-300 font-medium">Communities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="relative z-10 max-w-4xl mx-auto glass-strong rounded-2xl p-8 mb-16 text-left fade-in stagger-2">
          <h2 className="text-2xl font-bold text-white mb-4">🚨 The Cultural Crisis We Face TODAY</h2>
          <ul className="space-y-3 text-gray-200">
            <li>📉 Every 14 days, another African language dies forever</li>
            <li>👴 90% of African elders will take their stories to the grave</li>
            <li>🏛️ $2.6B annual revenue from “African-inspired” content goes abroad</li>
            <li>💰 Wakanda made $1.3B for Marvel, while real African communities remain poor</li>
          </ul>
          <p className="mt-4 text-lg font-semibold text-red-300">
            We are losing our cultural wealth to digital colonialism.
          </p>
        </div>

        {/* Features */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-20 fade-in stagger-3">
          <div className="glass rounded-xl p-6 hover-lift">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="font-bold text-xl mb-2 text-white">Voice-First Recording</h3>
            <p className="text-gray-300">Record in any African language. No typing, no blockchain knowledge needed.</p>
          </div>
          <div className="glass rounded-xl p-6 hover-lift">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-bold text-xl mb-2 text-white">Elder Verification</h3>
            <p className="text-gray-300">Community elders verify authenticity, preventing cultural appropriation.</p>
          </div>
          <div className="glass rounded-xl p-6 hover-lift">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-xl mb-2 text-white">Lifetime Royalties</h3>
            <p className="text-gray-300">Earn 60% of every license fee. Your heritage pays you forever.</p>
          </div>
          <div className="glass rounded-xl p-6 hover-lift">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-bold text-xl mb-2 text-white">Global Reach</h3>
            <p className="text-gray-300">Universities, Netflix, documentaries – reach buyers worldwide.</p>
          </div>
        </div>
      </div>
    </>
  );
}
