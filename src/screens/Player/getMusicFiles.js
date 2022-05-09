import { DownloadDirectoryPath, readDir } from "react-native-fs";
import MusicMetadataWrapper from "react-native-music-metadata";
import { loadTracks, saveTracks } from "../../data/Schema";

// 1. Searches for files with .mp3 extension
// 2. Gets metadata for tracks
// 3. Saves metadata to track Realm
// 3. Loads all tracks from track Realm
export default async function getMusicFiles() {
  const dirPath = DownloadDirectoryPath;
  return readDirRecursive(dirPath)
    .then(tracks =>
      tracks.length > 0
        ? MusicMetadataWrapper.getMetadata(tracks.flat(Infinity))
        : Promise.reject(`No tracks found in ${dirPath} folder!`),
    )
    .then(tracks => saveTracks(tracks))
    .then(() => loadTracks());
}
const readDirRecursive = async dirPath => {
  const files = await readDir(dirPath);
  const promises = files.map(async f => {
    if (f.isDirectory()) {
      return await readDirRecursive(f.path);
    } else {
      return f.path.endsWith(".mp3") ? `file://${f.path}` : null;
    }
  });
  return await Promise.all(promises);
};
