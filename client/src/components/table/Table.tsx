import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import Empty from "../ui/empty/Empty";
import { Column } from "primereact/column";
import React from "react";

interface columnsInterface {
  field?: string;
  header?: string;
}
interface tableInterface {
  columns: [columnsInterface];
  data: [];
  loading: boolean;
  tbodyClassName?: string;
}
const Table: React.FC<tableInterface> = ({
  columns,
  data,
  loading,
  tbodyClassName = "",
}) => {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <table className="w-full border-collapse">
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="border-b border-[#F5F5F6]">
                {columns?.map((_, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={`${tbodyClassName} text-nowrap text-center bg-white py-5 px-4 min-w-12`}
                  >
                    <Skeleton height="16px" className="!rounded-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <DataTable
          value={data}
          tableStyle={{ width: "100%" }}
          emptyMessage={<Empty page="teams" className="!min-h-[40vh]" />}
        >
          {columns?.map(
            (item, index) =>
              item && (
                <Column key={index} field={item.field} header={item.header} />
              )
          )}
        </DataTable>
      )}
    </div>
  );
};

export default Table;
