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
    import Modal from './Modal.vue';
    import db from '../database.js';


    //
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


    //
    let current_day;
    let current_date;
    let current_hour;
    function askAPI() {
        const request = new XMLHttpRequest();
        request.open('GET', 'http://worldclockapi.com/api/json/est/now', true);
        request.onload = function() {
            let data = JSON.parse(this.response);
            current_day = data["dayOfTheWeek"];
            let date = data["currentDateTime"].split("T");
            current_date = date[0];
            current_hour = date[1].split("-")[0];
        };
        request.send()
    }

    //
    // Monday: 0123, tuesday 456, wednesday 789, thursday 0123, friday 456, saturday 789
    function isValidDay(plate) {
        let digit = lastDigit(plate);
        let valid_day = false;
        if ((digit === "0" || digit === "1" || digit === "2" || digit === "3") && (current_day === "Monday" || current_day === "Thursday")){
           valid_day = true
        } else if ((digit === "4" || digit === "5" || digit === "6") && (current_day === "Tuesday" || current_day === "Friday")){
            valid_day = true
        } else if ((digit === "7" || digit === "8" || digit === "9") && (current_day === "Wednesday" || current_day === "Saturday")){
            valid_day = true
        } else {
            valid_day = false
        }
        return valid_day
    }
    
    
    let last_time;
    //let last_hour;
    function checkIDInFirestore(id) {
        db.collection("placas").where("id", "==", id).get().then((snapshot) =>{
            snapshot.forEach(doc => {
                last_time = doc.data().date;
                //last_hour = doc.data().hour;
            });
        })
    }

    function getDifferenceDays(last, current) {
        let date1 = new Date(last);
        let date2 = new Date(current);
        let Difference_In_Time = date2.getTime() - date1.getTime();
        let days = Difference_In_Time / (1000 * 3600 * 24);
        return days

    }
    
    export default {
        data(){
            return{
                id: null,
                day: null,
                valid: false,
                hour: null,
                date: null
            }
        },
        methods: {
            //
            notTodayAlert(){
                return this.$ionic.alertController
                    .create({
                        header: 'Alerta',
                        subHeader: 'Dia no permitido',
                        message: 'Este vehiculo no puede surtir el dia de hoy.',
                        buttons: ['Aceptar'],
                    })
                    .then(a => a.present())
            },
            //
            throwRegisterModal(){
                return this.$ionic.modalController
                    .create({
                        component: Modal,
                        componentProps: {
                            data: {
                                id: this.id,
                                date: current_date,
                                hour: current_hour
                            },
                            propsData: {
                                title: 'Registrar Placa',
                            },
                        },
                    })
                    .then(m => m.present())
            },
            //
            checkPlateID() {
                checkIDInFirestore(this.id);
                let days = getDifferenceDays(last_time, current_date);
                console.log(days)
                //if ()

                if (!isValidDay(this.id)) {
                    this.notTodayAlert();
                } else {
                    askAPI();
                    this.throwRegisterModal();
                }
            },
        },
        created() {
            askAPI()
        }
    }
</script>
<style scoped>

</style>
