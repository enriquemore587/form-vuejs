Vue.component('no-retired',{
    template : //html
    `
    <div class="no-retired-cad">
        {{noRetired}}
    </div>
    `,
    data() {
        return {}
    },
    computed: {
        ... Vuex.mapState(["noRetired"]),
    },
});