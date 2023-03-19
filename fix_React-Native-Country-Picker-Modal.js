/**
 * @author 9christian9
 * @description This script fix issue https://github.com/xcarpentier/react-native-country-picker-modal/issues/480
 * - More details: https://github.com/9christian9/FIX-react-native-country-picker-modal-filtering-countries-with-old-translation
*/

const {readFile, writeFile} = require('fs');
const packageJson = require('package.json');

if(packageJson.dependencies["react-native-country-picker-modal"] !== "^2.0.0"){
    console.log("Impossible to fix `react-native-country-picker-modal` because the version is different from `^2.0.0`, please verify if in new release of it the issue is fixed'")
    return Error ("Error")
}

const reactNative = "node_modules/react-native-country-picker-modal/lib/CountryList.js";
const fix_1 = `
import Fuse from 'fuse.js';
const newSearch = ({data, filter}) =>{
    const DEFAULT_FUSE_OPTION = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['name', 'cca2', 'callingCode'],
    };
    if (data.length === 0) {
        return [];
    }
    if (filter && filter !== '') {
        const fuse = new Fuse(data, DEFAULT_FUSE_OPTION);
        const result = fuse.search(filter);
        return result;
    }
    return data;
}
`;
const fix_2 = `data: newSearch({filter, data}),`;

readFile(reactNative, 'utf-8', function (err, contents) {
    if (err) {
        console.log(err);
        return;
    }
    if(!contents.includes(fix_1) && !contents.includes(fix_2)){
        contents = contents.split("\n");
        contents[125] = [fix_2];
        contents[6] = [fix_1 + contents[6]];
        contents = contents.join("\n");

        writeFile(reactNative, contents, 'utf-8', function (err) {
            if (err) {
                console.log(err);
                return;
            }else{
                console.log('FIX for react-native-country-picker-modal successfully added');
                return;
            }
        });
    }else{
        console.log('FIX for react-native-country-picker-modal already present');
        return;
    }
});