import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})

/**
 * 1. 介绍
 *  Vuex 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
 *  我们通过提交 mutation 的方式，而非直接改变 store.state.count，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。
 *  由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutation。
 *
 * 2. 核心概念
 *  - State
 *      由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性 (opens new window)中返回某个状态：
 *      computed: { count() { return store.state.count } }
 *      每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
 *
 *      Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：
 *        new Vue({ el: '#app', store, })
 *      通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。
 *        computed: { count() { return this.$store.state.count } }
 *
 *      mapState 辅助函数：
 *        当一个组件需要获取多个状态的时候，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
 *          import { mapState } from 'vuex'
 *          computed: mapState([ 'count' // 映射 this.count 为 store.state.count ])
 *  - Getter
 *      就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
 *      Getter 接受 state 作为其第一个参数：
 *        getters: { doneTodos: state => { return state.todos.filter(todo => todo.done) } }
 *
 *      通过属性访问：
 *        Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
 *        Getter 也可以接受其他 getter 作为第二个参数：
 *        我们可以很容易地在任何组件中使用它：computed: { doneTodosCount () { return this.$store.getters.doneTodosCount }}
 *        注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。
 *
 *      通过方法访问：
 *        getters: { getTodoById: (state) => (id) => { return state.todos.find(todo => todo.id === id) }}
 *        store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
 *        注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
 *
 *      mapGetters 辅助函数：
 *        mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：computed: {  ...mapGetters([ 'doneTodosCount', 'anotherGetter', ]) }
 *
 *        如果你想将一个 getter 属性另取一个名字，使用对象形式：
 *          ...mapGetters({ doneCount: 'doneTodosCount' })
 *        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
 *  - Mutation
 *      mutations: { increment (state) { state.count++ } }
 *
 *      提交载荷（Payload）:
 *        在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
 *        mutations: { increment (state, payload) { state.count += payload.amount }}
 *        store.commit('increment', { amount: 10 })
 *
 *      对象风格的提交方式:
 *        store.commit({ type: 'increment',amount: 10 })
 *        mutations: { increment (state, payload) { state.count += payload.amount }}
 *
 *      使用常量替代 Mutation 事件类型:
 *        使用常量替代 mutation 事件类型。同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：
 *          // mutation-types.js
 *          export const SOME_MUTATION = 'SOME_MUTATION'
 *
 *      Mutation 必须是同步函数
 *
 *      在组件中提交 Mutation:
 *        this.$store.commit('xxx')
 *        mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
 *  - Action
 */
