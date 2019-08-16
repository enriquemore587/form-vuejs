Vue.component('loading',{
    template : //html
    `
    <div>
        <div class="save-success-cad" v-if="savedSuccess">
            {{message}}
        </div>
        <div class="loading-cad" v-if="!savedSuccess">
            {{loadingMsg}}
        </div>
    </div>
    `,
    props : ["message"],
    data() {
        return {}
    },
    computed: {
        ... Vuex.mapState(["savedSuccess"]),
        ... Vuex.mapState(["loadingMsg"])
    },
});