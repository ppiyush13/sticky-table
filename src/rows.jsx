import { Virtuoso } from 'react-virtuoso';

export const Rows = ({ virtual, rows, prepareRow,   }) => {
    const rowRenderer = (index, ...args)=>{
        const row = rows[index];
        prepareRow(row);
        return (
            <div {...row.getRowProps()} className={row.original.groupRow ? "tr group" : "tr"}>
                {row.cells.map((cell) => (
                    <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                    </div>
                ))}
            </div>
        );
    };

    return virtual 
        ? <Virtuoso useWindowScroll data={rows} itemContent={rowRenderer} />
        : rows.map((row, index) => rowRenderer(index))
};
