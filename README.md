# FIX-react-native-country-picker-modal-filtering-countries-with-old-translation

This repository solve the problem that during searching, the countries name are displayed whit old translation and not with the current.

  

**Premise**:

This issue is not reproducible in example of official package.


**In my opinion**:

The problem could be `data: search(filter, data)` from `/lib/CountryList.js`, more precisely the problem could be `search` from `useContext()`.
When trying to do a search, `search(filter, data)` returns data with the old `translation` option. If you debug `filter` and `data` in `/lib/CountryList.js,` the variables are set correctly, but when you activate the `search` function, an old `data` is passed back.

  

I tried to fix the problem, but unfortunately I could not find any solution other than this.

  

## How to use?

  

1. Download the fix_React-Native-Country-Picker-Modal.js file and place it in the react native root project


now you have two way:

1. In `postinstall` add `NODE_PATH=. node ./fix_React-Native-Country-Picker-Modal.js`

2. Using patch-package
	- run `node fix_React-Native-Country-Picker-Modal.js`
	- run `npx patch-package react-native-country-picker-modal`
	- delete fix_React-Native-Country-Picker-Modal.js
	- add `patch-package` in `postinstall`


## Examples

### Example based on first way

```

.....

scripts {

"postinstall": "NODE_PATH=. node ./fix_React-Native-Country-Picker-Modal.js"

}

.....

  

```

  

### Example based on second way

```

.....

scripts {

"postinstall": "patch-package"

}

.....

  

```


  
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/N4N2ILOT0)

  

## License

  

MIT
