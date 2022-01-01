import { matchSorter } from 'match-sorter';

export const globalFilter = (rows, columnIds, filterValue) => {
  const keys = columnIds.map((id) => `values.${id}`);
  return matchSorter(rows, filterValue, { keys });
};
