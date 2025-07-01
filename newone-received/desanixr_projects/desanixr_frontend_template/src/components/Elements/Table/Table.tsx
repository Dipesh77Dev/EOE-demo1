import { ArchiveIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import * as React from 'react';
import './table.css';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  alignment?: string;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
};

export const DxrTable = <Entry extends { _id: string }>({ data, columns }: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80 table-dxrtable-nodatafound">
        <ArchiveIcon className="w-16 h-16" />
        <h4>No Entries Found</h4>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-900 text-gray-100">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.title + index}
                      scope="col"
                      className="px-1 py-2 text-xs font-medium tracking-wider text-center uppercase border border-gray-200"
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((entry, entryIndex) => (
                  <tr key={entry?._id || entryIndex} className="odd:bg-white even:bg-gray-200">
                    {columns.map(({ Cell, field, title, alignment }, columnIndex) => (
                      <td
                        key={title + columnIndex}
                        className={clsx(
                          'px-1 py-1 text-sm font-medium whitespace-nowrap border border-gray-200',
                          alignment
                        )}
                      >
                        {Cell ? <Cell entry={entry} /> : entry[field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
