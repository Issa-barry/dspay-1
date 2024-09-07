<template>
    <div class="card">
        <!-- Stepper horizontal pour les écrans plus larges -->
        <div v-if="!isMobile" class="flex justify-center">
            <Stepper value="1" class="basis-[100rem]">
                <StepList>
                    <Step value="1">Montant</Step>
                    <Step value="2">Expediteur</Step>
                    <Step value="3">Receveur</Step>
                    <Step value="4">Paiement</Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                
                                <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 100rem">
                                    <div class="text-center mt-4 mb-4 text-xl font-semibold">Transfert</div>
                                    <div class="field">
                                        <InputText id="input" v-model="name" type="text" placeholder="Montant en €" fluid />
                                    </div>
                                    <div class="field">
                                        <InputText id="email" v-model="email" type="email" placeholder="Montant en GNF" fluid />
                                    </div>
                                    <div class="field">
                                        1 € = 999 GNF
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex pt-6 justify-end">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>

                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                Content II
                            </div>
                        </div>
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>

                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                Content III
                            </div>
                        </div>
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('4')" />
                        </div>
                    </StepPanel>

                    <StepPanel v-slot="{ activateCallback }" value="4">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                Mode paiement
                            </div>
                        </div>
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>

        <!-- Stepper vertical pour les mobiles -->
        <div v-else>
            <Stepper value="1">
                <StepItem value="1">
                    <Step>Montant</Step>
                    <StepPanel v-slot="{ activateCallback }">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                        </div>
                        <div class="py-6">
                            <Button label="Next" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                </StepItem>
                <StepItem value="2">
                    <Step>Expediteur</Step>
                    <StepPanel v-slot="{ activateCallback }">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                        </div>
                        <div class="flex py-6 gap-2">
                            <Button label="Back" severity="secondary" @click="activateCallback('1')" />
                            <Button label="Next" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                </StepItem>
                <StepItem value="3">
                    <Step>Receveur</Step>
                    <StepPanel v-slot="{ activateCallback }">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                        </div>
                        <div class="flex py-6 gap-2">
                            <Button label="Back" severity="secondary" @click="activateCallback('2')" />
                            <Button label="Next" @click="activateCallback('4')" />
                        </div>
                    </StepPanel>
                </StepItem>
                <StepItem value="4">
                    <Step>Paiement</Step>
                    <StepPanel v-slot="{ activateCallback }">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Mode paiement</div>
                        </div>
                        <div class="py-6">
                            <Button label="Back" severity="secondary" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                </StepItem>
            </Stepper>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

// Détection de la taille de l'écran
const isMobile = ref(window.innerWidth <= 768);

window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
});
</script>
