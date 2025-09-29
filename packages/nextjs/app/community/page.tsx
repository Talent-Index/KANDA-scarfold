"use client";

import { useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useKanda } from "~~/hooks/scaffold-eth/useKanda";

export default function CommunityPage() {
  const { address } = useAccount();
  const { allHeritages, myHeritages, isValidator, verifyHeritage, isVerifying } = useKanda();

  const totalHeritages = allHeritages?.length || 0;
  const verifiedHeritages = allHeritages?.filter((h: any) => h.verified).length || 0;
  const unverifiedHeritages = allHeritages?.filter((h: any) => !h.verified) || [];
  const myHeritagesCount = myHeritages?.length || 0;

  const totalEarnings = allHeritages?.reduce((sum: bigint, h: any) => sum + h.totalEarnings, 0n) || 0n;

  const [expandedHeritage, setExpandedHeritage] = useState<number | null>(null);

  const handleVerify = async (tokenId: number) => {
    try {
      await verifyHeritage({
        args: [BigInt(tokenId)],
      });
      setExpandedHeritage(null);
    } catch (error) {
      console.error("Verify error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Community Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-4xl font-bold mb-2">🏘️ Community Dashboard</h1>
        <p className="text-orange-100 mb-4">Kikuyu Elders Council • Preserving our heritage together</p>

        {isValidator && (
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="mr-2">👴</span>
            <span className="font-semibold">Community Elder Validator</span>
          </div>
        )}
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Heritage</p>
              <p className="text-3xl font-bold text-gray-900">{totalHeritages}</p>
            </div>
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
              <span className="text-2xl">🏛️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Items</p>
              <p className="text-3xl font-bold text-gray-900">{verifiedHeritages}</p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <span className="text-2xl">✓</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Heritage</p>
              <p className="text-3xl font-bold text-gray-900">{myHeritagesCount}</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <span className="text-2xl">👤</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{formatEther(totalEarnings)} ETH</p>
            </div>
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Elder Verification Section */}
          {isValidator && unverifiedHeritages.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    🗳️ Heritage Awaiting Your Verification
                  </h2>
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                    {unverifiedHeritages.length} pending
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  As a community elder, your validation ensures cultural authenticity
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {unverifiedHeritages.map((heritage: any) => {
                  const isExpanded = expandedHeritage === heritage.tokenId;

                  return (
                    <div key={heritage.tokenId} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">
                              {heritage.culturalType === "story"
                                ? "📚"
                                : heritage.culturalType === "song"
                                  ? "🎵"
                                  : heritage.culturalType === "wisdom"
                                    ? "🧠"
                                    : heritage.culturalType === "craft"
                                      ? "🛠️"
                                      : "🎭"}
                            </span>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{heritage.title}</h3>
                              <p className="text-sm text-gray-600">by {heritage.creator}</p>
                            </div>
                          </div>

                          <div className="flex gap-4 text-sm text-gray-500 mb-2">
                            <span>📚 {heritage.culturalType}</span>
                            <span>🗣️ {heritage.language}</span>
                            <span>💰 {formatEther(heritage.price)} ETH</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setExpandedHeritage(isExpanded ? null : heritage.tokenId)}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          {isExpanded ? "Hide" : "Review"}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-2">Validation Checklist:</h4>
                            <div className="space-y-2 text-sm">
                              <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Content is culturally accurate and authentic</span>
                              </label>
                              <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Language and terminology are appropriate</span>
                              </label>
                              <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Respects community traditions and values</span>
                              </label>
                              <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Creator has authority to share this knowledge</span>
                              </label>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => handleVerify(heritage.tokenId)}
                              disabled={isVerifying}
                              className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
                            >
                              {isVerifying ? <>⏳ Verifying...</> : <>✓ Approve & Verify</>}
                            </button>

                            <button
                              onClick={() => setExpandedHeritage(null)}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>

                          <p className="text-xs text-gray-500 mt-3">
                            💡 Your verification helps prevent cultural appropriation and ensures authenticity
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Pending Verifications */}
          {isValidator && unverifiedHeritages.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">
                No heritage items awaiting verification at the moment. Great work preserving our cultural authenticity!
              </p>
            </div>
          )}

          {/* My Heritage Items */}
          {myHeritages && myHeritages.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">📚 My Heritage Items</h2>
                <p className="text-gray-600 text-sm mt-1">Cultural assets you've contributed to preserve</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myHeritages.map((tokenId: bigint) => {
                    const heritage = allHeritages?.[Number(tokenId)];
                    if (!heritage) return null;

                    return (
                      <div key={tokenId.toString()} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{heritage.title}</h4>
                          {heritage.verified ? (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              ✓ Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                              ⏳ Pending
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Type: {heritage.culturalType}</p>
                          <p>Language: {heritage.language}</p>
                          <p className="font-semibold text-green-600">
                            Earned: {formatEther(heritage.totalEarnings)} ETH
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Become Validator CTA */}
          {!isValidator && (
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
              <div className="text-4xl mb-3">👴👵</div>
              <h3 className="font-bold text-xl mb-2">Become an Elder Validator</h3>
              <p className="text-purple-100 text-sm mb-4">
                Help preserve authentic African heritage by verifying cultural content. Earn rewards for your validation
                work.
              </p>
              <button className="w-full px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
                Apply to Become Elder
              </button>
            </div>
          )}

          {/* Community Impact */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">🌍 Community Impact</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Verification Rate</span>
                  <span className="font-semibold text-gray-800">
                    {totalHeritages > 0 ? Math.round((verifiedHeritages / totalHeritages) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${totalHeritages > 0 ? (verifiedHeritages / totalHeritages) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Community Fund Usage</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education Support</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Elder Care</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cultural Events</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Equipment & Tech</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Fund</span>
                    <span className="font-semibold">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">⚡ Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/create"
                className="block w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-center"
              >
                🎤 Create Heritage
              </a>
              <a
                href="/marketplace"
                className="block w-full px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                🏪 Browse Marketplace
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
