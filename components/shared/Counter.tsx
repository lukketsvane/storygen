import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { Box } from "@chakra-ui/react";

const Counter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "storyCount");
    const callback = (snapshot: any) => {
      setCount(snapshot.val());
    };

    onValue(dbRef, callback);

    return () => {
      off(dbRef, callback); // Detach the listener
    };
  }, []);

  return <Box as="span" color="teal.500" fontWeight="bold">{count}</Box>;
};

export default Counter;
