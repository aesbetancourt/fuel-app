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
                <ion-input type="text" readonly>1234567</ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Estación de servicio</ion-label>
                <ion-select placeholder="Seleccionar">
                    <ion-select-option value="1">Estacion 1</ion-select-option>
                    <ion-select-option value="2">Estacion 2</ion-select-option>
                    <ion-select-option value="3">Estacion 3</ion-select-option>
                    <ion-select-option value="4">Estacion 4</ion-select-option>
                    <ion-select-option value="5">Estacion 5</ion-select-option>
                    <ion-select-option value="6">Estacion 6</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-button color="primary">Registrar</ion-button>
        </ion-content>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            title: { type: String, default: 'Super Modal' },
        },
        data() {
            return {
                content: 'Content',
            }
        },
        methods:{
        }
    }
</script>
