<script setup>
import { ref } from 'vue';

import AppSubMenu from './AppSubMenu.vue';

const model = ref([
    {
        label: 'Dashboards',
        icon: 'pi pi-home',
        items: [
            {
                label: 'Stats-RH',
                icon: 'pi pi-fw pi-chart-bar', 
                to: '/'
            },
            {
                label: 'Chiffre-d\'affaire',
                icon: 'pi pi-fw pi-chart-line',
                to: '/dashboard-banking'
            },
            {
                label: 'Transferts',
                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                items: [
                    {
                        label: 'Liste',
                        icon: 'pi pi-fw pi-list',
                        to: '/transfert/liste'
                    },
                    {
                        label: 'Envoie',
                        icon: 'pi pi-fw pi-list',
                        to: '/transfert/create'
                    },
                    {
                        label: 'Retrait',
                        icon: 'pi pi-fw pi-list',
                        to: '/transfert/retrait'
                    },
                    {
                        label: 'Historique',
                        icon: 'pi pi-fw pi-wallet',
                        to: '/transfert/historique'
                    }
                ]
            },
            {
                label: 'Contacts',
                icon: 'pi pi-fw pi-users',
                to: '/contact/liste'
            },
            {
                label: 'Agences',
                icon: 'pi pi-fw pi-map-marker',
                to: '/agence/liste'
            },
        ]
    },
    {
        items: [
            {
                label: 'Parametre',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Taux',
                        icon: 'pi pi-fw pi-percentage',
                        to:'/parametres/taux/liste'
                    },
                    {
                        label: 'Devise',
                        icon: 'pi pi-fw pi-wallet',
                        to:'/parametres/devise/liste'
                    }
                ]
            }
        ]
    },
   
   
]);
</script>

<template>
    <AppSubMenu :model="model" />
</template>

<style lang="scss" scoped></style>
