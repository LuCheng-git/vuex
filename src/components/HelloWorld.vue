<template>
  <div>
    <div>
      {{msg}}
      <br>
      <input type="text" :value="msg" @input="updateMessage">
    </div>
    <div>{{ count }}</div>
    <div>{{ doneTodos }}</div>
    <div>{{ doneTodosCount }}</div>
    <div>{{ getTodoById(2) }}</div>
    <button @click="c()">+</button>
    <br />
    <br />
    <br />
    <button @click="a()">+</button>
    <button @click="p()">-</button>
  </div>
</template>

<script>
import { Chrome } from "vue-color";
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions} from "vuex";
export default {
  name: "HelloWorld",
  components: {},
  data() {
    return {
      msg2: "hello world",
      localCount: 4,
    };
  },
  computed: {
    ...mapState(
      ["count",'msg']
      //   {
      //    count:state => state.count,
      //    countAlias:'count',
      //    countPlusCount(state){
      //      return state.count + this.localCount
      //    }
      //  }
    ),
    ...mapGetters(["doneTodos", "doneTodosCount", "getTodoById"]),
  },
  mounted() {
    console.log(this.$store.state.moduleA.count);
    this.$store.commit('moduleA/incremente')
    console.log(this.$store.state.moduleA.count);
    console.log(this.$store.state.moduleB.count);
    this.$store.commit('moduleB/incremente')
    this.$store.dispatch('moduleB/subModule/zz')
    console.log(this.$store.getters['moduleB/subModule/zz'])
  },
  methods: {
    // c(){
    //   // 1
    //   // this.$store.commit('increment',{amount:8})
    //   // 2
    //   // this.$store.commit({
    //   //   type:'increment',
    //   //   amount:8
    //   // })

    // }

    // 3
    c() {
      this.increment({ amount: 8 });
    },
    a() {
      // 1
      // this.$store.dispatch("incrementAsync");
      this.incrementAsync()
    },
    p() {
      this.push({ a: 1 });
    },
    testAction() {
      this.$store.dispatch("actionA").then(() => {});
    },
    // change msg 
    updateMessage(e){
      this.updateMsg(e.target.value)
    },
     ...mapActions('some/nested/module', [
        'foo' // 命名空间使用actions
    ]),
    ...mapMutations(["increment", "add", "push","updateMsg"]),
    ...mapActions(['incrementAsync'])
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
