1. 安装
    1. 初始化安装
        vue create 时选中router属性
    2. 独立安装
        1. 安装：npm i vue-router 
        2. 挂载：import Vue from 'vue'
                import VueRouter from 'vue-router'
                Vue.use(VueRouter)

2. 使用路由
    1. 挂载路由插件
    2. 创建路由
        let myrouter = new VueRouter({
            routes:[{
                path:'/',
                component:Home
            },{
                path:'/about',
                component:About
            }]
        })
    3. 让路由生效
        new Vue({
            router:myrouter,
            render:(h)=>h(App)
        }).$mount('app')
    4. 在app组件中放置一个路由标签
        <router-view />

3. 对比vue-router 和 react-router
    1. vue-router 通过配置添加路由的;react-router通过标签加载路由
    2. vue-router 展示路由的内容时需要使用 <router-view> 标签;react-router不需要
    3. vue-router 的配置更集中一些，全部在new VueRouter()时配置;react-router更多是在标签上配置
    4. vue-router 有更高阶的用法，路由守卫; react-router是没有。

4. 动态路由
    1. 定义路由时需要明确定义路由参数的个数和名称
        routes:[{
            path:'/details/:newsid/:city'
        }]
    2. 访问时，就需要写具体的数据
        details/123/beijing
        标签导航：<router-link to='details/123/beijing'></router-link>
    3. 获取动态路由的参数值
        this.$route.params
        this.$route有哪些属性：
            name：路由名称
            meta：路由元信息
            path: 和定义路由时的path对应
            hash：路由的哈希值
            query：路由上问号携带的数据
            params: 动态路由的数据
            fullPath：地址栏中完整的路由路径
            matched：是一个数组!!!! 包含当前路由以及嵌套的父级及祖先级路由信息
    4. 动态参数改变时，触发组件更新
        需要使用watch监听

5. 嵌套路由
    1. 定义嵌套路由
        {
            path:'/users',
            component:Users,
            children:[   //子级路由
                {
                    path:'profiles',
                    component:Profiles,
                    name:'profiles'
                }
            ],
        }
    2. 在父级路由中必须有一个<router-view />标签，用来展示子级路内容
    3. 导航：有两种写法，和定义时有关
        1. 定义子级路由时，子级路由的path属性值上最前面不加'/',访问子级路由这样写： /users/profiles
        2. 定义子级路由时，子级路由的path属性值上最前面加'/',访问子级路由这样写：/profiles
        <router-link to='/users/profiles'></router-link>

6. 编程式导航
    this.$router.push('/users')
    this.$router.replace('/users')
    this.$router.back()    返回上一层路由


7. 命名路由
    在定义路由时添加name属性
    {
        path:'/',
        name:'home',
        component:Home
    }
    路由跳转时可以通过路由的名称跳转
        <router-link to=''>
        编程式导航: $router.push({name:"details",params:{newsid:12445}})

8. 命名视图
    1. 在一个路由下，同时展示多个组件的内容
    2. 定义路由语法：
        {
            path:'/',
            components:{
                default:()=>import('../views/head.vue'),
                body:()=>import('../views/body.vue')
            }
        }
    3. 在页面中就需要定义多个router-view,而且要定义name
        <router-view ></router-view>
        <router-view name='body'></router-view>

9. 重定向和别名
    1. 重定向:
        { path: '/a', redirect: '/b' }
    2. 别名
        {
            path:'/hello',
            alias:'/haha',
            component:Hello
        }

10. 路由组件传参
    1. 使用 props 将组件和路由解耦
    2. 语法：
        {
            path:'/details/:id',
            component:Details,
            props:true
        }
        对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
        {
            path: '/user/:id',
            components: { default: User, sidebar: Sidebar },
            props: { default: true, sidebar: false }
        }
    3. 调用动态路由参数
        props:['id']
        直接访问id即可


11. 切换路由模式
    mode: 'history',  // history模式
    mode: 'hash' , // hash模式

12. 导航高亮效果
    1. Router-link默认携带class：router-link-active和router-link-exact-active
    2. 不想使用默认类名，可以进行修改
        1. 单独修改某一个路由的高亮类名
            <router-link activeClass='active' exactActiveClass></router-link>
        2. 全局修改
            全局配置来修改：linkActiveClass和linkExactActiveClass
        优先级：单个>全局的

13. router-link
    <router-link
     to=''      //实现页面跳转的
     activeClass='active'
     exactActiveClass='eactive',
     tag='span', //规定router-link被解析成什么标签，默认是a标签
     replace=true,  //启动替换功能
     exact          //精准匹配
     >
    

14. 导航守卫
    1. 全局前置守卫
        router.beforeEach((to,from,next)=>{
            //to到哪个路由去
            //from从哪个路由来的
            next()
            <!-- 跳转到指定的路由 -->
            next('/login');
            next({name:'login'})
        })
        只有有路由跳转，就会触发它
    2. 全局解析守卫
        router.beforeResolve((to,from,next)=>{
            //to到哪个路由去
            //from从哪个路由来的
            next()
        })
    3. 全局后置钩子
        当页面跳转完成后触发这个守卫
        router.afterEach((to,from)=>{

        })
    4. 路由独享的守卫
        你可以在路由配置上直接定义 beforeEnter 守卫,只有进入这个路由时才触发的守卫函数
        {
            path:'/',
            component:Home,
            beforeEnter((to,from,next)=>{

                next()
            })
        }
    5. beforeRouteEnter
        在渲染该组件的对应路由被 confirm 前调用,这时组件还没有渲染，而且访问不到组件的实例this
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // 通过 `vm` 访问组件实例
            })
        }
    6. beforeRouteUpdate
        在当前路由改变，但是该组件被复用时调用

    7. beforeRouteLeave
        导航离开该组件的对应路由时调用

15. 路由元信息
    1. 定义路由的时候可以配置 meta 字段,在路由访问过程中可以携带这个meta字段，供守卫函数使用
    2. 定义元信息
        {
            path:'/',
            component:Home,
            meta:{
                a:1,
                b:2
            }
        }
    3. 使用元信息
        从$route上获取，这个$route有一个mate属性，代表的是当前组件的元信息
        matched数组：代表当前组件以及祖先级组件的元信息