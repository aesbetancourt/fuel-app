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
<!--                <ion-label position="stacked">Placa <ion-text color="danger">*</ion-text></ion-label>-->
<!--                <ion-input placeholder="Ingrese placa"></ion-input>-->
                <label for="placa">Ingrese placa</label>
                <input type="text" id="placa" v-model="id" placeholder="Ingrese placa" >

            </ion-item>
            <ion-button @click="checkPlateID">Verificar</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
    import Modal from './Modal.vue'
    // import db from '../database.js'
    // const dateTime = require('date-time');



    function lastDigit(plate) {
        let plat = [...plate].reverse();
        for (let i = 0; i < plat.length; i++) {
            var last_number = plat[i];
            if (!isNaN(last_number)) {
                break
            }
        }
        return last_number
    }


    let current_day;
    function askAPI() {
        const request = new XMLHttpRequest();
        request.open('GET', 'http://worldclockapi.com/api/json/est/now', true);
        request.onload = function() {
            let data = JSON.parse(this.response);
            current_day = data["dayOfTheWeek"];
        };
        request.send()
    }


    // Monday: 0123, tuesday 456, wednesday 789, thursday 0123, friday 456, saturday 789
    function isValidDay(plate) {
        let digit = lastDigit(plate);
        console.log(digit, current_day);
        let valid_day;
        if ((digit === 0 || digit === 1 || digit === 2 || digit === 3) && (current_day === "Monday" || current_day === "Thursday")){
           valid_day = true
        } else if ((digit === 4 || digit === 5 || digit === 6) && (current_day === "Tuesday" || current_day === "Friday")){
            valid_day = true
        } else if ((digit === 7 || digit === 8 || digit === 9) && (current_day === "Wednesday" || current_day === "Saturday")){
            valid_day = true
        } else {
            valid_day = true
        }
        return valid_day
    }


    export default {
        data(){
            return{
                id: null,
                day: null,
                valid: false
            }
        },
        methods: {
            checkPlateID() {
                console.log(this.id);
                console.log(isValidDay(this.id));


                // if (this.id !== null){
                //     this.throwModal()
                // }
            },
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
        },
        created() {
            askAPI()
        }
    }
</script>
<style scoped>

</style>
