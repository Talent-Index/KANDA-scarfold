"use client";

import { useState } from "react";
import { HeritageCard } from "~~/components/HeritageCard";
import { useKanda } from "~~/hooks/scaffold-eth/useKanda";

export default function MarketplacePage() {
  const { allHeritages, isLoading, licenseHeritage } = useKanda(); // Add licenseHeritage here
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleLicense = async (tokenId: number, price: bigint) => {
    try {
      await licenseHeritage({
        functionName: "licenseHeritage",
        args: [BigInt(tokenId)],
        value: price,
      });
    } catch (error) {
      console.error("Licensing failed:", error);
    }
  };

  // Filter and sort logic
  const filteredHeritages =
    allHeritages?.filter((heritage: any) => {
      if (filterType === "all") return true;
      return heritage.culturalType === filterType;
    }) || [];

  const sortedHeritages = [...filteredHeritages].sort((a: any, b: any) => {
    switch (sortBy) {
      case "price-low":
        return Number(a.price) - Number(b.price);
      case "price-high":
        return Number(b.price) - Number(a.price);
      case "newest":
      default:
        return Number(b.tokenId) - Number(a.tokenId);
    }
  });

  const verifiedCount = allHeritages?.filter((h: any) => h.verified).length || 0;
  const totalItems = allHeritages?.length || 0;

  return (
    <>
      {/* Glass + Animation + Patterns */}
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

      <div className="min-h-screen bg-gradient-to-br from-[#cda82c] via-black to-[#c41e25] relative">
        {/* African pattern overlay */}
        <div className="absolute inset-0 african-pattern"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
          {/* Header Section */}
          <div className="glass-strong rounded-2xl p-8 text-white mb-8 fade-in">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">🌍 African Heritage Marketplace</h1>
              <p className="text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
                Discover authentic African cultural treasures, directly from community elders. Every purchase supports
                creators and preserves heritage.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="glass rounded-lg px-4 py-2">
                  <span className="text-[#cda82c] font-semibold">{totalItems}</span>
                  <span className="text-gray-300 ml-1">Heritage Items</span>
                </div>
                <div className="glass rounded-lg px-4 py-2">
                  <span className="text-[#cda82c] font-semibold">{verifiedCount}</span>
                  <span className="text-gray-300 ml-1">Verified by Elders</span>
                </div>
                <div className="glass rounded-lg px-4 py-2">
                  <span className="text-[#cda82c] font-semibold">5+</span>
                  <span className="text-gray-300 ml-1">African Languages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Sort Section */}
          <div className="glass-strong rounded-xl p-6 mb-8 fade-in stagger-1">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="text-white font-semibold mr-2">Filter by type:</span>
                {[
                  { key: "all", label: "All Types", icon: "🎭" },
                  { key: "story", label: "Stories", icon: "📚" },
                  { key: "song", label: "Songs", icon: "🎵" },
                  { key: "wisdom", label: "Wisdom", icon: "🧠" },
                  { key: "craft", label: "Crafts", icon: "🛠️" },
                ].map(type => (
                  <button
                    key={type.key}
                    onClick={() => setFilterType(type.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      filterType === type.key
                        ? "bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-black"
                        : "glass text-white hover:bg-white/10"
                    }`}
                  >
                    {type.icon} {type.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="glass-input rounded-lg px-3 py-1 text-white text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content Section */}
          {isLoading ? (
            <div className="glass-strong rounded-xl p-12 text-center fade-in stagger-2">
              <div className="text-6xl mb-6 pulse-slow">⏳</div>
              <h3 className="text-2xl font-bold text-white mb-2">Loading Heritage Items...</h3>
              <p className="text-gray-300">Discovering authentic African treasures</p>
            </div>
          ) : sortedHeritages && sortedHeritages.length > 0 ? (
            <div className="space-y-6">
              {/* Results Count */}
              <div className="glass rounded-lg p-4 fade-in stagger-2">
                <p className="text-white text-center">
                  <span className="font-semibold text-[#cda82c]">{sortedHeritages.length}</span>
                  <span className="text-gray-300"> heritage item(s) found</span>
                  {filterType !== "all" && <span className="text-gray-300"> • Filtered by: </span>}
                  {filterType !== "all" && <span className="text-[#cda82c] capitalize">{filterType}</span>}
                </p>
              </div>

              {/* Heritage Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in stagger-3">
                {sortedHeritages.map((heritage: any, index: number) => (
                  <div key={heritage.tokenId} className="hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                    <HeritageCard
                      tokenId={heritage.tokenId}
                      title={heritage.title}
                      creator={heritage.creator}
                      culturalType={heritage.culturalType}
                      language={heritage.language}
                      price={heritage.price}
                      verified={heritage.verified}
                      totalEarnings={heritage.totalEarnings}
                      onLicense={handleLicense} // Pass the handleLicense function to the card
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-strong rounded-xl p-12 text-center fade-in stagger-2">
              <div className="text-6xl mb-6">🏛️</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {filterType === "all" ? "No Heritage Items Yet" : `No ${filterType} items found`}
              </h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                {filterType === "all"
                  ? "Be the first to preserve African cultural heritage on the blockchain!"
                  : `Try selecting a different type or clear the filter to see all items.`}
              </p>

              <div className="space-y-4">
                {filterType !== "all" && (
                  <button
                    onClick={() => setFilterType("all")}
                    className="block mx-auto px-6 py-3 glass text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                  >
                    View All Heritage Items
                  </button>
                )}

                <a
                  href="/create"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-black font-bold rounded-full transition-transform hover:scale-105 shadow-lg"
                >
                  🎤 Create Heritage Item
                </a>
              </div>
            </div>
          )}

          {/* Community Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-strong rounded-xl p-6 text-white hover-lift fade-in stagger-4">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold text-lg mb-2 text-[#cda82c]">Elder Verified</h3>
              <p className="text-gray-300 text-sm">
                All cultural items are authenticated by community elders to ensure accuracy and respect for traditions.
              </p>
            </div>

            <div className="glass-strong rounded-xl p-6 text-white hover-lift fade-in stagger-5">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold text-lg mb-2 text-[#cda82c]">Fair Compensation</h3>
              <p className="text-gray-300 text-sm">
                Creators receive direct payments for their cultural contributions, supporting heritage preservation.
              </p>
            </div>

            <div className="glass-strong rounded-xl p-6 text-white hover-lift fade-in stagger-6">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-bold text-lg mb-2 text-[#cda82c]">Community Fund</h3>
              <p className="text-gray-300 text-sm">
                A portion of each purchase supports community projects and cultural preservation initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
