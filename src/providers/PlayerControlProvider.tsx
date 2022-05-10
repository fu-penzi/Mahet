import React, { useEffect, useState } from "react";
import TrackPlayer, {
  Capability,
  // Event,
  State,
  usePlaybackState,
  // useTrackPlayerEvents,
} from "react-native-track-player";
import getMusicFiles from "src/screens/Player/getMusicFiles";
import getPermissions from "src/shared/getPermissions";
// import Track from "src/data/dataTypes";
const PlayerControlContext = React.createContext<any>(undefined);
// const events = [Event.PlaybackTrackChanged, Event.PlaybackError];
function PlayerControlProvider({ children }: any) {
  // const [track, setTracks] = useState<Track | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const playbackState = usePlaybackState();
  // !!!! Triggers every app run
  //TO CHANGE
  useEffect(() => {
    getPermissions()
      .then(areGranted =>
        areGranted
          ? getMusicFiles()
          : Promise.reject(
              "Could not get permissions, clear storage and try again.",
            ),
      )
      .catch(err => console.error(err));
  }, []);
  //
  //
  useEffect(() => {
    const setupIfNecessary = async () => {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack !== null) {
        return;
      }
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
    };
    setupIfNecessary().catch(err => console.error(err));
  }, []);
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
