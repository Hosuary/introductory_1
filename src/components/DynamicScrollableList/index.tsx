import { useState, useRef, useCallback } from "react";
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

  const currentListLength = pageNumber * lengthOfPage;
  const hasMore = items.length !== currentListLength;

  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (intersectionRef.current) {
      intersectionRef.current.disconnect();
    }

    intersectionRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    if (node) {
      intersectionRef.current.observe(node)
    }
  }, [hasMore]);

  return (
    <div className={styles.List}>
      {items
        .slice(0, pageNumber * lengthOfPage)
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
    </div>
  )
};

export default DynamicScrollableList;