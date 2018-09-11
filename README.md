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
const code = msgTypeCodeSet.codes['D']; // code.name === 'NewOrderSingle'
```

To get message type info in `FIX 4.4`:
```javascript
import { Fix44 } from 'fix-repo';

function structureConsumer(structure: Structure) {
    const structureType = structure.type;
    if (structureType instanceof Group) {
        // num tag of the Repeating Group
        const numTag = structureType.numInGroupId;
        // Could consume the repeating group's structures by recursion
        structureType.structures.forEach(s => structureConsumer(s));
    } else if (structureType instanceof Field) {
        // structureType is Field
    } else if (structureType instanceof Component) {
        // Could consume the component's structures by recursion
        structureType.structures.forEach(s => structureConsumer(s));
    }
}

const msgType = Fix44.getMessage('D');
msgType.structures.forEach(structure => structureConsumer);
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