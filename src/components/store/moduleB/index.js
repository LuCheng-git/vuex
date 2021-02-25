const  moduleB = {
    namespaced:true,
    modules: {
        subModule: {
            namespaced: true,
            state: {
                
            },
            mutations: {
                zz () {
                    return 
                }
            },
            getters: {
                zz () {
                    return  3
                }
            },
            actions: {
                zz () {
                    return
                }
            }
        },     
    },
    state:{
        count:8,
    },
    getters:{
        someGetter (state, getters, rootState, rootGetters) {
            rootState.count;
            state.count;
            //伪代码
            getters.someOtherGetter;
            rootGetters.someOtherGetter;
        }
    },
    mutations:{
        incremente(state){
            return state.count++
        }
    },
    actions:{
        omeAction({ dispatch, commit, getters, rootGetters }) {
            getters.someGetter;
            rootGetters.someGetter;
            
            dispatch('someOtherAction');
            dispatch('someOtherAction', null, { root: true });
            
            commit('someMutation');
            commit('someMutation', null, { root: true });
        }
    },
   
};

export default  moduleB