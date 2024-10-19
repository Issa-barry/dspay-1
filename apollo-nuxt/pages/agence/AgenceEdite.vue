<script setup>
import { onMounted, ref } from 'vue';

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const dropdownItem = ref(null);
//responssable 
const responssable = ref([
    { name: 'Mamdou BAH', code: 'Option 1' },
    { name: 'Oumar Sow', code: 'Option 2' },
    { name: 'Elhadje TALL', code: 'Option 3' },
    { name: 'Nene Souadou DIALLO', code: 'Option 3' },
    { name: 'Fatoumata BARRY', code: 'Option 3' }
]);
const selectResponssable = ref(null);

//Pays
const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);
const selectedCountry = ref(null);

// /**Bouton confirme**/
import { ProductService } from '@/service/ProductService';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';


const display = ref(false);
const displayConfirmation = ref(false);
const visibleLeft = ref(false);
const visibleRight = ref(false);
const visibleTop = ref(false);
const visibleBottom = ref(false);
const visibleFull = ref(false);
const products = ref(null);
const selectedProduct = ref(null);
const op = ref(null);
const op2 = ref(null);
const popup = ref(null);

const toast = useToast();
const confirmPopup = useConfirm();

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
});

function open() {
    display.value = true;
}

function close() {
    display.value = false;
}

function openConfirmation() {
    displayConfirmation.value = true;
}

function closeConfirmation() {
    displayConfirmation.value = false;
}

function toggleDataTable(event) {
    op2.value.toggle(event);
}

function onProductSelect(event) {
    op.value.hide();
    toast.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name, life: 3000 });
}

function confirm(event) {
    confirmPopup.require({
        target: event.target,
        message: 'Êtes-vous sûr de vouloir ajouter l\'agence ?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Oui ajouter'
        },
        accept: () => {
            toast.add({ severity: 'success', summary: 'Succées : ', detail: 'Agence ajouter avec succés.', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Annulé : ', detail: 'Ajout de l\'agence annulé.', life: 3000 });
        }
    });
}
</script>


<template>
    <div class="card">
        <span class="text-surface-900 dark:text-surface-0 text-xl font-bold mb-6 block">Agence</span>
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-2">
                <!-- <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4">Profile</div> -->
                <p class="m-0 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4">Information de l'agence & responssable.</p>
            </div>
            <div class="col-span-12 lg:col-span-10">
                <div class="grid grid-cols-12 gap-4">
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="city" class="font-medium text-surface-900 dark:text-surface-0"> Nom-Agence </label>
                        <InputText id="city" type="text" fluid />
                    </div>
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="country" class="font-medium text-surface-900 dark:text-surface-0"> Responssable </label>
                        <Select v-model="selectResponssable" :options="responssable" optionLabel="name" filter fluid placeholder="Selectionnez un reponssable" showClear> </Select>
                    </div>
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="email" class="font-medium text-surface-900 dark:text-surface-0"> Email </label>
                        <InputText id="email" type="text" fluid />
                    </div>
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="telephone" class="font-medium text-surface-900 dark:text-surface-0"> Telephone </label>
                        <InputText id="telephone" type="tel" fluid />
                    </div>
                    <!-- <div class="col-span-12">
                        <Button label="Sauvegarder" class="w-auto mt-4"></Button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <span class="text-surface-900 dark:text-surface-0 text-xl font-bold mb-6 block">Adresse</span>
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-2">
                <!-- <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4">Profile</div> -->
                <p class="m-0 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4">Géolocalisation de l'agence.</p>
            </div>
            
            <div class="col-span-12 lg:col-span-10">
                <div class="mb-6 col-span-12 md:col-span-6">
                    <label for="country" class="font-medium text-surface-900 dark:text-surface-0"> Pays </label>
                    <Select v-model="selectedCountry" :options="countries" optionLabel="name" filter fluid placeholder="Select a Country" showClear>
                        <template #value="slotProps">
                            <div class="flex items-center" v-if="slotProps.value">
                                <span :class="`mr-2 flag flag-${selectedCountry.code.toLowerCase()}`" style="width: 18px; height: 12px" />
                                <div>{{ slotProps.value.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <span :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px; height: 12px" />
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Select>
                </div>
                <div class="grid grid-cols-12 gap-4">
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="city" class="font-medium text-surface-900 dark:text-surface-0"> Adresse </label>
                        <InputText id="city" type="text" fluid />
                    </div>
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="state" class="font-medium text-surface-900 dark:text-surface-0"> Complement adresse </label>
                        <InputText id="state" type="text" fluid />
                    </div>
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="telephone" class="font-medium text-surface-900 dark:text-surface-0"> Code Postal </label>
                        <InputText id="telephone" type="tel" fluid />
                    </div>
                    
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="email" class="font-medium text-surface-900 dark:text-surface-0"> Ville </label>
                        <InputText id="email" type="text" fluid />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
        <div class="mb-3 col-span-1 md:col-span-6">
            <!-- <Button label="Sauvegarder" class="w-auto mt-4" disabled></Button> -->
            <!-- <div class="grid grid-cols-12 gap-4">
                <div class="mb-3 col-span-1 md:col-span-2 flex">
                
                    <ConfirmPopup></ConfirmPopup>
                    <Button ref="popup" @click="confirm($event)" icon="pi pi-check" label="Ajouter" class="mr-2"></Button>
                    <ConfirmPopup></ConfirmPopup>
                </div>
            </div> -->
            <div class="col-span-12">
                <Button class="lg:mt-2 w-auto p-2" severity="secondary" outlined label="Annuler" icon="pi pi-fw pi-arrow-left" @click="navigateToContactListe"></Button> 
                <Button label="Enregistrer" class="w-auto mt-2 lg:ml-4"></Button>
            </div>
        </div>
    </div>
</template>

<!-- 
<template> 
    <Fluid>
        <div class="flex mt-8">
            <div class="card flex flex-col gap-4 w-full">
                <div class="font-semibold text-xl">Ajouter une Agence</div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">Nom-de-l'agence</label>
                        <InputText id="firstname2" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="state">Responssable</label>
                        <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">Email</label>
                        <InputText id="firstname2" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">Téléphone</label>
                        <InputText id="firstname2" type="text" />
                    </div>
                     
                </div>

                <div class="mb-6 col-span-12 md:col-span-6">
                    <label for="country" class="font-medium text-surface-900 dark:text-surface-0"> Pays </label>
                    <Select v-model="selectedCountry" :options="countries" optionLabel="name" filter fluid placeholder="Select a Country" showClear>
                        <template #value="slotProps">
                            <div class="flex items-center" v-if="slotProps.value">
                                <span :class="`mr-2 flag flag-${selectedCountry.code.toLowerCase()}`" style="width: 18px; height: 12px" />
                                <div>{{ slotProps.value.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <span :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px; height: 12px" />
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Select>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="city" class="font-medium text-surface-900 dark:text-surface-0"> Adresse </label>
                        <InputText id="city" type="text" fluid />
                        <small class="text-danger">Erreu</small>
                    </div>
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="state" class="font-medium text-surface-900 dark:text-surface-0"> Complement adresse </label>
                        <InputText id="state" type="text" fluid />
                    </div>
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="telephone" class="font-medium text-surface-900 dark:text-surface-0"> Code Postal </label>
                        <InputText id="telephone" type="tel" fluid />
                    </div>
                    
                    <div class="mb-6 col-span-12 md:col-span-6">
                        <label for="email" class="font-medium text-surface-900 dark:text-surface-0"> Ville </label>
                        <InputText id="email" type="text" fluid />
                    </div>
                    
                </div>
                
                <div class="flex flex-wrap">
                    <label for="address">Description</label>
                    <Textarea id="address" rows="4" />
                </div>
                <div class="grid grid-cols-12 gap-4">
                    <div class="mb-3 col-span-1 md:col-span-2">
                    
                        <ConfirmPopup></ConfirmPopup>
                        <Button ref="popup" @click="confirm($event)" icon="pi pi-check" label="Ajouter" class="mr-2"></Button>
                        <ConfirmPopup></ConfirmPopup>
                    </div>
                    
                </div>
 
                   
                 
            </div>
            
        </div>
        
    </Fluid>
</template> -->


