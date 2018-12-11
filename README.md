# taxi-driver
Taxi Driver - A Flexible International Tax Engine Microservice

Built with [Micro](https://github.com/zeit/micro) & [Lowdb ⚡️](https://github.com/typicode/lowdb)

[![Build Status](https://travis-ci.org/ecaresoft/taxi-driver.svg?branch=master)](https://travis-ci.org/ecaresoft/taxi-driver) [![Maintainability](https://api.codeclimate.com/v1/badges/9cabf46da635a1db84a8/maintainability)](https://codeclimate.com/github/ecaresoft/taxi-driver/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/9cabf46da635a1db84a8/test_coverage)](https://codeclimate.com/github/ecaresoft/taxi-driver/test_coverage)

![taxi driver](https://user-images.githubusercontent.com/119117/48316345-df182200-e5a7-11e8-94ff-bab2f79694f0.jpg)

## Usage

### Supported Countries

- [x] 🇲🇽México
- [x] 🇦🇷Argentina
- [x] 🇸🇦Saudi Arabia

\*Full tests & specification for each country can be found at [tests/integration](https://github.com/ecaresoft/taxi-driver/tree/master/tests/integration)

### Tax Rules

Tax Rules are defined in a LowDB located at [db.json#L18](https://github.com/ecaresoft/taxi-driver/blob/master/db.json#L18)

These rules are matched and applied based on the provided Query.

#### Validity range

A range of `Datetime` values for specifying the validity of a rule

- `validFrom` & `validUntil`: International Standard Date (ISO) (see
  [moment.js documentation](https://momentjs.com/docs/#/parsing/string/))

#### Currency & decimals precision

Taxi Driver use [Currency.js](https://currency.js.org) for all Currency
calculations, thus getting rid of decimals rounding issues.

For currency amounts the default number of cents is 2

For the rate factors the precision is set to 8 using the `FACTOR_PRECISION`
constant.

### Query

A query includes the following (case insensitive) fields:

#### Required parameters

Initially, these required parameters are used to filter out the tax rules by:

  - `country` (String): Country code
  - `taxes` (Array(String)): Name(s) to identify the taxes

#### Optional `match params`

Optional `match params` (defined at [db.json#L3](https://github.com/ecaresoft/taxi-driver/blob/master/lib/match.js#L4)) are used to "best match" a single rule while querying the app via the API:

  - `region`: Region (ex. border tax, state, county, municipality)
  - `bpType`: Business Partner type
  - `txType`: Transaction type
  - `docType`: Document type
  - `category`: Category name (ex.: for products)
  - `area`: Area (ex.: business area, service station)

#### Optional `vars` object.

`vars` object is used both in a query and rules, to store variable dependant values (such as sub-totals), and other formulas to be evaluated by the `FormulaParser`.

\*Commonly used for: `subTotal`, `unitPrice`, ...

#### Array of `taxes`

An array of `String`'s to be matched against rule(s) `taxName`

### Formulas & Variables

\*Both `vars`, `rate` & `amount` can also be `String`'s, as they can be evaluated using [handsontable/formula-parser](https://github.com/handsontable/formula-parser)

### Query Example

```javascript
{
  country: "sa",
  txType: "sales",
  docType: "invoice",
  category: 'DRUG',
  bpTaxType: 'TAXYES',
  area: undefined,
  vars: {
    unitPrice: 5000
  },
  taxes: ['VAT'],
}
```

### Rule Matching

The query above will match to the following rule(s):

```json
  [
    {
      "countryCode": "sa",
      "txType": "sales",
      "docType": "invoice",
      "taxName": "VAT",
      "category": "DRUG",
      "bpTaxType": "TAXYES",
      "rate": "IF(unitPrice > 2000, 0.02, 0.05)"
    }
  ]
```

### API

Postman collection: https://web.postman.co/collections/27932-1280fe65-8858-4d0f-bde4-4c3b79d6b5b3?workspace=61c65267-c247-4243-8558-65eaee551abe

#### `GET /countries`

#### `GET /rules`

#### `POST /taxes`

Request:

```javascript
{
  country: "sa",
  // ... match params
  vars: {
    // ...
  },
  taxes: [ /* ... */ ]
}
```

Response:

```javascript
{
  taxes: {
    [taxName]: {
      rate: {error: /*...*/, result: /*...*/},
      // ...
    },
    [taxName]: {
      rate: {error: /*...*/, result: /*...*/},
      // ...
    }
  }
}
```

### Advanced Usage

#### `meta` object

Rules can have a `meta` object, containing any informative fields that
need to be passed to the consumer. For example, an `exempt` flag for
Mexico's particular exempt taxes.

#### Factor, amounts & totals calculation

If a `vars.subTotal` is provided, the engine will automatically
calculate and return:

- totals (`taxTotal` & `grandTotal`) in the response header.
- `amount` & `factor` per tax

#### Dependant Tax Factors

Rules can have a `dep` string with the name of a dependant taxName that
has to be used to calculate the factor

## GUI (alpha version)

https://github.com/ecaresoft/taxi-driver-ui

## Development

Easy development using [zeit/micro-dev](https://github.com/zeit/micro-dev):

```
yarn run dev
```

## Tests

[Jest](https://jestjs.io/) is used for both [unit](https://github.com/ecaresoft/taxi-driver/tree/master/tests/unit) & [integration](https://github.com/ecaresoft/taxi-driver/tree/master/tests/integration) tests. Run with:

```
yarn test
```

## Inspired by

- https://github.com/commerceguys/tax
- https://github.com/valeriansaliou/node-sales-tax

## Spec docs

- https://gist.github.com/luissifu/b368f308b37d6e98031e737d9d04d2d1
- https://discourse.ecaresoft.com/t/rfd-tech-spec-tax-engine-mvp/1213/25
- https://docs.google.com/document/d/1NHwMpuQZTLa8VinhX3xmyXNg-0OGlkKZFnyRscprhkc/edit#heading=h.krjmur7zqqnt
- https://docs.google.com/spreadsheets/d/1Qu_NgDyhRS3DAEdrxe-fNzUuG67E2XZxHsejAKCrPjI/edit#gid=0
- https://docs.google.com/presentation/d/1QYAy7qPoEwJPGlu7Ss-alNH1dBmeBFFFa2ph8hy5WsI/edit#slide=id.g45bef5faee_0_122
