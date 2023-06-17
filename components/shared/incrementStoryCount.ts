import { getDatabase, ref, get, set } from "firebase/database";

const incrementStoryCount = async () => {
  const db = getDatabase();
  const dbRef = ref(db, "storyCount");

  // Get current value and increment it
  const countSnapshot = await get(dbRef);
  const currentCount = countSnapshot.val() || 0;
  set(dbRef, currentCount + 1);
};

export default incrementStoryCount;
