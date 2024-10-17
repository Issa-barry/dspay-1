export const AgenceService = {
    getAgencesData() {
        return [
            {
                id: '1000',
                reference: 'f230fh0g3',
                nom: 'Ibrahim Diallo',
                email: 'ibrahim@yahoo.fr',
                phone: '+224 666 54 85 62',
                date: '2015-09-13',
                description: 'Agence Description',
                image: 'bamboo-watch.jpg',
                chiffre: 6547854,
                quantity: 24,
                status: 'ACTIVÉ',
                rating: 5,
                addresse: 'Centre-ville',
                ville: 'Kankan université',
                code_postal: '24000',
                pays: 'Guinée-Conakry',
                nom_responssable: 'Mamadou Alpha',
                prenom_responssable: 'BARRY',
                phone_responssable: '+33 666 17 58 54 02',
                email_responssable: 'mamadou.alpha@agence.com',
                pays_responssable: 'Guinée-Conakry'
            },
            {
                id: '1001',
                reference: 'a123bd4t7',
                nom: 'Ibrahima Sory Bah',
                email: 'isorybah@gmail.com',
                phone: '+224 621 45 78 96',
                date: '2018-01-10',
                description: 'Agence spécialisée dans le transport',
                image: 'agency-1.jpg',
                chiffre: 7523698,
                quantity: 15,
                status: 'ATTENTE',
                rating: 4,
                addresse: 'Quartier Aviation',
                ville: 'Conakry',
                code_postal: '12000',
                pays: 'Guinée-Conakry',
                nom_responssable: 'Alpha Oumar',
                prenom_responssable: 'SOW',
                phone_responssable: '+33 689 23 54 77',
                email_responssable: 'alpha.oumar@agence.com',
                pays_responssable: 'Guinée-Conakry'
            },
            {
                id: '1002',
                reference: 'c567gh9u3',
                nom: 'Fatoumata Camara',
                email: 'fcamara@yahoo.fr',
                phone: '+224 65 47 89 32',
                date: '2017-03-15',
                description: 'Agence immobilière',
                image: 'agency-2.jpg',
                chiffre: 10500000,
                quantity: 30,
                status: 'ARCHIVÉ',
                rating: 5,
                addresse: 'Madina Marché',
                ville: 'Conakry',
                code_postal: '14000',
                pays: 'Guinée-Conakry',
                nom_responssable: 'Mamadou',
                prenom_responssable: 'Camara',
                phone_responssable: '+33 658 74 96 41',
                email_responssable: 'mamadou.camara@agence.com',
                pays_responssable: 'Guinée-Conakry'
            },
            {
                id: '1003',
                reference: 'b890op5j6',
                nom: 'Sekou Keita',
                email: 'sekou.keita@gn.com',
                phone: '+224 68 92 74 56',
                date: '2019-06-25',
                description: 'Agence de location de véhicules',
                image: 'agency-3.jpg',
                chiffre: 8900000,
                quantity: 12,
                status: 'BLOQUÉ',
                rating: 3,
                addresse: 'Taouyah',
                ville: 'Conakry',
                code_postal: '23000',
                pays: 'Guinée-Conakry',
                nom_responssable: 'Amadou',
                prenom_responssable: 'Keita',
                phone_responssable: '+33 674 58 32 09',
                email_responssable: 'amadou.keita@agence.com',
                pays_responssable: 'Guinée-Conakry'
            },
            {
                id: '1004',
                reference: 'd456fv7t8',
                nom: 'Kadiatou Diallo',
                email: 'kadiatou.diallo@gmail.com',
                phone: '+224 62 47 85 12',
                date: '2020-11-20',
                description: 'Agence de marketing digital',
                image: 'agency-4.jpg',
                chiffre: 12500000,
                quantity: 22,
                status: 'ACTIVÉ',
                rating: 5,
                addresse: 'Kaporo',
                ville: 'Conakry',
                code_postal: '25000',
                pays: 'Guinée-Conakry',
                nom_responssable: 'Alpha Mamadou',
                prenom_responssable: 'BARRY',
                phone_responssable: '+33 611 45 78 23',
                email_responssable: 'alpha.mamadou@agence.com',
                pays_responssable: 'Guinée-Conakry'
            },
            {
                id: '1005',
                reference: 'e321rf8y9',
                nom: 'Ousmane Toure',
                email: 'otoure@business.gn',
                phone: '+224 64 32 98 75',
                date: '2021-02-10',
                description: "Agence d'événementiel",
                image: 'agency-5.jpg',
                chiffre: 7654000,
                quantity: 18,
                status: 'DELOQUÉ',
                rating: 4,
                addresse: 'Lambanyi',
                ville: 'Conakry',
                code_postal: '20000',
                pays: 'Guinée-Conakry',
                nom_responssable: 'Ibrahima',
                prenom_responssable: 'Diallo',
                phone_responssable: '+33 622 78 45 96',
                email_responssable: 'ibrahima.diallo@agence.com',
                pays_responssable: 'Guinée-Conakry'
            },
            {
                id: '1006',
                reference: 'f678jh1k0',
                nom: 'Aissatou Bah',
                email: 'a.bah@yahoo.com',
                phone: '+224 60 47 85 92',
                date: '2018-08-30',
                description: 'Agence de design graphique',
                image: 'agency-6.jpg',
                chiffre: 5300000,
                quantity: 15,
                status: 'SUPPRIMÉ',
                rating: 2,
                addresse: 'Centre-ville',
                ville: 'Kankan',
                code_postal: '24000',
                pays: 'Guinée-Conakry',
                nom_responssable: '',
                prenom_responssable: '',
                phone_responssable: '',
                email_responssable: '',
                pays_responssable: 'Guinée-Conakry'
            }
        ];
    },

    getAgencesMini() {
        return Promise.resolve(this.getAgencesData().slice(0, 5));
    },

    getAgencesSmall() {
        return Promise.resolve(this.getAgencesData().slice(0, 10));
    },

    getAgences() {
        return Promise.resolve(this.getAgencesData());
    },

    getAgencesWithOrdersSmall() {
        return Promise.resolve(this.getAgencesWithOrdersData().slice(0, 10));
    },

    getAgencesWithOrders() {
        return Promise.resolve(this.getAgencesWithOrdersData());
    }
};
