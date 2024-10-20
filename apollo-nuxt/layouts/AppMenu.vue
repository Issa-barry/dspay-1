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
                        icon: 'pi pi-fw pi-arrow-up-right',
                        to: '/transfert/create'
                    },
                    {
                        label: 'Retrait',
                        icon: 'pi pi-fw pi-arrow-down-left',
                        to: '/transfert/retrait3'
                    }, 
                ]
            },
            {
                label: 'Facturation',
                icon: 'pi pi-fw pi-calculator',
                items: [
                    {
                        label: 'Liste',
                        icon: 'pi pi-fw pi-credit-card',
                        to: '/facturation/liste'
                    },
                    {
                        label: 'Encaissement',
                        icon: 'pi pi-fw pi-credit-card',
                        to: '/facturation/encaissement'
                    },
                    {
                        label: 'Rembourssement',
                        icon: 'pi  pi-wallet',
                        to:'/facturation/rembourssement'
                    }, 
                ]
            },
            {
                label: 'Contacts',
                icon: 'pi pi-fw pi-users',
                to: '/contact/liste2'
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
                        label: 'Général',
                        icon: 'pi pi-fw pi-percentage',
                        to:'/parametres/taux/liste'
                    },
                    {
                        label: 'Profile',
                        icon: 'pi pi-user pi-wallet',
                        to:'/parametres/profile'
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
