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
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">🎤 Preserve Your Heritage</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Heritage Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., The Baobab Tree Creation Story"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
          <input
            type="text"
            required
            value={formData.creator}
            onChange={e => setFormData(prev => ({ ...prev, creator: e.target.value }))}
            placeholder="e.g., Mama Grace Wanjiku"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Type *</label>
          <select
            value={formData.culturalType}
            onChange={e => setFormData(prev => ({ ...prev, culturalType: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="story">📚 Traditional Story</option>
            <option value="song">🎵 Cultural Song</option>
            <option value="wisdom">🧠 Ancient Wisdom</option>
            <option value="craft">🛠️ Traditional Craft</option>
            <option value="ceremony">🎭 Ritual/Ceremony</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
          <select
            value={formData.language}
            onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="english">English</option>
            <option value="swahili">Kiswahili</option>
            <option value="kikuyu">Gĩkũyũ</option>
            <option value="yoruba">Yorùbá</option>
            <option value="hausa">Hausa</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (ETH) *</label>
          <input
            type="number"
            step="0.001"
            required
            value={formData.price}
            onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isMinting}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {isMinting ? "Preserving Heritage..." : "🏛️ Preserve My Heritage"}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Your heritage will be submitted for elder verification after minting
        </p>
      </form>
    </div>
  );
}
