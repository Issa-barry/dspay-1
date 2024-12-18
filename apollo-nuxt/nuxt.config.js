// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
    ssr: false, // Désactiver le mode SSR pour générer un site statique
    target: 'static', // Génère une version statique de l'application
    typescript: false,
    app: {
        head: {
            title: 'PrimeVue Apollo Nuxt',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    modules: ['@primevue/nuxt-module', '@nuxtjs/tailwindcss',],
     
    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark'
                }
            },
        },
        autoImport: true
    },
    vite: {
        optimizeDeps: {
            noDiscovery: true,
            include: ['quill']
        }
    },
    compatibilityDate: '2024-10-12',
    hooks: {
        'pages:extend'(pages) {
            pages.push({
                name: 'e-commerce',
                path: '/',
                file: '@/pages/dashboards/index.vue',
                meta: {
                    breadcrumb: ['E-Commerce Dashboard']
                }
            });
            pages.push({
                name: 'banking',
                path: '/dashboard-banking',
                file: '@/pages/dashboards/Banking.vue',
                meta: {
                    breadcrumb: ['Banking Dashboard']
                }
            });
            pages.push({
                name: 'transfert-liste',
                path: '/transfert/liste',
                file: '@/pages/transfert/TransfertListe.vue',
                meta: {
                    breadcrumb: ['Transfert', 'Liste']
                }
            });
            pages.push({
                name: 'transfert-create',
                path: '/transfert/create',
                file: '@/pages/transfert/TransfertCreate.vue',
                meta: {
                    breadcrumb: ['Transfert', 'creation']
                }
            });
            pages.push({
                name: 'transfert-create2',
                path: '/transfert/create2',
                file: '@/pages/transfert/TransfertCreate2.vue',
                meta: {
                    breadcrumb: ['Transfert', 'creation']
                }
            });
            pages.push({
                name: 'transfert-historique',
                path: '/transfert/historique',
                file: '@/pages/transfert/TransfertHistorique.vue',
                meta: {
                    breadcrumb: ['Transfert', 'Historique']
                }
            });
            pages.push({
                name: 'transfert-retrait',
                path: '/transfert/retrait',
                file: '@/pages/transfert/TransfertRetrait.vue',
                meta: {
                    breadcrumb: ['Transfert', 'Retrait']
                }
            });
            pages.push({
                name: 'transfert-retrait2',
                path: '/transfert/retrait2',
                file: '@/pages/transfert/TransfertRetrait2.vue',
                meta: {
                    breadcrumb: ['Transfert', 'Retrait2']
                }
            });
            pages.push({
                name: 'transfert-retrait3',
                path: '/transfert/retrait3',
                file: '@/pages/transfert/TransfertRetrait3.vue',
                meta: {
                    breadcrumb: ['Transfert', 'Retrait3']
                }
            });
            pages.push({
                name: 'agence-liste',
                path: '/agence/liste',
                file: '@/pages/agence/AgenceListe.vue',
                meta: {
                    breadcrumb: ['Agence', 'Liste']
                }
            });
            pages.push({
                name: 'agence-create',
                path: '/agence/create',
                file: '@/pages/agence/AgenceCreate.vue',
                meta: {
                    breadcrumb: ['Agence', 'creation']
                }
            });
            pages.push({
                name: 'agence-show',
                path: '/agence/show',
                file: '@/pages/agence/AgenceShow.vue',
                meta: {
                    breadcrumb: ['Agence', 'Détaille']
                }
            });
            pages.push({
                name: 'agence-edite',
                path: '/agence/edite',
                file: '@/pages/agence/AgenceEdite.vue',
                meta: {
                    breadcrumb: ['Agence', 'Modification']
                }
            });
            pages.push({
                name: 'contact-liste',
                path: '/contact/liste',
                file: '@/pages/contact/ContactListe.vue',
                meta: {
                    breadcrumb: ['Contact', 'Liste']
                }
            });
            pages.push({
                name: 'contact-liste2',
                path: '/contact/liste2',
                file: '@/pages/contact/ContactListe2.vue',
                meta: {
                    breadcrumb: ['Contact', 'Liste2']
                }
            });
            pages.push({
                name: 'contact-create',
                path: '/contact/create',
                file: '@/pages/contact/ContactCreate.vue',
                meta: {
                    breadcrumb: ['Contact', 'creation']
                }
            });
            pages.push({
                name: 'contact-create2',
                path: '/contact/create2',
                file: '@/pages/contact/ContactCreate2.vue',
                meta: {
                    breadcrumb: ['Contact', 'creation 2']
                }
            });
            pages.push({
                name: 'general-liste',
                path: '/parametres/general',
                file: '@/pages/parametres/General.vue',
                meta: {
                    breadcrumb: ['Configuration', 'Général']
                }
            });
            pages.push({
                name: 'taux-liste',
                path: '/parametres/taux/liste',
                file: '@/pages/parametres/TauxListe.vue',
                meta: {
                    breadcrumb: ['Taux', 'Liste']
                }
            });
            pages.push({
                name: 'taux-create',
                path: '/parametres/taux/create',
                file: '@/pages/parametres/TauxCreate.vue',
                meta: {
                    breadcrumb: ['Taux', 'creation']
                }
            });
            pages.push({
                name: 'devise-liste',
                path: '/parametres/devise/liste',
                file: '@/pages/parametres/DeviseListe.vue',
                meta: {
                    breadcrumb: ['Devise', 'Liste']
                }
            });
            pages.push({
                name: 'devise-create',
                path: '/parametres/devise/create',
                file: '@/pages/parametres/DeviseCreate.vue',
                meta: {
                    breadcrumb: ['Devise', 'creation']
                }
            });

            pages.push({
                name: 'profile',
                path: '/parametres/profile',
                file: '@/pages/Profile/Profile.vue',
                meta: {
                    breadcrumb: ['Facture', 'creation']
                }
            });

             
            pages.push({
                name: 'facturation-encaissement',
                path: '/facturation/encaissement',
                file: '@/pages/Facturation/encaissement/Encaissement.vue',
                meta: {
                    breadcrumb: ['Facture', 'creation']
                }
            });
            pages.push({
                name: 'facturation-detaille',
                path: '/facturation/detaille',
                file: '@/pages/Facturation/facture/FactureDetail.vue',
                meta: {
                    breadcrumb: ['Facture', 'detaile']
                }
            });
            pages.push({
                name: 'facturation-affichage',
                path: '/facturation/affichage/facture',
                file: '@/pages/Facturation/facture/FactureAfficher.vue',
                meta: {
                    breadcrumb: ['Facture', 'Affichage']
                }
            });
            pages.push({
                name: 'facturation-rembourssement',
                path: '/facturation/rembourssement',
                file: '@/pages/Facturation/rembourssement/Rembourssement.vue',
                meta: {
                    breadcrumb: ['Facture', 'creation']
                }
            });
            
            pages.push({
                name: 'facturation-liste',
                path: '/facturation/liste',
                file: '@/pages/Facturation/facture/FactureListe.vue',
                meta: {
                    breadcrumb: ['Facture', 'Liste']
                },
                children: [
                    {
                        path: '/facturation/paiement',
                        name: 'mail-inbox',
                        file: '@/pages/apps/mail/MailTypes.vue'
                    },
                ] 
            });

         

            pages.push({
                name: 'chat',
                path: '/apps/chat/',
                file: '@/pages/apps/chat/Index.vue'
            });

            pages.push({
                name: 'mail',
                path: '/apps/mail/',
                file: '@/pages/apps/mail/Index.vue',
                children: [
                    {
                        path: '/apps/mail/inbox',
                        name: 'mail-inbox',
                        file: '@/pages/apps/mail/MailTypes.vue'
                    },
                    {
                        path: '/apps/mail/compose',
                        name: 'mail-compose',
                        file: '@/pages/apps/mail/ComposeNew.vue'
                    },
                    {
                        path: '/apps/mail/detail/:id',
                        name: 'mail-detail',
                        file: '@/pages/apps/mail/Detail.vue'
                    },
                    {
                        path: '/apps/mail/starred',
                        file: '@/pages/apps/mail/MailTypes.vue'
                    },
                    {
                        path: '/apps/mail/spam',
                        file: '@/pages/apps/mail/MailTypes.vue'
                    },
                    {
                        path: '/apps/mail/important',
                        file: '@/pages/apps/mail/MailTypes.vue'
                    },
                    {
                        path: '/apps/mail/sent',
                        file: '@/pages/apps/mail/MailTypes.vue'
                    },
                    {
                        path: '/apps/mail/archived',
                        file: '@/pages/apps/mail/MailTypes.vue'
                    },
                    {
                        path: '/apps/mail/trash',
                        file: '@/pages/apps/mail/MailTypes.vue'
                    }
                ]
            });
            pages.push({
                name: 'tasklist',
                path: '/apps/tasklist',
                file: '@/pages/apps/tasklist/Index.vue'
            });
            pages.push({
                name: 'freeblocks',
                path: '/blocks',
                name: 'blocks',
                meta: {
                    breadcrumb: ['Prime Blocks', 'Free Blocks']
                },
                file: '@/pages/utilities/Blocks.vue'
            });
            pages.push({
                name: 'landing',
                path: '/landing',
                file: '@/pages/pages/Landing.vue'
            });
            pages.push({
                name: 'error',
                path: '/auth/error',
                file: '@/pages/pages/auth/Error.vue'
            });
            pages.push({
                name: 'forgotpassword',
                path: '/auth/forgotpassword',
                file: '@/pages/pages/auth/ForgotPassword.vue'
            });
            pages.push({
                name: 'lockscreen',
                path: '/auth/lockscreen',
                file: '@/pages/pages/auth/LockScreen.vue'
            });
            pages.push({
                name: 'login',
                path: '/auth/login',
                file: '@/pages/pages/auth/Login.vue'
            });
            pages.push({
                name: 'login2',
                path: '/auth/login2',
                file: '@/pages/pages/auth/Login2.vue'
            });
            pages.push({
                name: 'newpassword',
                path: '/auth/newpassword',
                file: '@/pages/pages/auth/NewPassword.vue'
            });
            pages.push({
                name: 'register',
                path: '/auth/register',
                file: '@/pages/pages/auth/Register.vue'
            });
            pages.push({
                name: 'verification',
                path: '/auth/verification',
                file: '@/pages/pages/auth/Verification.vue'
            });
            pages.push({
                name: 'accessDenied',
                path: '/auth/access',
                file: '@/pages/pages/auth/Access.vue'
            });
            pages.push({
                name: 'productoverview',
                path: '/ecommerce/product-overview',
                file: '@/pages/e-commerce/ProductOverview.vue'
            });
            pages.push({
                name: 'checkoutform',
                path: '/ecommerce/checkout-form',
                file: '@/pages/e-commerce/CheckoutForm.vue'
            });
            pages.push({
                name: 'newproduct',
                path: '/ecommerce/new-product',
                file: '@/pages/e-commerce/NewProduct.vue'
            });
            pages.push({
                name: 'orderhistory',
                path: '/ecommerce/order-history',
                file: '@/pages/e-commerce/OrderHistory.vue'
            });
            pages.push({
                name: 'ordersummary',
                path: '/ecommerce/order-summary',
                file: '@/pages/e-commerce/OrderSummary.vue'
            });
            pages.push({
                name: 'productlist',
                path: '/ecommerce/product-list',
                file: '@/pages/e-commerce/ProductList.vue'
            });
            pages.push({
                name: 'shoppingcart',
                path: '/ecommerce/shopping-cart',
                file: '@/pages/e-commerce/ShoppingCart.vue'
            });
            pages.push({
                name: 'userlist',
                path: '/profile/list',
                file: '@/pages/user-management/UserList.vue',
                meta: {
                    breadcrumb: ['User Management', 'List']
                }
            });
            pages.push({
                name: 'user-create',
                path: '/profile/create',
                file: '@/pages/user-management/UserCreate.vue',
                meta: {
                    breadcrumb: ['User Management', 'Create']
                }
            });
            pages.push({
                name: 'documentation',
                path: '/documentation',
                file: '@/pages/utilities/Documentation.vue'
            });
            pages.push({
                name: 'formlayout',
                path: '/uikit/formlayout/',
                file: '@/pages/uikit/FormLayoutDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Form Layout']
                }
            });
            pages.push({
                name: 'Button',
                path: '/uikit/button/',
                file: '@/pages/uikit/ButtonDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Button']
                }
            });
            pages.push({
                name: 'table',
                path: '/uikit/table/',
                file: '@/pages/uikit/TableDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Table']
                }
            });
            pages.push({
                name: 'list',
                path: '/uikit/list/',
                file: '@/pages/uikit/ListDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'List']
                }
            });
            pages.push({
                name: 'tree',
                path: '/uikit/tree/',
                file: '@/pages/uikit/TreeDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Tree']
                }
            });
            pages.push({
                name: 'panel',
                path: '/uikit/panel/',
                file: '@/pages/uikit/PanelsDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Panel']
                }
            });
            pages.push({
                name: 'overlay',
                path: '/uikit/overlay/',
                file: '@/pages/uikit/OverlayDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Overlay']
                }
            });
            pages.push({
                name: 'media',
                path: '/uikit/media/',
                file: '@/pages/uikit/MediaDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Media']
                }
            });
            pages.push({
                name: 'message',
                path: '/uikit/message/',
                file: '@/pages/uikit/MessagesDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Message']
                }
            });
            pages.push({
                name: 'file',
                path: '/uikit/file/',
                file: '@/pages/uikit/FileDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'File']
                }
            });
            pages.push({
                name: 'misc',
                path: '/uikit/misc/',
                file: '@/pages/uikit/MiscDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Misc']
                }
            });
            pages.push({
                name: 'input',
                path: '/uikit/input/',
                file: '@/pages/uikit/InputDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Input']
                }
            });
            pages.push({
                name: 'charts',
                path: '/uikit/charts/',
                file: '@/pages/uikit/ChartDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Charts']
                }
            });
            pages.push({
                name: 'menu',
                path: '/uikit/menu/',
                file: '@/pages/uikit/MenuDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Menu']
                }
            });
            pages.push({
                name: 'timeline',
                path: '/uikit/timeline/',
                file: '@/pages/uikit/TimelineDoc.vue',
                meta: {
                    breadcrumb: ['UI Kit', 'Timeline']
                }
            });
            pages.push({
                name: 'starred',
                path: '/apps/mail/starred',
                file: '@/pages/apps/mail/MailTypes.vue'
            });
            pages.push({
                name: 'spam',
                path: '/apps/mail/spam',
                file: '@/pages/apps/mail/MailTypes.vue'
            });
            pages.push({
                name: 'important',
                path: '/apps/mail/important',
                file: '@/pages/apps/mail/MailTypes.vue'
            });
            pages.push({
                name: 'sent',
                path: '/apps/mail/sent',
                file: '@/pages/apps/mail/MailTypes.vue'
            });
            pages.push({
                name: 'archived',
                path: '/apps/mail/archived',
                file: '@/pages/apps/mail/MailTypes.vue'
            });
            pages.push({
                name: 'trash',
                path: '/apps/mail/trash',
                file: '@/pages/apps/mail/MailTypes.vue'
            });
        }
    },
    alias: {
        quill: process.dev ? 'quill/dist/quill.js' : 'quill'
    },
    css: ['@/assets/styles.scss', '@/assets/tailwind.css', 'primeicons/primeicons.css'],
    devtools: { enabled: false },

   
});