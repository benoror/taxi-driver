module.exports = {
  'countries': [
    { 'code': 'mx', 'name': 'Mexico' },
    { 'code': 'ar', 'name': 'Argentina' },
    { 'code': 'sa', 'name': 'Saudi Arabia' }
  ],
  'taxRules': [
    {
      'country': 'mx',
      'taxName': 'IVA',
      'validFrom': '2010-01-01T00:00:00.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'whitholded': false,
      'rate': '0.16'
    },
    {
      'country': 'mx',
      'taxName': 'IVA',
      'validFrom': '2000-01-01T00:00:00.511Z',
      'validUntil': '2009-12-31T23:59:59.511Z',
      'whitholded': false,
      'rate': '0.11'
    },
    {
      'country': 'mx',
      'taxName': 'IVA11',
      'validFrom': '2000-01-01T00:00:00.511Z',
      'validUntil': '2009-12-31T23:59:59.511Z',
      'whitholded': false,
      'txType': 'BOTH',
      'rate': '0.11'
    },
    {
      'country': 'mx',
      'taxName': 'IVA0',
      'validFrom': '2010-01-01T00:00:00.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'whitholded': false,
      'txType': 'sales',
      'category': '51000000',
      'rate': '0'
    },
    {
      'country': 'mx',
      'taxName': 'IVA0',
      'whitholded': false,
      'txType': 'income',
      'area': 'e',
      'category': '51000000',
      'rate': '0'
    },
    {
      'country': 'mx',
      'taxName': 'A_SAL',
      'validFrom': '2010-01-01T00:00:00.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.103715'
    },
    {
      'country': 'mx',
      'taxName': 'ISH2',
      'validFrom': '2010-01-01T00:00:00.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.02'
    },
    {
      'country': 'mx',
      'taxName': 'ISH3',
      'validFrom': '2010-01-01T00:00:00.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.03'
    },
    {
      'country': 'mx',
      'taxName': 'ISN3',
      'validFrom': '2010-01-01T00:00:00.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.03'
    },
    {
      'country': 'mx',
      'taxName': 'ISN',
      'validFrom': '2010-01-01T00:00:00.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.03'
    },
    {
      'country': 'mx',
      'taxName': 'RTP3',
      'validFrom': '2010-01-01T00:00:00.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.03'
    },
    {
      'country': 'mx',
      'taxName': 'RETIVA',
      'whitholded': true,
      'dep': 'IVA',
      'txType': 'sales',
      'rate': '2/3'
    },
    {
      'country': 'mx',
      'taxName': 'RETISR',
      'whitholded': true,
      'txType': 'sales',
      'rate': '0.1'
    },
    {
      'country': 'mx',
      'taxName': 'RETIVA4',
      'whitholded': true,
      'txType': 'sales',
      'rate': '0.04'
    },
    {
      'country': 'mx',
      'taxName': 'IEPS',
      'whitholded': false,
      'txType': 'sales',
      'category': '50000000',
      'rate': 'IF(quantity > 100, 0.08, 0.0)'
    },
    {
      'country': 'mx',
      'taxName': 'IEPS3',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.03'
    },
    {
      'country': 'mx',
      'taxName': 'IEPS8',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.08'
    },
    {
      'country': 'mx',
      'taxName': 'DAP',
      'whitholded': false,
      'txType': 'sales',
      'rate': '0.0999999'
    },
    {
      'country': 'mx',
      'taxName': 'IEPS',
      'whitholded': false,
      'txType': 'sales',
      'category': '50000000',
      'rate': '0.25'
    },
    {
      'country': 'mx',
      'taxName': 'IEPS',
      'whitholded': false,
      'txType': 'sales',
      'category': '50000000',
      'rate': '0.16'
    },
    {
      'country': 'sa',
      'taxName': 'VAT',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'category': 'DRUG',
      'bpType': 'TAXYES',
      'rate': 'IF(unitPrice > 2000, 0.02, 0.05)'
    },
    {
      'country': 'sa',
      'taxName': 'VAT',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'category': 'DRUG',
      'bpType': '!TAXYES',
      'rate': '0'
    },
    {
      'country': 'sa',
      'taxName': 'VAT',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'category': '!DRUG',
      'bpType': 'TAXYES',
      'rate': 'IF(unitPrice > 5000, 0.05, 0.04)'
    },
    {
      'country': 'sa',
      'taxName': 'VAT',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'category': '!DRUG',
      'bpType': '!TAXYES',
      'rate': '0'
    },
    {
      'country': 'ar',
      'taxName': 'IVA',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'payment',
      'category': 'ALQUILERES_RURAL',
      'bpType': 'INSCRIPTO',
      'vars': {
        'escala': 'IF(AND(subTotal>0,subTotal<=5000), 0.05, IF(subTotal<=10000,0.09,IF(subTotal<=15000,0.12,IF(subTotal<=20000,0.15,IF(subTotal<=30000,0.19,IF(subTotal<=40000,0.23,IF(subTotal<=60000,0.27,0.31)))))))',
        'retAll': 'IF(subTotal > 10700, escala, 0.06)',
        'taxable': 'subTotal * retAll'
      },
      'rate': 'retAll',
      'amount': 'IF(taxable <= 150, 150, taxable)'
    },
    {
      'country': 'ar',
      'taxName': 'IVA',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'payment',
      'category': 'ALQUILERES_RURAL',
      'bpType': 'NO_INSCRIPTO',
      'vars': {
        'retAll': 'IF(subTotal > 10700, 0.28, 0.25)',
        'taxable': 'subTotal * retAll'
      },
      'rate': 'retAll',
      'amount': 'IF(taxable <= 150, 150, taxable)'
    }
  ]
}
