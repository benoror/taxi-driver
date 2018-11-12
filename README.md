# taxi-driver
Taxi Driver - A Flexible International Tax Engine Microservice

Built with [Micro](https://github.com/zeit/micro) & [Lowdb ⚡️](https://github.com/typicode/lowdb)

![taxi driver](https://user-images.githubusercontent.com/119117/48316345-df182200-e5a7-11e8-94ff-bab2f79694f0.jpg)

## Usage

Postman collection: https://web.postman.co/collections/27932-1280fe65-8858-4d0f-bde4-4c3b79d6b5b3?workspace=61c65267-c247-4243-8558-65eaee551abe

#### `GET /countries`

#### `GET /rules`

#### `POST /getSalesTax`

```javascript
{
  country: "sa",
  query: {
    taxType: "VAT",
    bpTaxType: "TAXYES",
    category: "DRUG",
    area: undefined,
    vars: {
      subTotal: 5000
    }
  }
}
```

## GUI

https://github.com/benoror/taxi-driver-ui

## Development

```
yarn run dev
```

## Tests

Run [Jest](https://jestjs.io/) tests with:

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
