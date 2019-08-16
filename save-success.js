Vue.component('save-success',{
    template : //html
    `
    <div class="save-success-cad">
        {{noEvent}}
    </div>
    `,
    data() {
        return {}
    },
    computed: {
        ... Vuex.mapState(["noEvent"]),
    },
});