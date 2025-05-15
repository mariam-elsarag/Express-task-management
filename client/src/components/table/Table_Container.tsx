import React, { ReactNode } from "react";
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
  tableError?: ReactNode;
  noSearchWithEnter?: boolean;
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
  tableError,
  noSearchWithEnter = false,
}) => {
  return (
    <div className="grid gap-2">
      <Search
        query={query}
        setQuery={setQuery}
        noSearchWithEnter={noSearchWithEnter}
      />
      <Table columns={columns} data={data} loading={loading} />
      {tableError}
      <Pagination
        onPageChange={onPageChange}
        totalCount={totalCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table_Container;
