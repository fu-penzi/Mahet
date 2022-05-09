import Realm from "realm";
const TrackSchema = {
  name: "Track",
  properties: {
    url: "string",
    title: "string?",
    artist: "string?",
    album: "string?",
    duration: "double",
    artwork: "string?",
  },
  primaryKey: "url",
};
const saveTracks = async tracks => {
  const realm = await Realm.open({
    path: "maheta",
    schema: [TrackSchema],
  });
  realm.write(() => {
    realm.deleteAll();
  });
  tracks.forEach(track => {
    realm.write(() => {
      track = realm.create("Track", {
        url: track.uri,
        title: track.title,
        artist: track.artist,
        album: track.albumName,
        duration: track.duration,
        artwork: null,
      });
    });
  });
};
const loadTracks = async () => {
  const realm = await Realm.open({
    path: "maheta",
    schema: [TrackSchema],
  });
  const tracks = realm.objects("Track");
  return tracks.map(track => ({
    url: track.url,
    title: track.title,
    artist: track.artist,
    album: track.album,
    duration: track.duration,
    artwork: track.artwork,
  }));
};
export { saveTracks, loadTracks };
