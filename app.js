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
        this.endpoint = EventForm.validate(form,"endpoint");

        this.eventName = "";
        this.eventWithCar = false;
        this.eventWithGuest = false;
        this.savedSuccess = false;
        this.numGuest = 0;
        this.noEvent = "";
        this.loadingMsg = "";
        this.loadingMsg = "";
        this.app;
        this.store;
        this.userReg = { msg : '', msgAlink : "", showQuestion : false, question : '' };
        this.msgCupoLleno = '';
    }

    static validate(form, fieldName) {
        if (form[fieldName] == null) throw new FieldException(`${fieldName} can't be null`)
        return form[fieldName];
    }

    start() {
        HTTP_REQUEST.post(
            `${this.endpoint}s/v1/event`,
            { roster : this.paysheet, eventId : this.eventId },
            { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            (resp, error) => {

                let elementToRender = resp.pageForRender;
                if (resp.pageForRender == 'formulario') {
                    this.eventWithCar = resp.form.eventWithCar;
                    this.eventWithGuest = resp.form.eventWithGuest;
                    this.eventName = resp.form.eventName;
                    this.numGuest = resp.form.numGuest;
                }
                else if (resp.pageForRender == 'user-registred') {
                    this.userReg.msg = resp.userRegister.msg;
                    this.userReg.msgAlink = resp.userRegister.msgAlink;
                    this.userReg.question = resp.userRegister.question;
                }
                else if (resp.pageForRender == 'cupo-lleno') {
                    this.msgCupoLleno = resp.fullSpaces.msg;
                }
                else if (resp.pageForRender == 'no-event') {
                    this.noEvent = resp.noEvent.msg;
                }
                else if (resp.pageForRender == 'no-retired') {
                    this.noRetired = resp.noRetired.msg;
                }

                var elementToCreate = document.createElement(elementToRender);
                var container = document.getElementById("app");
                container.appendChild(elementToCreate);
                this.store = new Vuex.Store({
                    state : {

                        endpoint : this.endpoint,
                        paysheet,
                        eventId,
        
                        eventName : this.eventName,
                        eventWithCar : this.eventWithCar,
                        eventWithGuest : this.eventWithGuest,
                        numGuest : this.numGuest,
                        savedSuccess : this.savedSuccess,
                        loading : true,
                        loadingMsg : this.loadingMsg,
        
                        guests : [],
                        
                        guestOptChecked : false,
                        carOptChecked : false,
                        carId : "",
        
                        canSaveGuests : true,
                        canSaveCar : true,
                        
                        ...this.userReg,
                        msgCupoLleno : this.msgCupoLleno,

                        noEvent : this.noEvent,
                        noRetired : this.noRetired
        
                    },
                    mutations : {
                        saveData(state) {
                            state.loading = false;
                            if (!state.guestOptChecked && !state.carOptChecked)
                                console.log("Se guarda sin Acompa y sin placa")
                            else if(state.guestOptChecked && state.carOptChecked)
                                console.log("Se guarda CON Acompa y CON placa")
                            else if (state.guestOptChecked && !state.carOptChecked)
                                console.log("Se guarda CON Acompa y SIN placa")
                            else if (!state.guestOptChecked && state.carOptChecked)
                                console.log("Se guarda SIN Acompa y CON placa")
                            let body = {
                                roster : state.paysheet,
                                eventId : state.eventId,
                                guestOptChecked : state.guestOptChecked,
                                carOptChecked : state.carOptChecked,
                                carId : state.carId,
                                guests : state.guests
                            };
                            let url = `${state.endpoint}s/v1/event/registry`;
                            let headers = {
                                'Accept': 'application/json', 
                                'Content-Type': 'application/json' 
                            };
                            HTTP_REQUEST.post( url, body, headers, (resp, err) => {
                                if (resp) {
                                    if (resp.code == "200") state.savedSuccess = true;
                                    else state.loading = true;
                                } else console.error(err);
                            });
                        },
                        freeSpace(state) {
                            state.loading = false;
                            let body = {
                                roster : state.paysheet,
                                eventId : state.eventId
                            };
                            let url = `${state.endpoint}s/v1/event/free-place`;
                            let headers = {
                                'Accept': 'application/json', 
                                'Content-Type': 'application/json' 
                            };
                            HTTP_REQUEST.post( url, body, headers, (resp, err) => {
                                if (resp) {
                                    if (resp.code == "200") state.savedSuccess = true;
                                    else state.loading = true;
                                } else console.error(err);
                            });
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
                     data : {},
                     methods : {},
                     store : this.store
                 });
            });
    }
}

let paysheet = 575;
let eventId = 1;
let endpoint = "http://localhost:8082/";

var eventForm = new EventForm({
    paysheet,
    eventId,
    endpoint
});
eventForm.loadingMsg = "Guardando. . . .";
eventForm.start();