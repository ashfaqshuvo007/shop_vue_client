import {API_COUNTRY, API_USER_PROFILE} from "@/base/config/base_apis";

export default {
    submitURL: API_USER_PROFILE,
    sections: [
        {
            title: 'Basic Information',
            key: 'basic_profile_info',
            edit: false,
            fields: [
                {key: 'first_name', value: null, label: 'First Name'},
                {key: 'last_name', value: null, label: 'Last Name'},
                {key: 'country', value: null, label: 'Country', storeFunc: 'commonDataStore/getCountryName'},
                {key: 'join_date', value: null, label: 'Joined Sol Factory on'},
            ],
            formSchema: {
                fields: [
                    {
                        type: 'input', inputType: 'text', label: 'First Name', model: 'first_name', column: 6,
                        rules: {
                            required: (v) => !!v || 'Required.',
                            min: (v) => (v !== undefined && v !== null && v.length >= 6) ||
                                'Min 6 characters',
                        },
                    },
                    {
                        type: 'input', inputType: 'text', label: 'Last Name', model: 'last_name', column: 6,
                        rules: {
                            required: (v) => !!v || 'Required.',
                            min: (v) => (v !== undefined && v !== null && v.length >= 6) ||
                                'Min 6 characters',
                        },
                    },
                    {
                        type: 'dropdown', inputType: 'remote', label: 'Country', model: 'country',
                        options: {
                            itemText: 'name', itemValue: 'id', url: API_COUNTRY, param: {}
                        },
                        column: 6,
                    },
                    {
                        type: 'date-picker', inputType: 'date',
                        label: 'Joined Sol Factory on', model: 'join_date', column: 6,
                    },
                ]
            },
        },
        {
            title: 'Contact Information',
            key: 'contact_address',
            edit: false,
            fields: [
                {key: 'email_address', value: null, label: 'Primary Email'},
                {key: 'alternative_email_address', value: null, label: 'Alternative Email'},
                {key: 'contact_number', value: null, label: 'Phone Number'},
                {key: 'street_address', value: null, label: 'Street Address'},
            ],
            formSchema: {
                fields: [
                    {
                        type: 'input', inputType: 'email', label: 'Primary Email', model: 'email_address', column: 6,
                        rules: {
                            required: (v) => !!v || 'Required.',
                        },
                    },
                    {type: 'input', inputType: 'email', label: 'Alternate Email', model: 'alternative_email_address', column: 6,},
                    {type: 'input', inputType: 'phone', label: 'Phone Number', model: 'contact_number', column: 6,},
                    {type: 'text-area', inputType: 'text', label: 'Street Address', model: 'street_address', column: 6,},
                ]
            },
        },
        {
            title: 'Company Information',
            key: 'company_information',
            edit: false,
            fields: [
                {key: 'name', value: null, label: 'Company Name'},
                {key: 'registered_country', value: null, label: 'Registered Country', storeFunc: 'commonDataStore/getCountryName'},
                {key: 'operational_country', value: null, label: 'Operational Country', storeFunc: 'commonDataStore/getCountryName'},
                {key: 'city_name', value: null, label: 'City'},
                {key: 'zip_code', value: null, label: 'Zip Code'},
                {key: 'address', value: null, label: 'Street Address'},
                {key: 'number_of_employees', value: null, label: 'Total Employees'},
                {key: 'registration_year', value: null, label: 'Registration Year'},
                {key: 'company_website', value: null, label: 'Company Website'},
                {key: 'annual_revenue', value: null, label: 'Annual Revenue'},
            ],
            formSchema: {
                fields: [
                    {type: 'input', inputType: 'text', label: 'Company Name', model: 'name', column: 4,},
                    {
                        type: 'dropdown', inputType: 'remote', label: 'Registered Country', model: 'registered_country', column: 4,
                        options: {itemText: 'name', itemValue: 'id', url: API_COUNTRY, param: {}},
                    },
                    {
                        type: 'dropdown', inputType: 'remote', label: 'Operational Country', model: 'operational_country', column: 4,
                        options: {itemText: 'name', itemValue: 'id', url: API_COUNTRY, param: {}},
                    },
                    {type: 'input', inputType: 'text', label: 'City', model: 'city_name', column: 4,},
                    {type: 'input', inputType: 'text', label: 'Zip Code', model: 'zip_code', column: 4,},
                    {type: 'text-area', inputType: 'text', label: 'Street Address', model: 'address', column: 4,},
                    {
                        type: 'dropdown', inputType: 'local', label: 'Total Employees', model: 'number_of_employees', column: 4,
                        options: {itemText: 'name', itemValue: 'id'},
                        items: [
                            {name: '1-10', id: '1-10'},
                            {name: '11-20', id: '11-20'},
                            {name: '21-50', id: '21-50'},
                            {name: '51-100', id: '51-100'},
                            {name: '101-200', id: '101-200'},
                            {name: '201-500', id: '201-500'},
                            {name: 'More than 500', id: 'More than 500'},
                        ]
                    },
                    {
                        type: 'input', inputType: 'number', label: 'Registration Year', model: 'registration_year', column: 4,
                        rules: {
                            required: (v) => !!v || 'Required.',
                            min: (v) => (v !== undefined && v !== null && v >= 1800) || 'Greater than 1800',
                            max: (v) => (v !== undefined && v !== null && v <= new Date().getFullYear()) ||
                                'Less than or equal to ' + (new Date().getFullYear()),
                        },
                    },
                    {
                        type: 'dropdown', inputType: 'local', label: 'Annual Revenue', model: 'annual_revenue', column: 4,
                        options: {itemText: 'name', itemValue: 'id'},
                        items: [
                            {name: "Less than $100,000 / year", id: "Less than $100,000 / year"},
                            {name: "$100,000 - $1M / year", id: "$100,000 - $1M / year"},
                            {name: "$1M - $5M / year", id: "$1M - $5M / year"},
                            {name: "$5M - $10M / year", id: "$5M - $10M / year"},
                            {name: "$10M - $100M / year", id: "$10M - $100M / year"},
                            {name: "$100M - $1B / year", id: "$100M - $1B / year"},
                            {name: "More than $1B / year", id: "More than $1B / year"},
                        ]
                    },
                    {type: 'input', inputType: 'text', label: 'Company Website', model: 'company_website', column: 4,},
                ]
            },
        },
        {
            title: 'Sourcing Information',
            key: 'sourcing_information',
            edit: false,
            fields: [
                {key: 'annual_purchase_volume', value: null, label: 'Annual Purchasing Volume'},
                {key: 'preferred_supplier_qualification', value: null, label: 'Preferred Supplier Qualifications'},
                {key: 'primary_sourcing_purpose', value: null, label: 'Primary Sourcing Purpose'},
                {key: 'preferred_industries', value: null, label: 'Preferred Industries'},
                {key: 'average_sourcing_frequency', value: null, label: 'Average Sourcing Frequency'},
            ],
            formSchema: {
                fields: [
                    {type: 'input', inputType: 'text', label: 'Annual Purchasing Volume',
                        model: 'annual_purchase_volume', column: 4,},
                    {type: 'text-area', inputType: 'text', label: 'Preferred Supplier Qualifications',
                        model: 'preferred_supplier_qualification', column: 4,},
                    {type: 'text-area', inputType: 'text', label: 'Primary Sourcing Purpose',
                        model: 'primary_sourcing_purpose', column: 4,},
                    {type: 'text-area', inputType: 'text', label: 'Preferred Industries',
                        model: 'preferred_industries', column: 4,},
                    {type: 'text-area', inputType: 'text', label: 'Average Sourcing Frequency',
                        model: 'average_sourcing_frequency', column: 4,},
                ]
            },
        },
    ]
};