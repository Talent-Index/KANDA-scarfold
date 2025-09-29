"use client";

import { useState } from "react";
import { formatEther } from "viem";
import { useKanda } from "~~/hooks/scaffold-eth/useKanda";

interface HeritageCardProps {
  tokenId: number;
  title: string;
  creator: string;
  culturalType: string;
  language: string;
  price: bigint;
  verified: boolean;
  totalEarnings: bigint;
}

export const HeritageCard = ({
  tokenId,
  title,
  creator,
  culturalType,
  language,
  price,
  verified,
  totalEarnings,
}: HeritageCardProps) => {
  const { licenseHeritage, isLicensing } = useKanda();
  const [showLicense, setShowLicense] = useState(false);

  const handleLicense = async () => {
    try {
      await licenseHeritage({
        args: [BigInt(tokenId)],
        value: price,
      });
      setShowLicense(false);
    } catch (error) {
      console.error("License error:", error);
    }
  };

  const getCategoryIcon = (type: string) => {
    const icons: Record<string, string> = {
      story: "📚",
      song: "🎵",
      wisdom: "🧠",
      craft: "🛠️",
      ceremony: "🎭",
    };
    return icons[type] || "🏛️";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-2xl mb-2">{getCategoryIcon(culturalType)}</div>
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">by {creator}</p>
          <p className="text-xs text-gray-500">{language}</p>
        </div>
        {verified ? (
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">✓ Verified</span>
        ) : (
          <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">⏳ Pending</span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="text-2xl font-bold text-orange-600">{formatEther(price)} ETH</div>
          <div className="text-xs text-gray-500">Earned: {formatEther(totalEarnings)} ETH</div>
        </div>
        {verified && (
          <button
            onClick={() => setShowLicense(true)}
            disabled={isLicensing}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLicensing ? "Licensing..." : "License"}
          </button>
        )}
      </div>

      {/* License Modal */}
      {showLicense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">License "{title}"</h3>
            <p className="text-gray-600 mb-6">
              You're about to license this heritage for {formatEther(price)} ETH. 60% goes to the creator, 40% supports
              the platform.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLicense(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLicense}
                disabled={isLicensing}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                {isLicensing ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
