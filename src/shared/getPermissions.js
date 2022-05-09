import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
const PERMISSIONS_NEEDED = [
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];
export default async function getPermissions() {
  return checkMultiple(PERMISSIONS_NEEDED)
    .then(result =>
      PERMISSIONS_NEEDED.map(per => result[per] === RESULTS.GRANTED).every(
        el => el === true,
      )
        ? result
        : requestMultiple(PERMISSIONS_NEEDED),
    )
    .then(result =>
      PERMISSIONS_NEEDED.map(per => result[per] === RESULTS.GRANTED).every(
        el => el === true,
      ),
    );
}
