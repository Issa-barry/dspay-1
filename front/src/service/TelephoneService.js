export const CustomerService = {
    getData() {
        return [
            {
                id: 1000,
                name: '624123456',
                country: {
                    name: 'Guinea Conakry',
                    flag: 'gn',
                    code: '+224'
                },
            },
            {
                id: 1001,
                name: '620654321',
                country: {
                    name: 'Guinea Conakry',
                    flag: 'gn',
                    code: '+224'
                },
            },
            {
                id: 1002,
                name: '0671234567',
                country: {
                    name: 'France',
                    flag: 'fr',
                    code: '+33'
                },
            },
            {
                id: 1003,
                name: '0612345678',
                country: {
                    name: 'France',
                    flag: 'fr',
                    code: '+33'
                },
            },
            {
                id: 1004,
                name: '625987654',
                country: {
                    name: 'Guinea Conakry',
                    flag: 'gn',
                    code: '+224'
                },
            },
            {
                id: 1005,
                name: '0776543210',
                country: {
                    name: 'France',
                    flag: 'fr',
                    code: '+33'
                },
            },
            {
                id: 1006,
                name: '622123456',
                country: {
                    name: 'Guinea Conakry',
                    flag: 'gn',
                    code: '+224'
                },
            },
            {
                id: 1007,
                name: '0176543210',
                country: {
                    name: 'France',
                    flag: 'fr',
                    code: '+33'
                },
            },
            {
                id: 1008,
                name: '0269871234',
                country: {
                    name: 'France',
                    flag: 'fr',
                    code: '+33'
                },
            },
            {
                id: 1009,
                name: '625432109',
                country: {
                    name: 'Guinea Conakry',
                    flag: 'gn',
                    code: '+224'
                },
            }
        ];
    },

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    }
};
