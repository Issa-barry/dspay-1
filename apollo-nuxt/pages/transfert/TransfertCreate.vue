<script setup>
import { ref, computed } from 'vue';

// Variables réactives pour chaque champ
const montantEuro = ref('');
const montantGNF = computed(() => {
    const euroValue = parseFloat(montantEuro.value) || 0;
    const gnfValue = euroValue * 9670;
    return gnfValue.toLocaleString('fr-FR').replace(/\s/g, ' '); // Formatage avec espaces
});

const frais = computed(() => {
    const euroValue = parseFloat(montantEuro.value) || 0;
    if (euroValue > 100) {
        return Math.floor(euroValue / 50) * 5; // Frais croissant par tranche de 50 €
    } else if (euroValue > 50) {
        return 5;
    } else {
        return 2.5;
    }
});

const expediteurTel = ref('');
const expediteurEmail = ref('');
const expediteurNom = ref('');
const expediteurPrenom = ref('');
const receveurTel = ref('');
const receveurNom = ref('');
const receveurPrenom = ref('');
const payerFrais = ref(true);  // Variable pour switch frais
const tva = 0; // TVA en pourcentage

// Génération aléatoire d'un code de 6 caractères (chiffres et lettres)
function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const showPopup = ref(false); // Pour afficher la pop-up
const randomCode = ref('');   // Stocke le code aléatoire généré

// Calcul TVA
const montantTVA = computed(() => {
    const euroValue = parseFloat(montantEuro.value) || 0;
    return (euroValue * tva / 100).toFixed(2);
});

// Calcul total
const totalAvecFrais = computed(() => {
    const euroValue = parseFloat(montantEuro.value) || 0;
    const fraisValue = payerFrais.value ? frais.value : 0;
    return (euroValue + parseFloat(montantTVA.value) + fraisValue).toFixed(2);
});

// Fonction pour afficher la pop-up au clic sur "Valider"
function valider() {
    randomCode.value = generateCode(); // Générer un code aléatoire
    showPopup.value = true; // Afficher la pop-up
}


import { CountryService } from '../../service/CountryService';
import { NodeService } from '../../service/NodeService';
import { onMounted} from 'vue';

const floatValue = ref(null);
const autoValue = ref(null);
const selectedAutoValue = ref(null);
const autoFilteredValue = ref([]);
const calendarValue = ref(null);
const inputNumberValue = ref(null);
const sliderValue = ref(50);
const ratingValue = ref(null);
const colorValue = ref('#1976D2');
const radioValue = ref(null);
const checkboxValue = ref([]);
const switchValue = ref(false);
const listboxValues = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const listboxValue = ref(null);
const dropdownValues = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const dropdownValue = ref(null);
const multiselectValues = ref([
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

const multiselectValue = ref(null);
const toggleValue = ref(false);
const selectButtonValue = ref(null);
const selectButtonValues = ref([{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]);
const knobValue = ref(50);
const inputGroupValue = ref(false);
const treeSelectNodes = ref(null);
const selectedNode = ref(null);

onMounted(() => {
    CountryService.getCountries().then((data) => (autoValue.value = data));
    NodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
});

function searchCountry(event) {
    setTimeout(() => {
        if (!event.query.trim().length) {
            autoFilteredValue.value = [...autoValue.value];
        } else {
            autoFilteredValue.value = autoValue.value.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

</script>

<template>
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Formulaire de saisie -->
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">

                    <div class="font-semibold text-xl">Quartier</div>
                    <AutoComplete v-model="selectedAutoValue" :suggestions="autoFilteredValue" optionLabel="name" placeholder="Cosa, Dabola,..." dropdown  display="chip" @complete="searchCountry($event)" />

                    
                    <!-- MONTANT -->
                    <div class="font-semibold text-xl mt-8">Montant à envoyer ?</div>
                    <div class="flex flex-col md:flex-row gap-4 mb-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="montantEuro">Montant en €</label>
                            <InputText id="montantEuro" v-model="montantEuro" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="montantGNF">Montant en GNF</label>
                            <InputText id="montantGNF" :value="montantGNF" type="text"  />
                        </div>
                    </div>

                    <!-- RECEVEUR -->
                    <div class="font-semibold text-xl mt-0">Receveur ?</div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="receveurTel">Téléphone</label>
                            <InputText id="receveurTel" v-model="receveurTel" type="text" />
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="receveurNom">Nom</label>
                            <InputText id="receveurNom" v-model="receveurNom" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="receveurPrenom">Prénom</label>
                            <InputText id="receveurPrenom" v-model="receveurPrenom" type="text" />
                        </div>
                    </div>

                    <!-- EXPEDITEUR -->
                    <div class="font-semibold text-xl mt-4">Expéditeur ?</div>
                    <div class="flex flex-col md:flex-row gap-4 ">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="expediteurTel">Téléphone</label>
                            <InputText id="expediteurTel" v-model="expediteurTel" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="expediteurEmail">Email</label>
                            <InputText id="expediteurEmail" v-model="expediteurEmail" type="text" />
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="expediteurNom">Nom</label>
                            <InputText id="expediteurNom" v-model="expediteurNom" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="expediteurPrenom">Prénom</label>
                            <InputText id="expediteurPrenom" v-model="expediteurPrenom" type="text" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section récapitulative -->
            <div class="md:w-1/2">
                <div class="card p-4">
                    <!-- <h2 class="font-semibold text-xl mb-4">Récapitulatif des informations</h2> -->
                    <div class="text-surface-900 dark:text-surface-0 text-4xl mb-6 font-medium mt-4">Récapitulatif</div>

                    <div class="p-2 flex-auto text-center md:text-left">
                        <span class="text-surface-900 dark:text-surface-0 font-medium block mt-2 mb-2">Bénéficiaire </span>
                        <span class="text-surface-700 dark:text-surface-100 block">Asma BALDE</span>
                        <span class="text-surface-700 dark:text-surface-100 block">+224 666 17 70 06</span>
                    </div>

                    <div class="p-2 flex-auto text-center md:text-left">
                        <span class="text-surface-900 dark:text-surface-0 font-medium block mt-2 mb-2">Expediteur </span>
                        <span class="text-surface-700 dark:text-surface-100 block">Issa BARRY</span>
                        <span class="text-surface-700 dark:text-surface-100 block">+33 7 58 85 50 39</span>
                        <span class="text-surface-700 dark:text-surface-100 block">issabarry67@gmail.com</span>
                    </div>
 
                    <hr class="mt-4"/>
                    <div class="mb-4 flex justify-between mt-4">
                        <span class="font-semibold">Montant en € :</span>
                        <span>€ {{ montantEuro }}</span>
                    </div>
                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Montant en GNF :</span>
                        <span>GNF {{ montantGNF }} </span>
                    </div>

                    <!-- <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Beneficiaire:</span>
                        <span> {{ receveurNom }}  {{ receveurPrenom }} </span>
                    </div>
 -->

                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Frais :</span>
                        <span>{{ frais }} €</span>
                    </div>

                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Payer les frais :</span>
                        <InputSwitch v-model="payerFrais" />
                    </div>
                  

                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Total à payer :</span>
                        <span>{{ totalAvecFrais }} €</span>
                    </div>
                    
                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Quartier :</span>
                        <span>Conakry cosa</span>
                    </div>
                    <!-- <Button label="Valider" class="p-button-success mt-4" @click="valider" /> -->
                    <Button class="flex-1 mt-4" label="Valider" icon="pi pi-fw pi-check" @click="valider"></Button>
                </div>
            </div>
        </div>

        <Dialog header="..." v-model:visible="showPopup" modal style="width: 30vw;">
            
                <div class="grid grid-cols-12 gap-4 grid-nogutter">
                    <div class="col-span-12   py-2 md:px-3"> 
                        <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl my-2">Ticket</div>
                        <div :style="{ height: '3px', background: 'linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%)' }"></div>
                        <div class="mb-4 mt-6 sm:mb-0">
                            <span class="font-medium text-xl text-surface-900 dark:text-surface-0 mr-2">Code :</span>
                            <span class="font-medium text-xl text-blue-500">DP1234</span>
                        </div>
                        <div class="flex flex-col lg:flex-row flex-wrap lg:items-center py-2 mt-4 border-surface-200 dark:border-surface-700">
                            <div class="flex-auto lg:ml-4">
                               <div class="flex items-center justify-between mb-4">
                                   <span class="text-surface-900 dark:text-surface-0 font-bold">Receveur</span>
                                   <!-- <span class="text-surface-900 dark:text-surface-0 font-bold">GNF 967 000</span> -->
                               </div>
                               <div class="text-surface-600 dark:text-surface-200 text-sm mb-2">Alpha Ousmane BARRY</div>
                               <div class="text-surface-600 dark:text-surface-200 text-sm mb-2">+224 666 17 70 06</div>
                               <div class="text-surface-600 dark:text-surface-200 text-sm mb-2">Montant : GNF 967 000</div>
                               <div class="text-surface-600 dark:text-surface-200 text-sm mb-2">Agence : 666 17 70 06</div>
                           </div>
                       </div>
                       <div class="flex flex-col lg:flex-row flex-wrap lg:items-center py-2 mt-2 border-surface-200 dark:border-surface-700">
                        <div class="flex-auto lg:ml-4">
                           <div class="flex items-center justify-between mb-4">
                               <span class="text-surface-900 dark:text-surface-0 font-bold">Expediteur</span>
                               <span class="text-surface-900 dark:text-surface-0 font-bold">France</span>
                           </div>
                           <div class="text-surface-600 dark:text-surface-200 text-sm mb-2">Issa BARRY</div>
                           <div class="text-surface-600 dark:text-surface-200 text-sm mb-2">+33 7 58 85 50 39</div>
                       </div>
                   </div>
                       
                        <div class="py-2 mt-2">
                            <div class="flex justify-between items-center mb-4">
                                <span class="text-surface-900 dark:text-surface-0 font-medium">Montant envoyé</span>
                                <span class="text-surface-900 dark:text-surface-0">€ 100</span>
                            </div>
                            <div class="flex justify-between items-center mb-4">
                                <span class="text-surface-900 dark:text-surface-0 font-medium">Frais</span>
                                <span class="text-primary font-bold">€ 5</span>
                            </div>
                            <div class="flex justify-between items-center mb-4">
                                <span class="text-surface-900 dark:text-surface-0 font-bold">Total</span>
                                <span class="text-surface-900 dark:text-surface-0 font-medium text-xl">€ 105</span>
                            </div>
                        </div>
                    </div>
                </div>
            
        </Dialog>
        
        <!-- Pop-up pour afficher le récapitulatif final et le code aléatoire -->
        <!-- <Dialog header="Ticket" v-model:visible="showPopup" modal style="width: 50vw;">
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Expéditeur :</span>
                <span>{{ expediteurNom }} {{ expediteurPrenom }}</span>
            </div>
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Receveur :</span>
                < <span>{{ receveurTel }}</span>
                <div>{{ receveurNom }} {{ receveurPrenom }}</div>
            </div>

            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Telephone Receveur :</span>
                <span>{{ receveurTel }}</span> 
            </div>

             Autres informations  
             <div class="mb-4 flex justify-between">
                <span class="font-semibold">Montant en € :</span>
                <span>{{ montantEuro }}</span>
            </div>  
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Montant à recuperer en GNF :</span>
                <span>{{ montantGNF }}</span>
            </div>
             <div class="mb-4 flex justify-between">
                <span class="font-semibold">Frais :</span>
                <span>{{ frais }} €</span>
            </div>  
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Payer les frais :</span>
                <span>{{ payerFrais ? 'Oui' : 'Non' }}</span>
            </div>  
             <div class="mb-4 flex justify-between">
                <span class="font-semibold">TVA :</span>
                <span>{{ montantTVA }} €</span>
            </div>  
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Total :</span>
                <span>{{ totalAvecFrais }} €</span>
            </div>  
            <div class="mt-4 font-semibold text-center">Code de transaction : {{ randomCode }}</div>
        </Dialog>
         -->
    </Fluid>
</template>
