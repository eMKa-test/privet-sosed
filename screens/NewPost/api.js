import getHouses from "../../lib/api/activity/get-houses";
import getTags from "../../lib/api/activity/get-tags";
import listNewPostDocs from "../../lib/api/files/list/new-post";
import addPost from "../../lib/api/activity/add-post";
import editPost from "../../lib/api/activity/edit-post";

export async function fetchHouses(callback) {
  let houses = [];
  try {
    houses = await getHouses();
  } finally {
    callback(houses);
  }
}

export async function fetchTags(callback) {
  let tags = [];
  try {
    tags = await getTags();
  } finally {
    callback(tags);
  }
}

export async function fetchFiles(houseId, callback) {
  let files = [];
  try {
    files = await listNewPostDocs(houseId);
  } finally {
    callback(files);
  }
}

export async function createPost(body, onError, onDone) {
  try {
    await addPost(body, (err, data) => {
      if (err) {
        return onError(err);
      }
      onDone(data);
    });
  } catch (e) {
    onError(e.message);
  }
}

export async function changePost(body, onError, onDone) {
  try {
    await editPost(body, (err, data) => {
      if (err) {
        return onError(err);
      }
      onDone(data);
    });
  } catch (e) {
    onError(e.message);
  }
}
