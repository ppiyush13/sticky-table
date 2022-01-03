import { CSSProperties } from 'react';
import {
  UseFiltersOptions,
  UseFiltersInstanceProps,
  UseFiltersState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UseRowSelectState,
  UseRowSelectOptions,
} from 'react-table';
/// See: https://qithub.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-tablegconfiquration-using-declaration-merging;

declare module 'react-table' {
  export interface TableOptions<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseSortByOptions<D>,
      UseRowSelectOptions<D> {}

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseSortByHooks<D> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseFiltersInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UseSortByInstanceProps<D>,
      UseRowSelectInstanceProps<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseFiltersState<D>,
      UseGlobalFiltersState<D>,
      UseSortByState<D>,
      UseRowSelectState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseFiltersColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D>,
      UseSortByColumnOptions<D> {
    sticky?: 'left' | 'right';
    align?: CSSProperties['textAlign'];
    getCustomCellProps?: (cell: Cell<T>) => TableCellProps;
  }

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseFiltersColumnProps<D>,
      UseSortByColumnProps<D> {}

  export interface Row<D extends object = {}>
    extends UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D> {}
}
