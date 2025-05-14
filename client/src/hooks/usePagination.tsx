import { useMemo } from "react";

export const DOTS = "...";

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
  totalCount: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  currentPage,
}: UsePaginationProps): (number | string)[] => {
  const paginationRange = useMemo<(number | string)[]>(() => {
    const totalPageCount = totalCount;

    if (totalPageCount <= 4) {
      return range(1, totalPageCount);
    }

    return [...range(1, 3), DOTS, totalPageCount];
  }, [totalCount, currentPage]);

  return paginationRange;
};
