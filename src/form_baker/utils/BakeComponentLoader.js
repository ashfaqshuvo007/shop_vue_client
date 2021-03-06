const forEach = require("lodash").forEach;

let BakedComponents = {};

let bakedCommonFields = require.context("../fields/common", false, /^\.\/Bake([\w-_]+)\.vue$/);

forEach(bakedCommonFields.keys(), (key) => {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	BakedComponents[compName] = bakedCommonFields(key).default;
});

let bakedExtendedFields = require.context("../fields/extended", false, /^\.\/Bake([\w-_]+)\.vue$/);

forEach(bakedExtendedFields.keys(), (key) => {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	BakedComponents[compName] = bakedExtendedFields(key).default;
});

export default BakedComponents;
