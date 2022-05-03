import * as RNFS from "react-native-fs";
import MusicMetadataWrapper from "react-native-music-metadata";
export default function getMusicFiles() {
  RNFS.readDir(RNFS.DownloadDirectoryPath).then(files => console.log(files));
  MusicMetadataWrapper.getMetadata([
    `file://${RNFS.DownloadDirectoryPath}/206.mp3`,
  ])
    .then(tracks => {
      tracks.forEach(track => {
        console.log(track);
      });
    })
    .catch(err => {
      console.log(err);
    });
}
