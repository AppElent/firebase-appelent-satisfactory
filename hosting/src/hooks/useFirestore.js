import { useEffect, useState } from 'react';
import {
  onSnapshot
} from 'firebase/firestore';

export const useCollection = (
  query
) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
      const tempdata = [];
      querySnapshot.forEach((doc) => {
        tempdata.push({ id: doc.id, ...doc.data() });
      });
      setData(tempdata);
      console.log('Useeffect loopt');
    }, []);

    // return unsubscribe;
    return () => {
      console.log('subsubscribe');
      unsubscribe();
    };
  });

  return data;
};

export default useCollection;
