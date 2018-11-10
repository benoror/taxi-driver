module.exports = {
  'MEX': [
    {
      taxType: 'IVA',
      formula: `IF(AND(category = 'DRUG', area = 'PHARMACY'), 0, 0.16)`
    },
    {
      taxType: 'RET_IVA',
      formula: '0.167'
    },
    {
      taxType: 'RET_ISR',
      formula: '0.1'
    },
  ],
  'KSA': [
    {
      taxType: 'VAT',
      category: 'DRUG',
      partnerTaxType: 'TAXYES',
      formula: `IF(subTotal > 2000, 0.02, 0.05)`
    },
    {
      taxType: 'VAT',
      category: 'DRUG',
      partnerTaxType: '!TAXYES',
      formula: '0'
    },
    {
      taxType: 'VAT',
      category: '!DRUG',
      partnerTaxType: 'TAXYES',
      formula: `IF(subTotal > 5000, 0.05, 0.04)`
    },
    {
      taxType: 'VAT',
      category: '!DRUG',
      partnerTaxType: '!TAXYES',
      formula: '??????'
    },
  ],
  'ARG': [
  ],
};
