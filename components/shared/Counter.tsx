import React, { useEffect, useState } from 'react';
import { get, ref, set, onValue } from 'firebase/database';
import { database } from '../../firebase';

const Counter = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, 'storyCount');
    const listener = onValue(dbRef, (snapshot) => {
      setCount(snapshot.val());
    });

    return () => listener.off(); // Clean up listener on component unmount
  }, []);

  return (
    <div>Total Stories Generated: {count}</div>
  );
};

export const incrementStoryCount = async () => {
  const dbRef = ref(database, 'storyCount');
  const snapshot = await get(dbRef);
  
  if (snapshot.exists()) {
    set(dbRef, snapshot.val() + 1);
  } else {
    set(dbRef, 1);
  }
};

export default Counter;
