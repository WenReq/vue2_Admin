// 我们组装模块并导出 store 的地方
import Vue from 'vue'
import Vuex from 'vuex'
import { users } from './modules/users'
import { tabs } from './modules/tabs'
import { menus } from './modules/menus'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  // 开启严格模式，仅需在创建 store 的时候传入 strict: true：
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  // 不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    users,
    tabs,
    menus,
  },
  
  /* vuex 数据持久化配置 */
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    })
  ],
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
 *    Action 提交的是 mutation， 而不是直接变更状态。
 *    Action 可以包含任意异步操作。
 *      actions: { increment (context) { context.commit('increment') } }
 *    Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象， 因此你可以调用 context.commit 提交一个 mutation， 或者通过 context.state 和 context.getters 来获取 state 和 getters。
 *    实践中， 我们会经常用到 ES2015 的 参数解构(opens new window) 来简化代码（ 特别是我们需要调用 commit 很多次的时候）：actions: { increment ({ commit }) { commit('increment') } }
 *
 *    分发 Action
 *      store.dispatch('increment')
 *      mutation 必须同步执行。 Action 就不受约束！ 我们可以在 action 内部执行异步操作：
 *      actions: { incrementAsync ({ commit }) { setTimeout(() => { commit('increment') }, 1000) } }
 *
 *    在组件中分发 Action
 *      this.$store.dispatch('xxx')
 *
 *    组合 Action
 *      store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise， 并且 store.dispatch 仍旧返回 Promise：
 * - Module
 *    Vuex 允许我们将 store 分割成模块（ module）。 每个模块拥有自己的 state、 mutation、 action、 getter、 甚至是嵌套子模块—— 从上至下进行同样方式的分割：
 *
 *    模块的局部状态
 *      对于模块内部的 mutation 和 getter， 接收的第一个参数是模块的局部状态对象。
 *      同样， 对于模块内部的 action， 局部状态通过 context.state 暴露出来， 根节点状态则为 context.rootState：
 *      对于模块内部的 getter， 根节点状态会作为第三个参数暴露出来：
 *
 *    命名空间
 *      通过添加 namespaced: true 的方式使其成为带命名空间的模块。 当模块被注册后， 它的所有 getter、 action 及 mutation 都会自动根据模块注册的路径调整命名。
 *        getters: { isAdmin () { ... } // -> getters['account/isAdmin'] }
 *      嵌套模块 - 继承父模块的命名空间
 * - 表单处理
 *    使用带有 setter 的双向绑定计算属性
 *      computed: { message: { get () { return this.$store.state.obj.message },set (value) { this.$store.commit('updateMessage', value) } } }
 */
