import {API_PRODUCT_OPERATIONS, API_PRODUCT_CATEGORIES, API_PRODUCT_CATEGORY_ATTRIBUTES} from '@/base/config/base_apis';

export default {
    getURL: API_PRODUCT_OPERATIONS,
    submitURL: API_PRODUCT_OPERATIONS,
    wizards: [
        {
        	title: 'Category Selection',
        	groups: [
        		{
        			legend: 'Category Selection',
        			fields: [
        				{
        					type: 'expandable-list',
        					inputType: 'single-loop',
        					label: 'Select Category',
        					model: 'category',
        					items: [],
        					column: 12,
        					remote: {
        						url: API_PRODUCT_CATEGORIES,
        						viewProperty: 'name',
        						valueProperty: 'id',
        					}
        				},
        			]
        		},
        	],
        },
        {
            title: 'Product Information',
            groups: [
                {
                    legend: 'Basic Information',
                    fields: [
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Product name',
                            model: 'name',
                            column: 12,
                            rules: {
                                required: (v) => !!v || 'Required.',
                                min: (v) => (v !== undefined && v !== null && v.length >= 6) ||
                                    'Min 6 characters',
                            },
                        },
                        {
                            type: 'text-area',
                            inputType: 'text',
                            label: 'Product description',
                            model: 'description',
                            column: 6,
                            rules: {
                                required: (v) => !!v || 'Required.',
                                min: (v) => (v !== undefined && v !== null && v.length >= 20) ||
                                    'Min 20 characters',
                            },
                        },
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Product keyword',
                            model: 'keyword',
                            column: 6,
                        },
                        // {
                        // 	type: 'input',
                        // 	inputType: 'text',
                        // 	label: 'Category',
                        // 	model: 'category',
                        // 	editable: false,
                        // 	column: 12,
                        // },
                    ]
                },
                {
                    legend: 'Graphical Representation',
                    fields: [
                        {
                            type: 'file-pond',
                            inputType: 'file',
                            label: 'Product photos',
                            model: 'icons',
                            multiple: true,
                            column: 12,
                        },
                    ]
                }
            ],
        },
        {
            title: 'Trading Information',
            groups: [
                {
                    legend: 'Trading Information',
                    fields: [
                        // {
                        //     type: 'input',
                        //     inputType: 'number',
                        //     label: 'Stock Quantity',
                        //     model: 'stock_quantity',
                        //     column: 4,
                        //     rules: {
                        //         required: (v) => !!v || 'Required.',
                        //         isNumber: function (value) {
                        //             if(_.isFinite(value) && parseFloat(value) > 0)
                        //                 return true;
                        //             return 'Value needs to be greater than or equal 0';
                        //         },
                        //     },
                        // },
                        // {
                        //     type: 'input',
                        //     inputType: 'number',
                        //     label: 'Selling Price',
                        //     model: 'selling_price',
                        //     column: 4,
                        //     rules: {
                        //         required: (v) => !!v || 'Required.',
                        //         isNumber: function (value) {
                        //             try {
                        //                 let number = parseFloat(value);
                        //                 if(number < 0)
                        //                     return 'Value needs to be greater than or equal 0';
                        //                 return true;
                        //             } catch (e) {
                        //                 return e;
                        //             }
                        //         },
                        //     },
                        // },
                        // {
                        //     type: 'input',
                        //     inputType: 'number',
                        //     label: 'Discount Amount',
                        //     model: 'discount_amount',
                        //     column: 4,
                        //     rules: {
                        //         required: (v) => !!v || 'Required.',
                        //         isNumber: function (value) {
                        //             try {
                        //                 let number = parseFloat(value);
                        //                 if(number < 0)
                        //                     return 'Value needs to be greater than or equal 0';
                        //                 return true;
                        //             } catch (e) {
                        //                 return e;
                        //             }
                        //         },
                        //     },
                        // },
                        {
                            type: 'nested-form',
                            inputType: 'json',
                            label: 'Sub product SKU',
                            legend: true,
                            model: 'product_breakdowns',
                            many: true,
                            column: 12,
                            fields: [
                                {
                                    type: 'nested-form',
                                    inputType: 'json',
                                    label: 'Product attributes',
                                    model: 'product_attributes',
                                    legend: false,
                                    many: true,
                                    column: 12,
                                    fields: [
                                        {
                                            type: 'dropdown',
                                            inputType: 'remote',
                                            label: 'Product attribute',
                                            model: 'product_attribute',
                                            options: {
                                                itemText: 'name',
                                                itemValue: 'id',
                                                url: API_PRODUCT_CATEGORY_ATTRIBUTES,
                                                param: {
                                                    attribute: 'category',
                                                    type: 'dependent',
                                                }
                                            },
                                            column: 3,
                                        },
                                        {
                                            type: 'input',
                                            inputType: 'text',
                                            label: 'Value',
                                            model: 'value',
                                            column: 3,
                                        },
                                        {
                                            type: 'input',
                                            inputType: 'text',
                                            label: 'Note',
                                            model: 'note',
                                            column: 3,
                                        },
                                    ],
                                },
                                {
                                    type: 'input',
                                    inputType: 'number',
                                    label: 'Stock Quantity',
                                    model: 'stock_quantity',
                                    column: 4,
                                    rules: {
                                        required: (v) => !!v || 'Required.',
                                        isNumber: function (value) {
                                            try {
                                                let number = parseFloat(value);
                                                if(number < 0)
                                                    return 'Value needs to be greater than or equal 0';
                                                return true;
                                            } catch (e) {
                                                return e;
                                            }
                                        },
                                    },
                                },
                                {
                                    type: 'input',
                                    inputType: 'number',
                                    label: 'Selling Price',
                                    model: 'selling_price',
                                    column: 4,
                                    rules: {
                                        required: (v) => !!v || 'Required.',
                                        isNumber: function (value) {
                                            try {
                                                let number = parseFloat(value);
                                                if(number < 0)
                                                    return 'Value needs to be greater than or equal 0';
                                                return true;
                                            } catch (e) {
                                                return e;
                                            }
                                        },
                                    },
                                },
                                {
                                    type: 'input',
                                    inputType: 'number',
                                    label: 'Discount Amount',
                                    model: 'discount_amount',
                                    column: 4,
                                    rules: {
                                        required: (v) => !!v || 'Required.',
                                        isNumber: function (value) {
                                            try {
                                                let number = parseFloat(value);
                                                if(number < 0)
                                                    return 'Value needs to be greater than or equal 0';
                                                return true;
                                            } catch (e) {
                                                return e;
                                            }
                                        },
                                    },
                                },
                            ],
                        },
                    ]
                },
            ],
        },
    ],
};