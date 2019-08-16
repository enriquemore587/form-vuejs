//providers.js

const HTTP_REQUEST = {
    get : (url, call) => {
      fetch(
        url,
        {
            method : 'get',
            headers : { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        }
      )
      .then(res => res.json())
      .then( result => call(result), error => call(null, error) );
    },
    post : (url, body, headers, call) => {
      fetch(
          url,
          {
            method : 'post',
            headers,
            body : JSON.stringify(body)
          },
          )
      .then(res => res.json())
      .then( result => call(result), error => call(false, error) );
    }
  }
//form.js
// es6-string-html
Vue.component('formulario', {
    template : //html
    `<div class="form ">
        <div class="form-header mt mr ml ">
            <h1>{{eventName}}</h1>
        </div>
        <div class="form-body mt mr ml ">
            <!-- Start car information -->
            <car-id v-if="eventWithCar"></car-id>
            <div class="no-car mb" v-if="!eventWithCar">
                <h3>El lugar donde se llevara este evento no cuenta con estacionamiento.</h3>
            </div>
            <!-- End car information -->
            <!-- Start Guest information -->
            <guest></guest>
            <div class="no-guest" v-if="!eventWithGuest">
                <h3>Este evento no permite acompañantes</h3>
            </div>
            <!-- End Guest information -->
        </div>
        <div class="form-footer mt mr ml mb ">
            <button :class="isOkData ? 'btn-reg' : 'btn-disabled'"  :disabled="!isOkData" @click="saveData">
                {{isOkData ? 'Registrar asistencia' : 'Por favor completa los datos.'}}
            </button>
        </div>
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
        ... Vuex.mapState(["guests"]),
        ... Vuex.mapState(["canSaveCar"]),
        isOkData(){
            return this.canSaveCar && this.canSaveGuests;
        }
    },
    methods: {
        ... Vuex.mapMutations(["saveData"])
    },
});
//guest.js
Vue.component('guest',{
    template : //html
    `
    <div class="guest-container">
        <div class="guest-check mt mr ml mb " >
            <label>
                <input type="checkbox" v-model="guestOptChecked" v-on:change="changeGuest(guestOptChecked)"/>
                Registrar acompañante
            </label>
            <span style="font-size: 0.8em; font-weight: bold;">( Acompañante(s) registrado(s) {{guestOptChecked ? guests.length : 0}} / {{numGuest}} )</span>
        </div>
        <div class="guest" v-if="guestOptChecked">
            <div class="guest-name mt mr ml mb" v-if="showForm">
                <label class="label-name" :class="isOkGuest ? 'green' : 'orange'">Nombre de acompañante </label>
                <input class="guest-full-name" type="text" v-model="guest.name" placeholder="ej. Juan Perez"/>
                <label class="label-age" :class="isOkGuest ? 'green' : 'orange'">Edad </label>
                <input class="guest-age" type="number" v-model="guest.age" placeholder="ej. 32"/>
                <button class="btn-add-guest" @click="addGuest">Agregar</button>
            </div>
        </div>
        <div class="guests" v-if="showTable">
            <table class="guest-table">
                <tr class="guest-fields-name">
                    <td>Nombre</td>
                    <td>Edad</td>
                    <td>Eliminar</td>
                </tr>
                <tr class="guest-list" v-for="(acomp, index) in guests">
                    <td>{{acomp.name}}</td>
                    <td>{{acomp.age}}</td>
                    <td><a class="delete-guest" @click="quitGuest(index)">Quitar</a></td>
                </tr>
            </table>
        </div>
    </div>
    `,
    data() {
        return {
            msg : 'Lo sentimos el cupo de personas esta lleno',
            guestOptChecked : false,
            guest : {name:"", age:""}
        }
    },
    computed: {
        ... Vuex.mapState(["numGuest"]),
        ... Vuex.mapState(["guests"]),
        showForm() {
            return this.guests.length < this.numGuest;
        },
        showTable() {
            return this.guests.length > 0 & this.guestOptChecked;
        },
        isOkGuest() {
            return this.guests.length > 0;
        }
    },
    methods : {
        addGuest() {
            if (this.guest.name == "" || this.guest.age <= 0 || this.guest.age == "") return;
            this.guests.push(this.guest);
            this.guest = {name:"", age:""};
            this.changeGuest(this.guestOptChecked);
        },
        quitGuest(index) {
            this.guests.splice(index,1);
            this.changeGuest(this.guestOptChecked);
        },
        ... Vuex.mapMutations(["changeGuest"])
    }
});
//car-id.js
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
//cupo-lleno.js
Vue.component('cupo-lleno',{
    template : //html
    `
    <div class="cupo-lleno-cad">
        {{msg}}
    </div>
    `,
    data() {
        return {
            msg : 'Lo sentimos el cupo de personas esta lleno'
        }
    }
});
//user-registred.js
Vue.component('user-registred',{
    template : //html
    `
    <div>
        <div class="user-registred-cad" v-if="!showQuestion" @click="showQuestion=!showQuestion">
            {{msg}} <a class="btn-alink" @click="">{{msgAlink}}</a>
        </div>
        <div class="user-registred-cad" v-if="showQuestion">
            {{question}}
            <p>
            <a class="btn-alink green" @click="liberarLugar">Si, liberar</a>
            </p>
            <p> 
                <a class="btn-alink orange" @click="showQuestion=!showQuestion">No</a>
            </p>
        </div>
    </div>
    `,
    data() {
        return {
            msg : 'Ya estás registrado.',
            msgAlink : "Quiero liberar mi lugar",
            showQuestion : false,
            question : '¿Quieres liberar tu lugar?'
        }
    },
    methods : {
        liberarLugar() {
            console.log("Se libera lugar")
        }
    }
});
//app.js
var app;

var store;

function FieldException(mensaje) {
    this.mensaje = mensaje;
    this.description = "Este parametro es obligatorio";
}

class EventForm {
    constructor(form){
        this.paysheet = EventForm.validate(form,"paysheet");
        this.eventId = EventForm.validate(form,"eventId");
        this.eventName = "";
        this.eventWithCar = false;
        this.eventWithGuest = false;
        this.numGuest = 0;
        this.endpoint = EventForm.validate(form,"endpoint");
        this.app;
        this.store;
    }

    verifyPlace() {
        // HTTP_REQUEST.get(`${this.endpoint}/events/verifyPlace/${this.paysheet}`,resp=>{
        // })
        this.eventWithCar = true;
        this.eventWithGuest = true;
        this.eventName = "Desayuno BTK";
        this.numGuest = 2;
        
         return "formulario";
        // return "cupo-lleno";
        // return "user-registred";
    }

    buildForm() {
        var elementToCreate = document.createElement(this.verifyPlace());
        var container = document.getElementById("app");
        container.appendChild(elementToCreate);
    }

    static validate(form, fieldName) {
        if (form[fieldName] == null) throw new FieldException(`${fieldName} can't be null`)
        return form[fieldName];
    }

    start(){
        this.buildForm();
        this.store = new Vuex.Store({
            state : {

                paysheet,
                eventId,

                eventName : this.eventName,
                eventWithCar : this.eventWithCar,
                eventWithGuest : this.eventWithGuest,
                numGuest : this.numGuest,

                guests : [],
                
                guestOptChecked : false,
                carOptChecked : false,
                carId : "",

                canSaveGuests : true,
                canSaveCar : true

            },
            mutations : {
                saveData(state) {
                    if (!state.guestOptChecked && !state.carOptChecked) {//Se guarda sin Acompa y sin placa
                        console.log("Se guarda sin Acompa y sin placa")
                        console.log("Acompañantes", state.guests)
                        console.log("placa", state.carId)
                    } else if(state.guestOptChecked && state.carOptChecked) {//Se guarda CON Acompa y CON placa
                        console.log("Se guarda CON Acompa y CON placa")
                        console.log("Acompañantes", state.guests)
                        console.log("placa", state.carId)
                    } else if (state.guestOptChecked && !state.carOptChecked) {//Se guarda CON Acompa y SIN placa
                        console.log("Se guarda CON Acompa y SIN placa")
                        console.log("Acompañantes", state.guests)
                        console.log("placa", state.carId)
                    } else if (!state.guestOptChecked && state.carOptChecked) {//Se guarda SIN Acompa y CON placa
                        console.log("Se guarda SIN Acompa y CON placa")
                        console.log("Acompañantes", state.guests)
                        console.log("placa", state.carId)
                    }
                },
                changeGuest(state, guestOptChecked){
                    if (guestOptChecked) {
                        state.canSaveGuests = state.guests.length > 0;
                    } else {
                        state.canSaveGuests = true;
                    }
                    state.guestOptChecked = guestOptChecked;
                    console.log(state.guestOptChecked);
                },
                changeCarId(state, carOptChecked){
                    if (carOptChecked) {
                        state.canSaveCar = state.carId.length > 0;
                    } else {
                        state.canSaveCar = true;
                    }
                    state.carOptChecked = carOptChecked;
                    console.log(state.carOptChecked);
                },
                setCarId(state, carId) {
                    state.carId = carId;
                    state.canSaveCar = state.carId.length > 0;
                    console.log(state.carOptChecked);
                }
            }
         });
         this.app = new Vue({
             el : "#app",
             data : {
                 title : "mi formulario"
             },
             methods : {},
             store : this.store
         });
    }
}