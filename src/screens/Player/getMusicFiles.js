import { file } from "@babel/types";
import { DownloadDirectoryPath, readDir } from "react-native-fs";
import MusicMetadataWrapper from "react-native-music-metadata";
export default async function getMusicFiles() {
  const dirPath = DownloadDirectoryPath;
  // readDirRecursive(dirPath).then(() => console.log(s));
  const songs = await readDirRecursive(dirPath);
  MusicMetadataWrapper.getMetadata(songs[0][0])
    .then(tracks => {
      tracks.forEach(track => {
        console.log(track);
      });
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
      return `file://${f.path}`;
    }
  });
  return await Promise.all(promises);
};
