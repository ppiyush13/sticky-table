const columns = [
  {
    Header: 'Transaction Type',
    accessor: 'transactionType',
    sticky: 'left',
    width: 150,
    sortType: 'string',
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

export const useColumns = () => {
  return columns;
};
