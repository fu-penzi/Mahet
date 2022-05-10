import React, { useEffect, useState } from "react";
import Track from "src/data/dataTypes";
import { loadTracks } from "src/data/Schema";
const DataContext = React.createContext<Track[] | undefined>(undefined);
// const defaultTrack: Track = {
//   title: "TrackNotFound",
//   url: string,
//   title?: string,
//   artist?: string
//   album: ''.
//   duration: number
//   artwork: undefined;
// };
function DataProvider({ children }: any) {
  const [tracks, setTracks] = useState<Track[] | undefined>(undefined);
  useEffect(() => {
    loadTracks()
      .then(t => setTracks(t))
      .catch(err => console.error(err));
  }, []);

  return <DataContext.Provider value={tracks}>{children}</DataContext.Provider>;
}
const useData = () => React.useContext(DataContext);
export { DataProvider, useData };
