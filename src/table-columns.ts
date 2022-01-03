import { Column } from 'react-table';

export interface Finance {
  transactionType: 'deposit' | 'payment' | 'withdraw';
  account: number;
  routingNumber: number;
  mask: number;
  amount: number;
  currencyCode: string;
  currencySymbol: string;
  bitcoinAddress: string;
  litecoinAddress: string;
  ethereumAddress: string;
  creditCardNumber: string;
  creditCardCVV: string;
  iban: string;
  bic: string;
  accountName: string;
}

export const columns: Column<Finance>[] = [
  {
    Header: 'Transaction Type',
    accessor: 'transactionType',
    sticky: 'left',
    width: 150,
  },
  {
    Header: 'Account',
    accessor: 'account',
    width: 100,
  },
  {
    Header: 'Routing',
    accessor: 'routingNumber',
  },
  {
    Header: 'Mask',
    accessor: 'mask',
    width: 100,
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    width: 100,
  },
  {
    Header: 'Currency',
    accessor: 'currencyCode',
    width: 100,
  },
  {
    Header: 'Currency Symbol',
    accessor: 'currencySymbol',
  },
  {
    Header: 'Bitcoin Address',
    accessor: 'bitcoinAddress',
    width: 350,
  },
  {
    Header: 'Litecoin Address',
    accessor: 'litecoinAddress',
    width: 350,
  },
  {
    Header: 'Ethereum Address',
    accessor: 'ethereumAddress',
    width: 350,
  },
  {
    Header: 'Credit Card Number',
    accessor: 'creditCardNumber',
    width: 250,
  },
  {
    Header: 'Credit Card CVV',
    accessor: 'creditCardCVV',
  },
  {
    Header: 'Iban',
    accessor: 'iban',
    width: 350,
  },
  {
    Header: 'BIC',
    accessor: 'bic',
  },
  {
    Header: 'Account Type',
    accessor: 'accountName',
    width: 200,
  },
];
