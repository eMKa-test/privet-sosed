import React from "react";
import * as MediaLibrary from "expo-media-library";
import {SortBy} from "expo-media-library";

async function getAssets({first, after}, callback) {
  const {status} = await MediaLibrary.requestPermissionsAsync();
  if (!status === "granted") {
    return;
  }
  const {assets, endCursor, hasNextPage} = await MediaLibrary.getAssetsAsync({
    first,
    after,
    sortBy: [SortBy.modificationTime],
  });
  if (Array.isArray(assets)) {
    callback({assets, endCursor, hasNextPage});
  }
}

export default function useCameraRoll({first = 10}) {
  const [photos, setPhotos] = React.useState([]);
  const [after, setAfter] = React.useState(null);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const getPhotos = React.useCallback(async () => {
    if (!hasNextPage) {
      return null;
    }
    getAssets({first, after}, ({assets, endCursor, hasNextPage: hnp}) => {
      if (after === endCursor) {
        return;
      }
      setPhotos([...photos, ...assets]);
      setAfter(endCursor);
      setHasNextPage(hnp);
    });
  }, [after, hasNextPage, photos]);

  return [photos, getPhotos];
}
