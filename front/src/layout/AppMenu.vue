<script setup>
import { ref } from 'vue';

import AppSubMenu from './AppSubMenu.vue';

const model = ref([
    {
        label: 'MENU',
        icon: 'pi pi-home',
        items: [
            {
                label: 'Dashboard-utilisateur',
                icon: 'pi pi-fw pi-bolt',
                to: '/'
            },
            {
                label: 'Dashboard-affaire',
                icon: 'pi pi-fw pi-chart-line',
                to: '/dashboard-banking'
            },
            {
                label: 'Point de retrait',
                icon: 'pi pi-fw pi-map-marker',
                to: '/point-de-retrait/liste'
            }
        ]
    },
    // {
    //     label: 'Apps',
    //     icon: 'pi pi-th-large',
    //     items: [
    //         {
    //             label: 'Blog',
    //             icon: 'pi pi-fw pi-comment',
    //             items: [
    //                 {
    //                     label: 'List',
    //                     icon: 'pi pi-fw pi-image',
    //                     to: '/apps/blog/list'
    //                 },
    //                 {
    //                     label: 'Detail',
    //                     icon: 'pi pi-fw pi-list',
    //                     to: '/apps/blog/detail'
    //                 },
    //                 {
    //                     label: 'Edit',
    //                     icon: 'pi pi-fw pi-pencil',
    //                     to: '/apps/blog/edit'
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Chat',
    //             icon: 'pi pi-fw pi-comments',
    //             to: '/apps/chat'
    //         },
    //         {
    //             label: 'Files',
    //             icon: 'pi pi-fw pi-folder',
    //             to: '/apps/files'
    //         },
    //         {
    //             label: 'Mail',
    //             icon: 'pi pi-fw pi-envelope',
    //             items: [
    //                 {
    //                     label: 'Inbox',
    //                     icon: 'pi pi-fw pi-inbox',
    //                     to: '/apps/mail/inbox'
    //                 },
    //                 {
    //                     label: 'Compose',
    //                     icon: 'pi pi-fw pi-pencil',
    //                     to: '/apps/mail/compose'
    //                 },
    //                 {
    //                     label: 'Detail',
    //                     icon: 'pi pi-fw pi-comment',
    //                     to: '/apps/mail/detail/1000'
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Task List',
    //             icon: 'pi pi-fw pi-check-square',
    //             to: '/apps/tasklist'
    //         }
    //     ]
    // },
    // {
    //     label: 'UI Kit',
    //     icon: 'pi pi-fw pi-star-fill',
    //     items: [
    //         {
    //             label: 'Form Layout',
    //             icon: 'pi pi-fw pi-id-card',
    //             to: '/uikit/formlayout'
    //         },
    //         {
    //             label: 'Input',
    //             icon: 'pi pi-fw pi-check-square',
    //             to: '/uikit/input'
    //         },
    //         {
    //             label: 'Button',
    //             icon: 'pi pi-fw pi-box',
    //             to: '/uikit/button'
    //         },
    //         {
    //             label: 'Table',
    //             icon: 'pi pi-fw pi-table',
    //             to: '/uikit/table'
    //         },
    //         {
    //             label: 'List',
    //             icon: 'pi pi-fw pi-list',
    //             to: '/uikit/list'
    //         },
    //         {
    //             label: 'Tree',
    //             icon: 'pi pi-fw pi-share-alt',
    //             to: '/uikit/tree'
    //         },
    //         {
    //             label: 'Panel',
    //             icon: 'pi pi-fw pi-tablet',
    //             to: '/uikit/panel'
    //         },
    //         {
    //             label: 'Overlay',
    //             icon: 'pi pi-fw pi-clone',
    //             to: '/uikit/overlay'
    //         },
    //         {
    //             label: 'Media',
    //             icon: 'pi pi-fw pi-image',
    //             to: '/uikit/media'
    //         },
    //         {
    //             label: 'Menu',
    //             icon: 'pi pi-fw pi-bars',
    //             to: '/uikit/menu'
    //         },
    //         {
    //             label: 'Message',
    //             icon: 'pi pi-fw pi-comment',
    //             to: '/uikit/message'
    //         },
    //         {
    //             label: 'File',
    //             icon: 'pi pi-fw pi-file',
    //             to: '/uikit/file'
    //         },
    //         {
    //             label: 'Chart',
    //             icon: 'pi pi-fw pi-chart-bar',
    //             to: '/uikit/charts'
    //         },
    //         {
    //             label: 'Timeline',
    //             icon: 'pi pi-fw pi-calendar',
    //             to: '/uikit/timeline'
    //         },
    //         {
    //             label: 'Misc',
    //             icon: 'pi pi-fw pi-circle-off',
    //             to: '/uikit/misc'
    //         }
    //     ]
    // },
    // {
    //     label: 'Prime Blocks',
    //     icon: 'pi pi-fw pi-prime',
    //     items: [
    //         {
    //             label: 'Free Blocks',
    //             icon: 'pi pi-fw pi-eye',
    //             to: '/blocks'
    //         },
    //         {
    //             label: 'All Blocks',
    //             icon: 'pi pi-fw pi-globe',
    //             url: 'https://blocks.primevue.org/',
    //             target: '_blank'
    //         }
    //     ]
    // },
    // {
    //     label: 'Utilities',
    //     icon: 'pi pi-fw pi-compass',
    //     items: [
    //         {
    //             label: 'Figma',
    //             icon: 'pi pi-fw pi-pencil',
    //             url: 'https://www.figma.com/file/zQOW0XBXdCTqODzEOqwBtt/Preview-%7C-Apollo-2022?node-id=335%3A21768&t=69qVULK1NqM8pmnE-1',
    //             target: '_blank'
    //         }
    //     ]
    // },
    {
        label: 'Transfert',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            // {
            //     label: 'Landing',
            //     icon: 'pi pi-fw pi-globe',
            //     to: '/landing'
            // },
            // {
            //     label: 'Auth',
            //     icon: 'pi pi-fw pi-user',
            //     items: [
            //         {
            //             label: 'Login',
            //             icon: 'pi pi-fw pi-sign-in',
            //             to: '/auth/login'
            //         },
            //         {
            //             label: 'Error',
            //             icon: 'pi pi-fw pi-times-circle',
            //             to: '/auth/error'
            //         },
            //         {
            //             label: 'Access Denied',
            //             icon: 'pi pi-fw pi-lock',
            //             to: '/auth/access'
            //         },
            //         {
            //             label: 'Register',
            //             icon: 'pi pi-fw pi-user-plus',
            //             to: '/auth/register'
            //         },
            //         {
            //             label: 'Forgot Password',
            //             icon: 'pi pi-fw pi-question',
            //             to: '/auth/forgotpassword'
            //         },
            //         {
            //             label: 'New Password',
            //             icon: 'pi pi-fw pi-cog',
            //             to: '/auth/newpassword'
            //         },
            //         {
            //             label: 'Verification',
            //             icon: 'pi pi-fw pi-envelope',
            //             to: '/auth/verification'
            //         },
            //         {
            //             label: 'Lock Screen',
            //             icon: 'pi pi-fw pi-eye-slash',
            //             to: '/auth/lockscreen'
            //         }
            //     ]
            // },
            {
                label: 'Nouveau',
                icon: 'pi pi-fw pi-sort-alt-slash',
                to: '/transfert/create'
            },
            {
                label: 'Liste Transfert',
                icon: 'pi pi-fw pi-list',
                to: '/transfert/liste'
            },
            // {
            //     label: 'Invoice',
            //     icon: 'pi pi-fw pi-dollar',
            //     to: '/pages/invoice'
            // },
            // {
            //     label: 'About Us',
            //     icon: 'pi pi-fw pi-user',
            //     to: '/pages/aboutus'
            // },
            // {
            //     label: 'Not Found',
            //     icon: 'pi pi-fw pi-exclamation-circle',
            //     to: '/pages/notfound'
            // },
            // {
            //     label: 'Empty',
            //     icon: 'pi pi-fw pi-circle-off',
            //     to: '/pages/empty'
            // },
            // {
            //     label: 'FAQ',
            //     icon: 'pi pi-fw pi-question',
            //     to: '/pages/faq'
            // },
            // {
            //     label: 'Contact Us',
            //     icon: 'pi pi-fw pi-phone',
            //     to: '/pages/contact'
            // }
        ]
    },
    // {
    //     label: 'E-Commerce',
    //     icon: 'pi pi-fw pi-wallet',
    //     items: [
    //         {
    //             label: 'Product Overview',
    //             icon: 'pi pi-fw pi-image',
    //             to: '/ecommerce/product-overview'
    //         },
    //         {
    //             label: 'Product List',
    //             icon: 'pi pi-fw pi-list',
    //             to: '/ecommerce/product-list'
    //         },
    //         {
    //             label: 'New Product',
    //             icon: 'pi pi-fw pi-plus',
    //             to: '/ecommerce/new-product'
    //         },
    //         {
    //             label: 'Shopping Cart',
    //             icon: 'pi pi-fw pi-shopping-cart',
    //             to: '/ecommerce/shopping-cart'
    //         },
    //         {
    //             label: 'Checkout Form',
    //             icon: 'pi pi-fw pi-check-square',
    //             to: '/ecommerce/checkout-form'
    //         },
    //         {
    //             label: 'Order History',
    //             icon: 'pi pi-fw pi-history',
    //             to: '/ecommerce/order-history'
    //         },
    //         {
    //             label: 'Order Summary',
    //             icon: 'pi pi-fw pi-file',
    //             to: '/ecommerce/order-summary'
    //         }
    //     ]
    // },
    {
        label: 'Gestion Utilisateur',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Liste',
                icon: 'pi pi-fw pi-list',
                to: '/utilisateur/list'
            },
            {
                label: 'Nouveau',
                icon: 'pi pi-fw pi-user-plus',
                to: '/utilisateur/create'
            }
            // {
            //     label: 'Liste',
            //     icon: 'pi pi-fw pi-list',
            //     to: '/profile/list'
            // },
            // {
            //     label: 'Ajout',
            //     icon: 'pi pi-fw pi-plus',
            //     to: '/profile/create'
            // }
        ]
    },
    {
        label: 'Autres',
        icon: 'pi pi-fw pi-align-left',
        items: [
            // {
            //     label: 'Aide ?',
            //     icon: 'pi pi-fw pi-question-circle',
            //     to: '/pages/help'
            // },
            {
                label: 'Parametre',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Taux',
                        icon: 'pi pi-fw pi-percentage',
                    },
                    {
                        label: 'Devise',
                        icon: 'pi pi-fw pi-wallet',
                        // items: [
                        //     {
                        //         label: 'Submenu 2.2.1',
                        //         icon: 'pi pi-fw pi-align-left'
                        //     }
                        // ]
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
