Vue.component('car-id',{
    template : //html
    `
    <div>
        <div class="car-check mt mr ml mb ">
            <label>
                <input type="checkbox" v-model="carOptChecked" v-on:change="changeCarId(carOptChecked)"/>
                Solicitar lugar de estacionamiento
            </label>
        </div>
        <div class="car mb" v-if="carOptChecked" >
            <div class="placa mt mr ml mb ">
                <label :class="isOkPlaca? 'green' : 'orange'">Registrar placas </label>
                <input type="text" placeholder="ej: MUT1234" v-model="carId" @keyup="setCarId(carId)"/>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            msg : 'Lo sentimos el cupo de personas esta lleno',
            carOptChecked : false,
            carId : ""
        }
    },
    computed: {
        isOkPlaca() {
            return (this.carId != '' && this.carOptChecked);
        }
    },
    methods : {
        ... Vuex.mapMutations(["changeCarId"]),
        ... Vuex.mapMutations(["setCarId"])
    }
});