
<template>
    <Drawer v-model:visible="layoutState.profileSidebarVisible" position="right" class="layout-profile-sidebar w-full sm:w-[25rem]">
        <div class="flex flex-col mx-auto md:mx-0">
            <span class="mb-2 font-semibold">Welcome</span>
            <span class="text-surface-500 dark:text-surface-400 font-medium mb-8">Issa BARRY</span>

            <ul class="list-none m-0 p-0">
                <li>
                    <a class="cursor-pointer flex mb-4 p-4 items-center border border-surface-200 dark:border-surface-700 rounded hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-150">
                        <span>
                            <i class="pi pi-user text-xl text-primary"></i>
                        </span>
                        <div class="ml-4" @click="navigateToProfile">
                            <span class="mb-2 font-semibold" >Profile</span>
                            <p class="text-surface-500 dark:text-surface-400 m-0">Voir mes informations</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cursor-pointer flex mb-4 p-4 items-center border border-surface-200 dark:border-surface-700 rounded hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-150">
                        <span>
                            <i class="pi pi-money-bill text-xl text-primary"></i>
                        </span>
                        <div class="ml-4">
                            <span class="mb-2 font-semibold">Historique</span>
                            <p class="text-surface-500 dark:text-surface-400 m-0">Historiquet de transfert</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cursor-pointer flex mb-4 p-4 items-center border border-surface-200 dark:border-surface-700 rounded hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-150">
                        <span>
                            <i class="pi pi-cog text-xl text-primary"></i>
                        </span>
                        <div class="ml-4">
                            <span class="mb-2 font-semibold">Parammetre</span> 
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cursor-pointer flex mb-4 p-4 items-center border border-surface-200 dark:border-surface-700 rounded hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-150">
                        <span>
                            <i class="pi pi-power-off text-xl text-primary"></i>
                        </span>
                        <div class="ml-4">
                            <span class="mb-2 font-semibold" @click="navigateToLogin">Déconnexion</span> 
                        </div>
                    </a>
                </li>
            </ul>
        </div> 
    </Drawer>
</template>

<script setup>
const { layoutState } = useLayout();
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToLogin() {
    layoutState.profileSidebarVisible = false;
    router.push({ name: 'login' });
}

function navigateToProfile() {
    layoutState.profileSidebarVisible = false;
    router.push({ name: 'profile' });
}


</script>
