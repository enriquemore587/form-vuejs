Vue.component('cupo-lleno',{
    template : //html
    `
    <div class="cupo-lleno-cad">
        {{msgCupoLleno}}
    </div>
    `,
    data() {
        return {}
    },
    computed: {
        ... Vuex.mapState(["msgCupoLleno"]),
    },
});