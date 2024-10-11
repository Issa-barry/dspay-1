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
</script>

<template>
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Formulaire de saisie -->
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl mt-8">Montant à envoyer ?</div>
                    
                    <div class="flex flex-col md:flex-row gap-4 mb-8">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="montantEuro">Montant en €</label>
                            <InputText id="montantEuro" v-model="montantEuro" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="montantGNF">Montant en GNF</label>
                            <InputText id="montantGNF" :value="montantGNF" type="text" disabled />
                        </div>
                    </div>

                    <div class="font-semibold text-xl">Expéditeur ?</div>
                    <div class="flex flex-col md:flex-row gap-4">
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

                    <div class="font-semibold text-xl mt-8">Receveur ?</div>
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
                </div>
            </div>

            <!-- Section récapitulative -->
            <div class="md:w-1/2">
                <div class="card p-4">
                    <h2 class="font-semibold text-xl mb-4">Récapitulatif des informations</h2>
                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Montant en € :</span>
                        <span>€ {{ montantEuro }}</span>
                    </div>
                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Montant en GNF :</span>
                        <span>GNF {{ montantGNF }} </span>
                    </div>

                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Beneficiaire:</span>
                        <span> {{ receveurNom }}  {{ receveurPrenom }} </span>
                    </div>

                    <!-- <div class="mb-4 flex justify-between">
                        <span class="font-semibold">TVA ({{ tva }}%) :</span>
                        <span>{{ montantTVA }} €</span>
                    </div> -->

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

                    <Button label="Valider" class="p-button-success mt-4" @click="valider" />
                </div>
            </div>
        </div>

        <!-- Pop-up pour afficher le récapitulatif final et le code aléatoire -->
        <Dialog header="Ticket" v-model:visible="showPopup" modal style="width: 50vw;">
            <!-- Informations de l'expéditeur -->
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Expéditeur :</span>
                <span>{{ expediteurNom }} {{ expediteurPrenom }}</span>
            </div>
            
            <!-- Informations du receveur -->
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Receveur :</span>
                <!-- <span>{{ receveurTel }}</span> -->
                <div>{{ receveurNom }} {{ receveurPrenom }}</div>
            </div>

            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Telephone Receveur :</span>
                <span>{{ receveurTel }}</span> 
            </div>

            <!-- Autres informations -->
            <!-- <div class="mb-4 flex justify-between">
                <span class="font-semibold">Montant en € :</span>
                <span>{{ montantEuro }}</span>
            </div> -->
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Montant à recuperer en GNF :</span>
                <span>{{ montantGNF }}</span>
            </div>
            <!-- <div class="mb-4 flex justify-between">
                <span class="font-semibold">Frais :</span>
                <span>{{ frais }} €</span>
            </div> -->
            <!-- <div class="mb-4 flex justify-between">
                <span class="font-semibold">Payer les frais :</span>
                <span>{{ payerFrais ? 'Oui' : 'Non' }}</span>
            </div> -->
            <!-- <div class="mb-4 flex justify-between">
                <span class="font-semibold">TVA :</span>
                <span>{{ montantTVA }} €</span>
            </div> -->
            <!-- <div class="mb-4 flex justify-between">
                <span class="font-semibold">Total :</span>
                <span>{{ totalAvecFrais }} €</span>
            </div> -->
            <div class="mt-4 font-semibold text-center">Code de transaction : {{ randomCode }}</div>
        </Dialog>
    </Fluid>
</template>
