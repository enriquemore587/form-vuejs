Vue.component('user-registred',{
    template : //html
    `
    <div>
        <div v-if="loading">
            <div class="user-registred-cad" v-if="!showQuestion">
                {{msg}} <a class="btn-alink" @click="showQuestion=!showQuestion">{{msgAlink}}</a>
            </div>
            <div class="user-registred-cad" v-if="showQuestion">
                {{question}}
                <p>
                <a class="btn-alink green" @click="freeSpace">Si, liberar</a>
                </p>
                <p>
                    <a class="btn-alink orange" @click="showQuestion=!showQuestion">No</a>
                </p>
            </div>
        </div>
        <loading v-if="!loading" message="Gracias por liberar tu lugar."></loading>
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
    computed: {
        ... Vuex.mapState(["userReg"]),
        ... Vuex.mapState(["endpoint"]),
        ... Vuex.mapState(["loading"])
    },
    methods : {
        ... Vuex.mapMutations(['freeSpace'])
    }
});