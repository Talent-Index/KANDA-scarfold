"use client";

import { useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useKanda } from "~~/hooks/scaffold-eth/useKanda";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: Date;
  type: "message" | "verification" | "system";
}

export default function CommunityPage() {
  const { address } = useAccount();
  const { allHeritages, myHeritages, isValidator, verifyHeritage, isVerifying } = useKanda();

  const totalHeritages = allHeritages?.length || 0;
  const verifiedHeritages = allHeritages?.filter((h: any) => h.verified).length || 0;
  const unverifiedHeritages = allHeritages?.filter((h: any) => !h.verified) || [];
  const myHeritagesCount = myHeritages?.length || 0;

  const totalEarnings = allHeritages?.reduce((sum: bigint, h: any) => sum + h.totalEarnings, 0n) || 0n;

  const [expandedHeritage, setExpandedHeritage] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      user: "Elder Wanjiku",
      message: "Welcome to our community chat! Let's preserve our heritage together 🌍",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "message",
    },
    {
      id: 2,
      user: "System",
      message: "New heritage item 'Kikuyu Wedding Songs' has been verified ✓",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "verification",
    },
    {
      id: 3,
      user: "Mzee Joseph",
      message: "Just shared the story of the seven traditional Kikuyu clans. Available for licensing now!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: "message",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  // Single handleVerify function with proper functionName
  const handleVerify = async (tokenId: number) => {
    try {
      await verifyHeritage({
        functionName: "verifyHeritage", // Add this required property
        args: [BigInt(tokenId)],
      });
      setExpandedHeritage(null);

      // Add verification message to chat
      const verificationMessage: ChatMessage = {
        id: Date.now(),
        user: "System",
        message: `Heritage item verified by ${address?.slice(0, 6)}...${address?.slice(-4)} ✓`,
        timestamp: new Date(),
        type: "verification",
      };
      setChatMessages(prev => [...prev, verificationMessage]);
    } catch (error) {
      console.error("Verify error:", error);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now(),
      user: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Anonymous",
      message: newMessage,
      timestamp: new Date(),
      type: "message",
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage("");
  };

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
        .chat-slide-in {
          animation: slideInRight 0.3s ease-out;
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .message-fade-in {
          animation: messageFadeIn 0.3s ease-out;
        }
        @keyframes messageFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#cda82c] via-black to-[#c41e25] relative">
        {/* African pattern overlay */}
        <div className="absolute inset-0 african-pattern"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
          {/* Community Header */}
          <div className="glass-strong rounded-2xl p-8 text-white mb-8 fade-in">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">🤝 Community Dashboard</h1>

                {isValidator && (
                  <div className="inline-flex items-center glass rounded-full px-4 py-2 mt-2">
                    <span className="mr-2">👴</span>
                    <span className="font-semibold">Community Elder Validator</span>
                  </div>
                )}

                {!isValidator && address && (
                  <div className="inline-flex items-center glass rounded-full px-4 py-2 mt-2">
                    <span className="mr-2">👤</span>
                    <span className="font-semibold">Community Member</span>
                  </div>
                )}
              </div>

              {/* Chat Toggle Button */}
              <button
                onClick={() => setShowChat(!showChat)}
                className="relative bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                💬 Community Chat
                {chatMessages.length > 3 && (
                  <span className="absolute -top-2 -right-2 bg-[#c41e25] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {chatMessages.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Statistics Grid - Full Width */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="glass-strong rounded-xl p-4 md:p-6 hover-lift fade-in stagger-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-2 md:mb-0">
                  <p className="text-xs md:text-sm font-medium text-[#cda82c]">Total Heritage</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{totalHeritages}</p>
                </div>
                <div className="bg-[#cda82c]/20 text-[#cda82c] p-2 md:p-3 rounded-full self-end md:self-auto">
                  <span className="text-xl md:text-2xl">🏛️</span>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-xl p-4 md:p-6 hover-lift fade-in stagger-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-2 md:mb-0">
                  <p className="text-xs md:text-sm font-medium text-[#cda82c]">Verified Items</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{verifiedHeritages}</p>
                </div>
                <div className="bg-[#cda82c]/20 text-[#cda82c] p-2 md:p-3 rounded-full self-end md:self-auto">
                  <span className="text-xl md:text-2xl">✓</span>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-xl p-4 md:p-6 hover-lift fade-in stagger-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-2 md:mb-0">
                  <p className="text-xs md:text-sm font-medium text-[#cda82c]">My Heritage</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{myHeritagesCount}</p>
                </div>
                <div className="bg-[#c41e25]/20 text-[#c41e25] p-2 md:p-3 rounded-full self-end md:self-auto">
                  <span className="text-xl md:text-2xl">👤</span>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-xl p-4 md:p-6 hover-lift fade-in stagger-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-2 md:mb-0">
                  <p className="text-xs md:text-sm font-medium text-[#cda82c]">Total Earnings</p>
                  <p className="text-xl md:text-2xl font-bold text-white">{formatEther(totalEarnings)} ETH</p>
                </div>
                <div className="bg-[#cda82c]/20 text-[#cda82c] p-2 md:p-3 rounded-full self-end md:self-auto">
                  <span className="text-xl md:text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid - Better Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left Column - Verification Section */}
            <div className="lg:col-span-8 space-y-6">
              {/* Elder Verification Section */}
              {isValidator && unverifiedHeritages.length > 0 && (
                <div className="glass-strong rounded-xl shadow-lg fade-in stagger-5">
                  <div className="p-6 border-b border-[#cda82c]/20">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white flex items-center">
                        🗳️ Heritage Awaiting Your Verification
                      </h2>
                      <span className="bg-[#c41e25]/20 text-[#c41e25] text-sm font-semibold px-3 py-1 rounded-full">
                        {unverifiedHeritages.length} pending
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">
                      As a community elder, your validation ensures cultural authenticity
                    </p>
                  </div>

                  <div className="divide-y divide-[#cda82c]/10 max-h-96 overflow-y-auto">
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
                                  <h3 className="font-bold text-lg text-white">{heritage.title}</h3>
                                  <p className="text-sm text-gray-300">by {heritage.creator}</p>
                                </div>
                              </div>

                              <div className="flex gap-4 text-sm text-gray-400 mb-2">
                                <span>📚 {heritage.culturalType}</span>
                                <span>🗣️ {heritage.language}</span>
                                <span>💰 {formatEther(heritage.price)} ETH</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setExpandedHeritage(isExpanded ? null : heritage.tokenId)}
                              className="px-4 py-2 glass text-[#cda82c] rounded-lg hover:bg-[#cda82c]/20 transition-colors text-sm font-medium"
                            >
                              {isExpanded ? "Hide" : "Review"}
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="mt-4 p-4 bg-[#cda82c]/10 rounded-lg border border-[#cda82c]/20">
                              <div className="mb-4">
                                <h4 className="font-semibold text-white mb-2">Validation Checklist:</h4>
                                <div className="space-y-2 text-sm text-gray-300">
                                  <label className="flex items-center">
                                    <input type="checkbox" className="mr-2 accent-[#cda82c]" />
                                    <span>Content is culturally accurate and authentic</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input type="checkbox" className="mr-2 accent-[#cda82c]" />
                                    <span>Language and terminology are appropriate</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input type="checkbox" className="mr-2 accent-[#cda82c]" />
                                    <span>Respects community traditions and values</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input type="checkbox" className="mr-2 accent-[#cda82c]" />
                                    <span>Creator has authority to share this knowledge</span>
                                  </label>
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleVerify(heritage.tokenId)}
                                  disabled={isVerifying}
                                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-black font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center hover:scale-105"
                                >
                                  {isVerifying ? <>⏳ Verifying...</> : <>✓ Approve & Verify</>}
                                </button>

                                <button
                                  onClick={() => setExpandedHeritage(null)}
                                  className="px-6 py-3 glass text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>

                              <p className="text-xs text-gray-400 mt-3">
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
                <div className="glass-strong rounded-xl shadow-lg p-8 text-center fade-in stagger-5">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-white mb-2">All Caught Up!</h3>
                  <p className="text-gray-300">
                    No heritage items awaiting verification at the moment. Great work preserving our cultural
                    authenticity!
                  </p>
                </div>
              )}

              {/* Non-Validator Message */}
              {!isValidator && (
                <div className="glass-strong rounded-xl shadow-lg p-8 text-center fade-in stagger-5">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Community!</h3>
                  <p className="text-gray-300 mb-4">
                    You can view community activities, chat with members, and track your heritage contributions. Apply
                    to become an Elder Validator to help verify cultural authenticity.
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-black font-semibold rounded-lg hover:scale-105 transition-transform">
                    Apply to Become Elder
                  </button>
                </div>
              )}

              {/* Community Activity Feed */}
              <div className="glass-strong rounded-xl shadow-lg fade-in stagger-6">
                <div className="p-6 border-b border-[#cda82c]/20">
                  <h2 className="text-2xl font-bold text-white">📋 Community Activity Feed</h2>
                  <p className="text-gray-300 text-sm mt-1">Recent community actions and updates</p>
                </div>

                <div className="p-6 space-y-4 max-h-64 overflow-y-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#cda82c]/20 text-[#cda82c] rounded-full flex items-center justify-center text-sm">
                      ✓
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        <strong>Elder Muthoni</strong> verified "Kikuyu Traditional Medicine"
                      </p>
                      <p className="text-gray-400 text-xs">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#c41e25]/20 text-[#c41e25] rounded-full flex items-center justify-center text-sm">
                      🎤
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        <strong>Joseph Kariuki</strong> shared "Rites of Passage Songs"
                      </p>
                      <p className="text-gray-400 text-xs">4 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#cda82c]/20 text-[#cda82c] rounded-full flex items-center justify-center text-sm">
                      💰
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        Community fund received <strong>0.5 ETH</strong> from heritage licensing
                      </p>
                      <p className="text-gray-400 text-xs">6 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#cda82c]/20 text-[#cda82c] rounded-full flex items-center justify-center text-sm">
                      🏪
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        Netflix licensed <strong>"Origin Stories Collection"</strong> for documentary
                      </p>
                      <p className="text-gray-400 text-xs">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Moved to left side */}
              <div className="glass-strong rounded-xl shadow-lg p-6 hover-lift fade-in">
                <h3 className="font-bold text-lg text-white mb-4">⚡ Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <a
                    href="/create"
                    className="block w-full px-4 py-3 bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-black font-semibold rounded-lg transition-transform hover:scale-105 text-center"
                  >
                    🎤 Create Heritage
                  </a>
                  <a
                    href="/marketplace"
                    className="block w-full px-4 py-3 glass text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center"
                  >
                    🏪 Browse Marketplace
                  </a>
                  <button className="w-full px-4 py-3 glass text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                    📊 View Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Become Validator CTA */}
              {!isValidator && (
                <div className="glass-strong rounded-xl p-6 text-white shadow-lg hover-lift fade-in stagger-5">
                  <div className="text-4xl mb-3">👴👵</div>
                  <h3 className="font-bold text-xl mb-2 text-[#cda82c]">Become an Elder Validator</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Help preserve authentic African heritage by verifying cultural content. Earn rewards for your
                    validation work.
                  </p>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-black font-semibold rounded-lg hover:scale-105 transition-transform">
                    Apply to Become Elder
                  </button>
                </div>
              )}

              {/* Community Impact */}
              <div className="glass-strong rounded-xl shadow-lg p-6 hover-lift fade-in stagger-6">
                <h3 className="font-bold text-lg text-white mb-4">🌍 Community Impact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Verification Rate</span>
                      <span className="font-semibold text-[#cda82c]">
                        {totalHeritages > 0 ? Math.round((verifiedHeritages / totalHeritages) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#cda82c] to-[#c41e25] h-2 rounded-full transition-all"
                        style={{
                          width: `${totalHeritages > 0 ? (verifiedHeritages / totalHeritages) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#cda82c]/20">
                    <h4 className="font-semibold text-white mb-3">Community Fund Usage</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Education Support</span>
                        <span className="font-semibold text-[#cda82c]">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Elder Care</span>
                        <span className="font-semibold text-[#cda82c]">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cultural Events</span>
                        <span className="font-semibold text-[#cda82c]">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Equipment & Tech</span>
                        <span className="font-semibold text-[#cda82c]">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Emergency Fund</span>
                        <span className="font-semibold text-[#c41e25]">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - My Heritage Items (Full Width) */}
          {myHeritages && myHeritages.length > 0 && (
            <div className="glass-strong rounded-xl shadow-lg fade-in">
              <div className="p-6 border-b border-[#cda82c]/20">
                <h2 className="text-2xl font-bold text-white">📚 My Heritage Items</h2>
                <p className="text-gray-300 text-sm mt-1">Cultural assets you've contributed to preserve</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {myHeritages.map((tokenId: bigint) => {
                    const heritage = allHeritages?.[Number(tokenId)];
                    if (!heritage) return null;

                    return (
                      <div key={tokenId.toString()} className="glass rounded-lg p-4 hover-lift">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-white text-sm">{heritage.title}</h4>
                          {heritage.verified ? (
                            <span className="bg-[#cda82c]/20 text-[#cda82c] text-xs px-2 py-1 rounded-full">
                              ✓ Verified
                            </span>
                          ) : (
                            <span className="bg-[#c41e25]/20 text-[#c41e25] text-xs px-2 py-1 rounded-full">
                              ⏳ Pending
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                          <p>Type: {heritage.culturalType}</p>
                          <p>Language: {heritage.language}</p>
                          <p className="font-semibold text-[#cda82c]">
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

        {/* Community Chat Component */}
        {showChat && (
          <div className="fixed bottom-4 right-4 w-80 h-96 glass-strong rounded-xl shadow-2xl z-50 chat-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-[#cda82c]/20">
              <h3 className="font-bold text-white flex items-center">
                💬 Community Chat
                <span className="ml-2 w-2 h-2 bg-[#cda82c] rounded-full pulse-slow"></span>
              </h3>
              <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="flex flex-col h-80">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`message-fade-in ${msg.type === "system" ? "text-center" : ""}`}>
                    {msg.type === "verification" ? (
                      <div className="bg-[#cda82c]/20 border border-[#cda82c]/30 rounded-lg p-2 text-xs">
                        <span className="text-[#cda82c]">🔔 {msg.message}</span>
                        <div className="text-gray-400 text-xs mt-1">{msg.timestamp.toLocaleTimeString()}</div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#cda82c] text-xs font-semibold">{msg.user}</span>
                          <span className="text-gray-500 text-xs">{msg.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-sm text-white">{msg.message}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[#cda82c]/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Share with the community..."
                    className="flex-1 px-3 py-2 glass-input rounded-lg text-white placeholder-gray-400 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-[#cda82c] to-[#c41e25] text-black font-semibold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                  >
                    📤
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
