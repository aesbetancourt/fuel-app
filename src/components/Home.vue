<template>
    <ion-page class="ion-page" main>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>
                    Sistema de gestión de surtido
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-content" padding>
            <ion-item>
                <ion-label position="stacked">Placa <ion-text color="danger">*</ion-text></ion-label>
                <ion-input placeholder="Ingrese placa" id="placa"></ion-input>

            </ion-item>
            <ion-button @click="checkID">Verificar</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
    import Modal from './Modal.vue'
    // import db from '../database.js'
    // const dateTime = require('date-time');

    export default {
        data(){
            return{
                id: null
            }
        },
        methods: {
            throwModal(){
                return this.$ionic.modalController
                    .create({
                        component: Modal,
                        componentProps: {
                            data: {
                                content: 'New Content',
                            },
                            propsData: {
                                title: 'New title',
                            },
                        },
                    })
                    .then(m => m.present())
            },
            checkID() {
                console.log(this.id)
                if (this.id !== null){
                    this.throwModal()
                }



            },
        },
    }
</script>
<style scoped>

</style>
