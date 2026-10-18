import React from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
const PlayerContext = createContext(null);
export function PlayerProvider({ children }) {
  const audioRef = useRef(null); const [current, setCurrent] = useState(null); const [queue, setQueue] = useState([]); const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [duration, setDuration] = useState(0); const [volume, setVolume] = useState(0.75);
  const playSong = async (song, list = queue) => { if (!song) return; if (current?._id === song._id && audioRef.current) { try { await audioRef.current.play(); setPlaying(true); } catch {} return; } setQueue(list?.length ? list : [song]); setCurrent(song); setProgress(0); setPlaying(true); };
  const toggle = async () => { const audio = audioRef.current; if (!audio || !current) return; if (audio.paused) { try { await audio.play(); setPlaying(true); } catch { setPlaying(false); } } else { audio.pause(); setPlaying(false); } };
  useEffect(() => { if (!current || !audioRef.current) return; const audio = audioRef.current; audio.load(); audio.volume = volume; audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }, [current?._id]);
  const move = direction => { if (!queue.length || !current) return; const index = queue.findIndex(s => s._id === current._id); const next = (index + direction + queue.length) % queue.length; playSong(queue[next], queue); };
  return <PlayerContext.Provider value={{ audioRef,current,queue,playing,progress,duration,volume,playSong,toggle,move,setProgress,setDuration,setVolume }}>
    {children}
    <audio ref={audioRef} src={current?.audioUrl || ''} onTimeUpdate={e=>setProgress(e.currentTarget.currentTime)} onLoadedMetadata={e=>setDuration(e.currentTarget.duration || 0)} onEnded={()=>move(1)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setPlaying(false)} />
  </PlayerContext.Provider>;
}
export const usePlayer = () => useContext(PlayerContext);
