import React, { useState } from "react";
import TrackPlayer, {
  // Event,
  State,
  usePlaybackState,
  // useTrackPlayerEvents,
} from "react-native-track-player";
// import Track from "src/data/dataTypes";
const PlayerControlContext = React.createContext<any>(undefined);
// const events = [Event.PlaybackTrackChanged, Event.PlaybackError];
function PlayerControlProvider({ children }: any) {
  // const [track, setTracks] = useState<Track | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const playbackState = usePlaybackState();
  const togglePlaying = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      console.warn("Cannot play because queue is empty.");
      // TODO: Perhaps present an error or restart the playlist?
    } else {
      if (playbackState !== State.Playing && !playing) {
        await TrackPlayer.play();
      } else if (playing) {
        await TrackPlayer.pause();
      }
      setPlaying(state => !state);
    }
  };
  //   useTrackPlayerEvents(events, event => {
  //     if (event.type === Event.PlaybackError) {
  //       console.warn("An error occured while playing the current track.");
  //     }
  //     if (event.type === Event.PlaybackTrackChanged) {
  //       setTracks(event.state);
  //     }
  //   });

  // useEffect(() => {
  //   TrackPlayer.getCurrentTrack().then(t => {
  //     setTracks(t);
  //   });
  // }, []);

  return (
    <PlayerControlContext.Provider value={{ playing, togglePlaying }}>
      {children}
    </PlayerControlContext.Provider>
  );
}
const usePlayerControl = () => React.useContext(PlayerControlContext);
export { PlayerControlProvider, usePlayerControl };
