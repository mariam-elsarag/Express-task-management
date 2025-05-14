import React from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import Search from "./Search";

interface columnsInterface {
  field?: string;
  header?: string;
}
interface tableContainerInterface {
  columns: [columnsInterface];
  data: [];
  loading: boolean;
  onPageChange: (page: number) => void;
  totalCount: number;
  currentPage: number;
  query: object;
  setQuery: () => void;
}
const Table_Container: React.FC<tableContainerInterface> = ({
  columns,
  data,
  loading,
  onPageChange,
  totalCount,
  currentPage = 1,
  query,
  setQuery,
}) => {
  return (
    <div className="grid gap-2">
      <Search query={query} setQuery={setQuery} />
      <Table columns={columns} data={data} loading={loading} />
      <Pagination
        onPageChange={onPageChange}
        totalCount={totalCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table_Container;
