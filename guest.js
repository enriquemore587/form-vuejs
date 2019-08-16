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