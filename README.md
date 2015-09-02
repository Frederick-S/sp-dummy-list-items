# sp-dummy-list-items
Create dummy SharePoint list items.

## Installation
```
npm install sp-dummy-list-items --save
```

## Usage
```js
var SPDummyListItemsCreation = require('sp-dummy-list-items');

// Initialize an instance with web url and list title
// Use new SPDummyListItemsCreation('web url', 'list title', true) if the query cross sites
var dummyListItemsCreation = new SPDummyListItemsCreation('web url', 'list title');

// dummyListItemsCreation.create(fieldValues, count, done, error)
// Create 20 list items with given field values
dummyListItemsCreation.create({
    'Title': 'Title',
    'Score': 100
}, 20, function (sender, args) {
    // 20 list items has been created
}, function (sender, args) {
    // Error
});
```

## License
MIT.
