
import DynamicScrollableList from "../../components/DynamicScrollableList";
import useList from "../../hooks/useList";


const LENGTH_OF_ITEMS = 320;
const LENGTH_OF_PAGE = 100;


const Index = () => {
  const { list } = useList(LENGTH_OF_ITEMS);

  return (
    <DynamicScrollableList
      items={list}
      lengthOfPage={LENGTH_OF_PAGE}
    />
  )
};

export default Index;