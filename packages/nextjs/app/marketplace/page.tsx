"use client";

import { HeritageCard } from "~~/components/HeritageCard";
import { useKanda } from "~~/hooks/scaffold-eth/useKanda";

export default function MarketplacePage() {
  const { allHeritages, isLoading } = useKanda();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">🌍 African Heritage Marketplace</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Discover authentic African cultural treasures, directly from community elders. Every purchase supports creators
        and preserves heritage.
      </p>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading heritage items...</p>
        </div>
      ) : allHeritages && allHeritages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allHeritages.map((heritage: any) => (
            <HeritageCard
              key={heritage.tokenId}
              tokenId={heritage.tokenId}
              title={heritage.title}
              creator={heritage.creator}
              culturalType={heritage.culturalType}
              language={heritage.language}
              price={heritage.price}
              verified={heritage.verified}
              totalEarnings={heritage.totalEarnings}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏛️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Heritage Items Yet</h3>
          <p className="text-gray-600 mb-6">Be the first to preserve African cultural heritage!</p>
          <a
            href="/create"
            className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors"
          >
            Create First Heritage
          </a>
        </div>
      )}
    </div>
  );
}
