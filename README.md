# fix-repo

[![npm version](https://badge.fury.io/js/fix-repo.svg)](https://badge.fury.io/js/fix-repo) [![Build Status](https://travis-ci.org/Ullink/fix-repo.svg?branch=master)](https://travis-ci.org/Ullink/fix-repo) [![codecov](https://codecov.io/gh/Ullink/fix-repo/branch/master/graph/badge.svg)](https://codecov.io/gh/Ullink/fix-repo)

npm package for easy accessible FIX Repository information, without parsing the xml repository

## Installation

To install the package, simply run the following

```npm install fix-repo```

## Usage

To get information for `35=D` in `FIX 5.0`:
```javascript
import { Fix50 } from 'fix-repo';

const msgTypeField = Fix50.getField('35');
const msgTypeCodeSet = msgTypeField.codeSet;
const code = msgTypeCodeSet['D']; // code.name === 'NewOrderSingle'
```

## To Build

Run the following command
```
npm install -g gulp-cli
npm install

gulp
```

## License

Apache-2.0