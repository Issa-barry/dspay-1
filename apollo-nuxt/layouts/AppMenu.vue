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
            // {
            //     label: 'Facturation',
            //     icon: 'pi pi-fw pi-calculator',
            //     items: [
            //         {
            //             label: 'Liste',
            //             icon: 'pi pi-fw pi-credit-card',
            //             to: '/facturation/liste'
            //         },
            //         {
            //             label: 'Encaissement',
            //             icon: 'pi pi-fw pi-credit-card',
            //             to: '/facturation/encaissement'
            //         },
            //         {
            //             label: 'Rembourssement',
            //             icon: 'pi  pi-wallet',
            //             to:'/facturation/rembourssement'
            //         }, 
            //     ]
            // },
            {
                label: 'Facturation',
                icon: 'pi pi-fw pi-users',
                to: '/facturation/liste'
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
                        to:'/parametres/general'
                    },
                    {
                        label: 'Devise',
                        icon: 'pi pi-fw pi-percentage',
                        to:'/parametres/devise/liste'
                    },
                    {
                        label: 'Taux',
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
    // {
    //     label: 'Pages',
    //     icon: 'pi pi-fw pi-briefcase',
    //     items: [
    //         {
    //             label: 'Landing',
    //             icon: 'pi pi-fw pi-globe',
    //             to: '/landing'
    //         },
    //         {
    //             label: 'Auth',
    //             icon: 'pi pi-fw pi-user',
    //             items: [
    //                 {
    //                     label: 'Login',
    //                     icon: 'pi pi-fw pi-sign-in',
    //                     to: '/auth/login'
    //                 },
    //                 {
    //                     label: 'Error',
    //                     icon: 'pi pi-fw pi-times-circle',
    //                     to: '/auth/error'
    //                 },
    //                 {
    //                     label: 'Access Denied',
    //                     icon: 'pi pi-fw pi-lock',
    //                     to: '/auth/access'
    //                 },
    //                 {
    //                     label: 'Register',
    //                     icon: 'pi pi-fw pi-user-plus',
    //                     to: '/auth/register'
    //                 },
    //                 {
    //                     label: 'Forgot Password',
    //                     icon: 'pi pi-fw pi-question',
    //                     to: '/auth/forgotpassword'
    //                 },
    //                 {
    //                     label: 'New Password',
    //                     icon: 'pi pi-fw pi-cog',
    //                     to: '/auth/newpassword'
    //                 },
    //                 {
    //                     label: 'Verification',
    //                     icon: 'pi pi-fw pi-envelope',
    //                     to: '/auth/verification'
    //                 },
    //                 {
    //                     label: 'Lock Screen',
    //                     icon: 'pi pi-fw pi-eye-slash',
    //                     to: '/auth/lockscreen'
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Crud',
    //             icon: 'pi pi-fw pi-pencil',
    //             to: '/pages/crud'
    //         },
    //         {
    //             label: 'Invoice',
    //             icon: 'pi pi-fw pi-dollar',
    //             to: '/pages/invoice'
    //         },
    //         {
    //             label: 'About Us',
    //             icon: 'pi pi-fw pi-user',
    //             to: '/pages/aboutus'
    //         },
    //         {
    //             label: 'Help',
    //             icon: 'pi pi-fw pi-question-circle',
    //             to: '/pages/help'
    //         },
    //         {
    //             label: 'Not Found',
    //             icon: 'pi pi-fw pi-exclamation-circle',
    //             to: '/pages/notfound'
    //         },
    //         {
    //             label: 'Empty',
    //             icon: 'pi pi-fw pi-circle-off',
    //             to: '/pages/empty'
    //         },
    //         {
    //             label: 'FAQ',
    //             icon: 'pi pi-fw pi-question',
    //             to: '/pages/faq'
    //         },
    //         {
    //             label: 'Contact Us',
    //             icon: 'pi pi-fw pi-phone',
    //             to: '/pages/contactus'
    //         }
    //     ]
    // },
   
   
]);
</script>

<template>
    <AppSubMenu :model="model" />
</template>

<style lang="scss" scoped></style>
