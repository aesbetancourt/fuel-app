<template>
    <div>
        <ion-header translucent>
            <ion-toolbar>
                <ion-title>Registro de Placas</ion-title>
                <ion-buttons slot="end">
                    <ion-button onclick="dismiss()">Volver</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-label position="stacked">Verifique placa antes de continuar</ion-label>
                <ion-input type="text" readonly>{{ id }}</ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Estación de servicio</ion-label>
                <ion-select placeholder="Seleccionar" cancel-text="Cancelar"
                            :value="selectedOption"
                            @ionChange="selectedOption = $event.target.value">
                    <ion-select-option v-for="(item, index) in this.es"
                                       :key="index"
                                       :value="item">{{ item }}</ion-select-option>

                </ion-select>
            </ion-item>
            <ion-button color="primary" @click="sendToFirestore">Registrar</ion-button>
        </ion-content>
    </div>
</template>

<script>
    import db from '../database.js';

    export default {
        name: 'Modal',
        props: {
            title: { type: String, default: 'Super Modal' },
        },
        data() {
            return {
                id: this.id,
                es: ["ES 1", "ES 2", "ES 3", "ES 4", "ES 5", "ES 6"],
                selectedOption: null
            }
        },
        methods:{
            showSuccessToast(){
                return this.$ionic.toastController
                    .create({
                        message: 'Placa registrada satisfactoriamente.',
                        duration: 3000,
                    })
                    .then(a => a.present())
            },
            sendToFirestore(){
                let info = {
                    id: this.id,
                    es: this.selectedOption,
                    date: this.date,
                    hour: this.hour
                };
                db.collection("placas").add(info).then(() =>{
                   this.showSuccessToast()
                })
            }
        }
    }
</script>
