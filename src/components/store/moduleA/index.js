const moduleA = {
    namespaced: true,
    state:{
        count:3,
    },
    getters:{
        doubleCount(state){
            return state.count * 2
        }
    },
    mutations:{
        incremente(state){
            return state.count++
        }
    },
    actions:{
        incrementIfOdd({state,commit}){
            if(state.count % 2 === 1){
                commit('increment')
            }
        }
    },
};

export default  moduleA

