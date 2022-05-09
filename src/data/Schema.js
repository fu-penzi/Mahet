import Realm from "realm";
const TrackSchema = {
  name: "Track",
  properties: {
    uri: "string",
    title: "string?",
    artist: "string?",
    albumName: "string?",
    duration: "double",
    artwork: "string?",
  },
  primaryKey: "uri",
};
const saveTracks = async tracks => {
  const realm = await Realm.open({
    path: "maheta",
    schema: [TrackSchema],
  });
  realm.write(() => {
    realm.deleteAll();
  });
  console.log("Saving track metadata to db", tracks);
  tracks.forEach(track => {
    realm.write(() => {
      track = realm.create("Track", {
        uri: track.uri,
        title: track.title,
        artist: track.artist,
        albumName: track.albumName,
        duration: track.duration,
        // artwork: "https://picsum.photos/id/1016/200/300",
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
  let loadedTracks = tracks.map(track => ({
    uri: track.uri,
    title: track.title,
    artist: track.artist,
    albumName: track.albumName,
    duration: track.duration,
    artwork: track.artwork,
  }));
  console.log("Loading tracks from db", loadedTracks);
  return loadedTracks;
};
export { saveTracks, loadTracks };
