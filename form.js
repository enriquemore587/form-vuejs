// es6-string-html
Vue.component('formulario', {
    template : //html
    `<div class="form">
        <div v-if="loading">
            <div class="form-header mt mr ml ">
                <h1>{{eventName}}</h1>
            </div>
            <div class="form-body mt mr ml ">
                <!-- Start car information -->
                <car-id v-if="eventWithCar"></car-id>
                <div class="no-car mb" v-if="!eventWithCar">
                    <h3>El lugar donde se llevará a cabo este evento no cuenta con lugar de estacionamiento.</h3>
                </div>
                <!-- End car information -->
                <!-- Start Guest information -->
                <guest v-if="eventWithGuest && numGuest > 0"></guest>
                <div class="no-guest" v-if="!eventWithGuest||numGuest==0">
                    <h3>Este evento no permite acompañantes</h3>
                </div>
                <!-- End Guest information -->
            </div>
            <div class="form-footer mt mr ml mb ">
                <button :class="isOkData ? 'btn-reg' : 'btn-disabled'"  :disabled="!isOkData" @click="saveData">
                    {{isOkData ? 'Registrar asistencia' : 'Por favor completa los datos.'}}
                </button>
            </div>
        </div>
        <loading v-if="!loading" message="Registro exitoso"></loading>
    </div>`,
    data() {
        return {
            title : "Nombre form"
        }
    },
    computed: {
        ... Vuex.mapState(["eventName"]),
        ... Vuex.mapState(["eventWithCar"]),
        ... Vuex.mapState(["eventWithGuest"]),
        ... Vuex.mapState(["canSaveGuests"]),
        ... Vuex.mapState(["numGuest"]),
        ... Vuex.mapState(["canSaveCar"]),
        ... Vuex.mapState(["endpoint"]),
        ... Vuex.mapState(["paysheet"]),
        ... Vuex.mapState(["eventId"]),
        ... Vuex.mapState(["savedSuccess"]),
        ... Vuex.mapState(["loading"]),
        ... Vuex.mapState(["loadingMsg"]),
        isOkData(){
            return this.canSaveCar && this.canSaveGuests;
        }
    },
    methods: {
        ... Vuex.mapMutations(["saveData"])
    },
});