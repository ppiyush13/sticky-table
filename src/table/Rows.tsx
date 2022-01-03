import { Row } from 'react-table';
import { Virtuoso } from 'react-virtuoso';

interface RowsProps<D extends object = {}> {
  virtual: boolean;
  rows: Row<D>[];
  prepareRow: (row: Row<D>) => void;
}

export const Rows = <D extends object = {}>({
  virtual,
  rows,
  prepareRow,
}: RowsProps<D>) => {
  const rowRenderer = (index: number) => {
    const row = rows[index];
    prepareRow(row);

    return (
      <div {...row.getRowProps()} className={'tr'}>
        {row.cells.map((cell) => (
          <div {...cell.getCellProps()} className="td">
            {cell.render('Cell')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {virtual ? (
        <>
          <Virtuoso
            overscan={1000}
            defaultItemHeight={35}
            useWindowScroll={true}
            data={rows}
            itemContent={rowRenderer}
            // components={{
            //   ScrollSeekPlaceholder: ({ height }) => {
            //     return (
            //       <div
            //         style={{
            //           height,
            //           borderBottom: '1px solid #ddd',
            //           padding: '0.5rem 1rem',
            //         }}
            //       >
            //         loading ...
            //       </div>
            //     );
            //   },
            // }}
            // scrollSeekConfiguration={{
            //   enter: (velocity) => Math.abs(velocity) > 500,
            //   exit: (velocity) => Math.abs(velocity) < 10,
            // }}
          />
        </>
      ) : (
        rows.map((row, index) => rowRenderer(index))
      )}
    </>
  );
};
