import { DownloadDirectoryPath, readDir } from "react-native-fs";
import MusicMetadataWrapper from "react-native-music-metadata";
export default async function getMusicFiles() {
  const dirPath = DownloadDirectoryPath;
  return readDirRecursive(dirPath)
    .then(tracks => MusicMetadataWrapper.getMetadata(tracks.flat(Infinity)))
    .then(tracks => {
      console.log(tracks);
      return tracks;
    })
    .catch(err => {
      console.log(err);
    });
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
