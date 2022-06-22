import {useState, useRef, useCallback, useMemo} from "react";
import styles from "./style.module.scss";


type Props = {
  items: {
    id: number,
    label: string
  }[],
  lengthOfPage: number
};


const DynamicScrollableList = ({ items, lengthOfPage }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const intersectionRef = useRef<IntersectionObserver | null>(null);

  const currentListLength = useMemo(() => {
    const limit = items.length;
    const newLength = pageNumber * lengthOfPage;
    return newLength > limit ? limit : newLength;
  }, [pageNumber, lengthOfPage]);

  const hasMoreItems = useMemo(() => items.length !== currentListLength, [items, currentListLength]);

  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (intersectionRef.current) {
      intersectionRef.current.disconnect();
    }

    intersectionRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreItems) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    if (node) {
      intersectionRef.current.observe(node)
    }
  }, [hasMoreItems]);

  const MappedItems = useCallback(() => {
    return (
      <>
        {items
          .slice(0, currentListLength)
          .map(({ id, label }, index) => (
            <div
              key={id}
              className={styles.Item}
              ref={index + 1 === currentListLength ? lastItemRef : null}
            >
              {label}
            </div>
          ))
        }
      </>
    )
  }, [items, currentListLength, lastItemRef]);

  return (
    <div className={styles.List}>
      <MappedItems />
    </div>
  )
};

export default DynamicScrollableList;