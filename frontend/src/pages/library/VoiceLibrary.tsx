import React, { useState, useRef, useEffect } from 'react';
import { Mic, Upload, Play, Square, Trash2, Edit2, Copy, Search, AlertCircle, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VoiceLibrary() {
  const [voices, setVoices] = useState<any[]>([
    { id: "1", name: "Rachel", lang: "English (US)", gender: "Female", style: "Conversational", provider: "ElevenLabs", uses: 12 },
    { id: "2", name: "Adam", lang: "English (US)", gender: "Male", style: "Deep Narrator", provider: "ElevenLabs", uses: 8 }
  ]);
  const [search, setSearch] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  
  const filtered = voices.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        handleSaveVoice(audioBlob, "Recorded Voice Clone");
      };
      
      recorder.start();
      setIsRecording(true);
      
      let time = 0;
      const interval = setInterval(() => {
        time++;
        setRecordingTime(time);
        if (mediaRecorder.current && mediaRecorder.current.state === "inactive") clearInterval(interval);
      }, 1000);
      
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(t => t.stop());
    }
    setIsRecording(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['audio/wav', 'audio/mpeg', 'audio/flac', 'audio/mp4', 'audio/x-m4a'];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(wav|mp3|flac|m4a)$/i)) {
        alert("Invalid file format. Please upload WAV, MP3, FLAC, or M4A.");
        return;
      }
      handleSaveVoice(file, file.name);
    }
  };

  const handleSaveVoice = async (blob: Blob | File, name: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setVoices([...voices, { 
        id: Math.random().toString(), 
        name, 
        lang: 'Custom', 
        gender: 'Auto', 
        style: 'Clone', 
        provider: 'ElevenLabs', 
        uses: 0 
      }]);
      setIsUploading(false);
      setRecordingTime(0);
    }, 2000);
  };

  const deleteVoice = (id: string) => {
    setVoices(voices.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Mic className="w-8 h-8 text-amber-400" /> Voice Library</h1>
          <p className="text-white/45 text-sm">Clone, manage, and assign custom voices powered by ElevenLabs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clone Voice Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-amber-400/20">
            <h3 className="text-lg font-medium text-white mb-4">Clone New Voice</h3>
            <div className="space-y-4">
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                {isRecording ? (
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }} className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                    <Mic className="w-8 h-8 text-red-500" />
                  </motion.div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center mb-4">
                    <Mic className="w-8 h-8 text-amber-400" />
                  </div>
                )}
                <h4 className="text-white font-medium mb-1">Record Sample</h4>
                <p className="text-sm text-white/50 mb-4">Speak clearly for at least 1 minute.</p>
                {isRecording ? (
                  <div className="space-y-3 w-full">
                    <div className="text-2xl font-mono text-red-400">
                      {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                    </div>
                    <button onClick={stopRecording} className="btn-primary bg-red-500 hover:bg-red-600 w-full flex items-center justify-center gap-2">
                      <Square className="w-4 h-4" /> Stop & Clone
                    </button>
                  </div>
                ) : (
                  <button onClick={startRecording} className="btn-primary w-full flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" /> Start Recording
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 text-white/30">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-sm">OR</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              <label className="bg-black/40 border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-amber-400/50 transition-colors">
                <Upload className="w-8 h-8 text-white/40 mb-3" />
                <h4 className="text-white font-medium mb-1">Upload Audio File</h4>
                <p className="text-sm text-white/50 text-center">WAV, MP3, FLAC, M4A up to 10MB</p>
                <input type="file" accept=".wav,.mp3,.flac,.m4a" className="hidden" onChange={handleFileUpload} />
              </label>
              {isUploading && (
                <div className="flex items-center justify-center gap-2 text-amber-400 text-sm">
                  <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"></div>
                  Cloning voice on ElevenLabs...
                </div>
              )}
            </div>
          </div>
          <div className="glass-card bg-blue-500/10 border-blue-500/30 p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="text-sm text-blue-200/80">
              For best results, upload high-quality audio without background noise.
            </div>
          </div>
        </div>

        {/* Voice Library Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" /><input className="input-studio pl-9" placeholder="Search voices..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <button className="px-4 py-2.5 rounded-xl btn-ghost text-white/60 flex items-center gap-2 text-sm"><Filter className="w-4 h-4" /> Filter</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(voice => (
              <div key={voice.id} className="glass-card group relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black" style={{ background: "rgba(251,191,36,0.15)" }}><span className="text-amber-400">{voice.name[0]}</span></div>
                  <div><div className="text-sm font-bold text-white">{voice.name}</div><div className="text-xs text-white/40">{voice.lang} • {voice.gender}</div></div>
                </div>
                <div className="flex justify-between text-xs text-white/40 mb-4">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>{voice.style}</span>
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>{voice.provider}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30">Used in {voice.uses} projects</span>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-amber-400 border border-amber-400/30 hover:bg-amber-500/10 transition-all"><Play className="w-3 h-3" /> Preview</button>
                </div>
                {/* Admin Actions */}
                <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded bg-black/40 hover:bg-black text-white/60 hover:text-white" title="Edit"><Edit2 className="w-3 h-3" /></button>
                  <button onClick={() => deleteVoice(voice.id)} className="p-1.5 rounded bg-black/40 hover:bg-red-500/20 text-white/60 hover:text-red-400" title="Delete"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
