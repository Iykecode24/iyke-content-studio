import { useState } from "react";
import { Link2, CheckCircle, XCircle, Plus } from "lucide-react";

const PLATFORMS = [
  { id: "youtube", name: "YouTube", desc: "Upload videos up to 15 minutes (unverified) or longer (verified channel)", color: "#FF0000", connected: false },
  { id: "instagram", name: "Instagram", desc: "Post Reels, videos up to 90 seconds for feed or 15 minutes for IGTV", color: "#E1306C", connected: true, account: "@iykecontents" },
  { id: "tiktok", name: "TikTok", desc: "Post videos up to 10 minutes with AI-generated captions", color: "#000000", connected: false },
  { id: "facebook", name: "Facebook", desc: "Publish to Pages, Groups, or personal timeline", color: "#1877F2", connected: false },
  { id: "linkedin", name: "LinkedIn", desc: "Share professional content and thought leadership videos", color: "#0A66C2", connected: false },
  { id: "twitter", name: "X (Twitter)", desc: "Post short-form videos up to 2 min 20 sec with thread support", color: "#000000", connected: false },
];

export default function ConnectedAccounts() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      <div><h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Link2 className="w-8 h-8 text-amber-400" /> Connected Accounts</h1><p className="text-white/45 text-sm">Connect your social media accounts to enable direct publishing</p></div>
      <div className="space-y-4">
        {PLATFORMS.map(p => (
          <div key={p.id} className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0" style={{ background: p.color }}>{p.id[0].toUpperCase()}{p.id[1].toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-white">{p.name}</span>
                {p.connected ? (
                  <span className="flex items-center gap-1 text-[10px] text-green-400 font-semibold"><CheckCircle className="w-3 h-3" /> Connected</span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-white/30"><XCircle className="w-3 h-3" /> Not connected</span>
                )}
              </div>
              {p.connected && p.account && <div className="text-xs text-white/50">{p.account}</div>}
              <p className="text-xs text-white/35 mt-1 leading-relaxed">{p.desc}</p>
            </div>
            <div className="flex-shrink-0">
              {p.connected ? (
                <button className="text-xs text-red-400 border border-red-400/25 px-3 py-2 rounded-xl hover:bg-red-500/10 transition-all">Disconnect</button>
              ) : (
                <button className="flex items-center gap-1.5 text-xs btn-gold px-3 py-2 rounded-xl"><Plus className="w-3.5 h-3.5" /> Connect</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="glass-gold rounded-xl p-4 flex items-start gap-3">
        <span className="text-amber-400 text-lg mt-0.5">ⓘ</span>
        <div className="text-sm text-white/60">All social media connections use OAuth 2.0 for secure authentication. We never store your social media passwords. Access can be revoked at any time from your social media account settings.</div>
      </div>
    </div>
  );
}
