"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseEther } from "viem";
import { useKanda } from "~~/hooks/scaffold-eth/useKanda";

export default function CreatePage() {
  const router = useRouter();
  const { mintHeritage, isMinting } = useKanda();

  const [formData, setFormData] = useState({
    title: "",
    creator: "",
    culturalType: "story",
    language: "english",
    metadataURI: "",
    price: "0.01",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mintHeritage({
        args: [
          formData.title,
          formData.creator,
          formData.culturalType,
          formData.language,
          formData.metadataURI || "ipfs://demo-metadata",
          parseEther(formData.price),
        ],
      });

      router.push("/marketplace");
    } catch (error) {
      console.error("Mint error:", error);
    }
  };

  return (
    <>
      {/* Glass + Animation + Patterns - Same as homepage */}
      <style jsx global>{`
        .glass {
          background: rgba(205, 168, 44, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(205, 168, 44, 0.3);
        }
        .glass-strong {
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(205, 168, 44, 0.4);
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(205, 168, 44, 0.3);
        }
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(205, 168, 44, 0.8);
          box-shadow: 0 0 0 3px rgba(205, 168, 44, 0.2);
        }
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(205, 168, 44, 0.3);
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
        .stagger-5 {
          animation-delay: 0.5s;
        }
        .stagger-6 {
          animation-delay: 0.6s;
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
          background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cda82c' fill-opacity='0.2'%3E%3Cpath d='M60 60l30-30-30-30-30 30 30 30zm0-15l15-15-15-15-15 15 15 15z'/%3E%3Cpath d='M0 60l30-30-30-30v60zm120 0l-30-30 30-30v60z'/%3E%3Cpath d='M60 0l30 30-30 30L30 30 60 0zm0 120l30-30-30-30-30 30 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>

      {/* Background with theme colors */}
      <div className="min-h-screen bg-gradient-to-br from-[#cda82c] via-black to-[#c41e25] relative">
        {/* African pattern overlay */}
        <div className="absolute inset-0 african-pattern"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 py-12 max-w-2xl relative z-10">
          {/* Header with glass badge */}
          <div className="text-center mb-12 fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-[#cda82c] to-[#c41e25] rounded-full mr-3 pulse-slow"></div>
              <span className="text-white font-medium text-sm tracking-wide">PRESERVE YOUR CULTURE</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg fade-in stagger-1">
              🪘 Preserve Your Heritage
            </h1>

            <p className="text-gray-200 text-lg fade-in stagger-2">
              Share your cultural treasures with the world and earn from your heritage
            </p>
          </div>

          {/* Main form with enhanced glassmorphism */}
          <form
            onSubmit={handleSubmit}
            className="glass-strong rounded-2xl shadow-2xl p-8 space-y-6 hover-lift fade-in stagger-3"
          >
            <div className="fade-in stagger-4">
              <label className="block text-sm font-medium text-[#cda82c] mb-2">Heritage Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., The Baobab Tree Creation Story"
                className="w-full p-3 glass-input rounded-lg text-white placeholder-gray-300 transition-all duration-300"
              />
            </div>

            <div className="fade-in stagger-5">
              <label className="block text-sm font-medium text-[#cda82c] mb-2">Your Name *</label>
              <input
                type="text"
                required
                value={formData.creator}
                onChange={e => setFormData(prev => ({ ...prev, creator: e.target.value }))}
                placeholder="e.g., Mama Grace Wanjiku"
                className="w-full p-3 glass-input rounded-lg text-white placeholder-gray-300 transition-all duration-300"
              />
            </div>

            <div className="fade-in stagger-6">
              <label className="block text-sm font-medium text-[#cda82c] mb-2">Cultural Type *</label>
              <select
                value={formData.culturalType}
                onChange={e => setFormData(prev => ({ ...prev, culturalType: e.target.value }))}
                className="w-full p-3 glass-input rounded-lg text-white transition-all duration-300"
              >
                <option value="story" className="bg-black text-white">
                  📚 Traditional Story
                </option>
                <option value="song" className="bg-black text-white">
                  🎵 Cultural Song
                </option>
                <option value="wisdom" className="bg-black text-white">
                  🧠 Ancient Wisdom
                </option>
                <option value="craft" className="bg-black text-white">
                  🛠️ Traditional Craft
                </option>
                <option value="ceremony" className="bg-black text-white">
                  🎭 Ritual/Ceremony
                </option>
              </select>
            </div>

            <div className="fade-in stagger-1">
              <label className="block text-sm font-medium text-[#cda82c] mb-2">Language *</label>
              <select
                value={formData.language}
                onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                className="w-full p-3 glass-input rounded-lg text-white transition-all duration-300"
              >
                <option value="english" className="bg-black text-white">
                  English
                </option>
                <option value="swahili" className="bg-black text-white">
                  Kiswahili
                </option>
                <option value="kikuyu" className="bg-black text-white">
                  Gĩkũyũ
                </option>
                <option value="yoruba" className="bg-black text-white">
                  Yorùbá
                </option>
                <option value="hausa" className="bg-black text-white">
                  Hausa
                </option>
                <option value="amharic" className="bg-black text-white">
                  አማርኛ (Amharic)
                </option>
                <option value="zulu" className="bg-black text-white">
                  isiZulu
                </option>
                <option value="igbo" className="bg-black text-white">
                  Igbo
                </option>
              </select>
            </div>

            <div className="fade-in stagger-2">
              <label className="block text-sm font-medium text-[#cda82c] mb-2">Price (ETH) *</label>
              <input
                type="number"
                step="0.001"
                required
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.01"
                className="w-full p-3 glass-input rounded-lg text-white placeholder-gray-300 transition-all duration-300"
              />
              <p className="text-sm text-gray-400 mt-1">Suggested: 0.01 - 0.1 ETH</p>
            </div>

            <button
              type="submit"
              disabled={isMinting}
              className="w-full py-4 bg-gradient-to-r from-[#cda82c] to-[#c41e25] hover:from-[#c41e25] hover:to-[#cda82c] text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] fade-in stagger-3"
            >
              {isMinting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                  Preserving Heritage...
                </span>
              ) : (
                "🏛️ Preserve My Heritage"
              )}
            </button>

            {/* Info card */}
            <div className="glass rounded-xl p-4 fade-in stagger-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-semibold text-[#cda82c] mb-1">What happens next?</h4>
                  <p className="text-sm text-gray-300">
                    Your heritage will be minted as an NFT and submitted for community/elder verification. Once
                    verified, it becomes available in the marketplace for licensing.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
