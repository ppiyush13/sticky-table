const { finance } = require('faker');
const { writeFileSync } = require('fs');

const {
  account,
  accountName,
  routingNumber,
  mask,
  amount,
  transactionType,
  currencyCode,
  currencyName,
  currencySymbol,
  bitcoinAddress,
  litecoinAddress,
  creditCardNumber,
  creditCardCVV,
  ethereumAddress,
  iban,
  bic,
  transactionDescription,
} = finance;

const data = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    account: account(),
    accountName: accountName(),
    routingNumber: routingNumber(),
    mask: mask(),
    amount: amount(),
    transactionType: transactionType(),
    currencyCode: currencyCode(),
    currencyName: currencyName(),
    currencySymbol: currencySymbol(),
    bitcoinAddress: bitcoinAddress(),
    litecoinAddress: litecoinAddress(),
    creditCardNumber: creditCardNumber(),
    creditCardCVV: creditCardCVV(),
    ethereumAddress: ethereumAddress(),
    iban: iban(),
    bic: bic(),
    transactionDescription: transactionDescription(),
  });
}

writeFileSync('./data.json', JSON.stringify(data, null, 2));
