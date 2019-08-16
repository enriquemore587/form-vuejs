Vue.component('no-event',{
    template : //html
    `
    <div class="no-event-cad">
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