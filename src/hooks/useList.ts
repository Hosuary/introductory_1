import { useState } from "react";
import generator from "../methods/generator";


const useList = (length: number) => {
  // We can expand logic of this component: add fetches, loading, etc.
  // We don"t need use the setter of state in our task

  const [list] = useState(generator(length));

  return {
    list
  }
};

export default useList;