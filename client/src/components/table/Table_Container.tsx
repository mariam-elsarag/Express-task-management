import React from "react";
import Table from "./Table";

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
}
const Table_Container: React.FC<tableContainerInterface> = ({
  columns,
  data,
  loading,
  onPageChange,
  totalCount,
  currentPage = 1,
}) => {
  return (
    <div>
      <Table columns={columns} data={data} loading={loading} />
    </div>
  );
};

export default Table_Container;
