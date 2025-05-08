import { useEffect, useState } from "react";
import axiosInstance from "../servicses/axiosInstance";

interface PaginationResponse<T> {
  page: number;
  pages: number;
  data: T[];
}

function usePaginatedData<T = any>(
  endpoint: string,
  fetchOnEvent = false,
  type: "pages" | "scroll" = "pages"
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  const [refetchData, setRefetchData] = useState<unknown>();
  const [data, setData] = useState<T[]>([]);

  const [query, setQuery] = useState<Record<string, any> | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const fetchData = async (currentPage: number): Promise<void> => {
    try {
      setLoading(true);

      const response = await axiosInstance.get<PaginationResponse<T>>(
        endpoint,
        {
          params: { page: currentPage, ...query },
        }
      );

      const resData = response.data;

      setPages(resData.pages);
      setPage(resData.page);
      setHasMore(currentPage < resData.pages);

      const fetchedData = resData.results || [];

      if (Array.isArray(fetchedData)) {
        if (type === "pages") {
          setData(fetchedData);
        } else {
          setData((prevData) => {
            const allData =
              currentPage === 1
                ? [...fetchedData]
                : [...prevData, ...fetchedData];
            const uniqueData = allData.reduce<T[]>((acc, item) => {
              if (!acc.some((existing) => existing.id === item.id)) {
                acc.push(item);
              }
              return acc;
            }, []);
            return uniqueData;
          });
        }
      }
    } catch (err: any) {
      console.error("error", err?.response);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (pageNumber: number): void => {
    fetchData(pageNumber);
  };

  useEffect(() => {
    if (!fetchOnEvent) {
      setPage(1);
      fetchData(1);
    }
  }, [fetchOnEvent]);

  useEffect(() => {
    if (refetchData || query) {
      setPage(1);
      fetchData(1);
    }
  }, [refetchData, query]);

  const handleScroll = (): void => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (innerHeight + scrollTop + 1 >= scrollHeight && !loading && hasMore) {
      const nextPage = page + 1;
      fetchData(nextPage);
      setPage((prev) => prev + 1);
    }
  };

  return {
    loading,
    hasMore,
    page,
    pages,
    fetchData,
    data,
    setData,
    setRefetchData,
    setQuery,
    query,
    handlePagination,
    handleScroll,
  };
}

export default usePaginatedData;
