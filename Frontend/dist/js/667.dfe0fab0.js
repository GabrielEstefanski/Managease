"use strict";(self["webpackChunkweb_project"]=self["webpackChunkweb_project"]||[]).push([[667],{9667:function(e,s,r){r.r(s),r.d(s,{default:function(){return C}});var a=r(6768),t=r(4232);const o=e=>((0,a.Qi)("data-v-e7280370"),e=e(),(0,a.jt)(),e),u={class:"container"},l={class:"column gap-2 mb-3"},n=o((()=>(0,a.Lk)("label",{for:"username"},"Name",-1))),c={class:"column gap-2 mb-3"},d=o((()=>(0,a.Lk)("label",{for:"username"},"Username",-1))),i={class:"column gap-2 mb-3"},m=o((()=>(0,a.Lk)("label",{for:""},"Password",-1))),p={class:"column gap-2 mb-3"},f=o((()=>(0,a.Lk)("label",{for:""},"Confirm your password",-1))),h={key:0,class:"text-red-500",style:{"font-size":"14px"}},w={class:"flex gap-3 mt-1"};function k(e,s,r,o,k,b){const g=(0,a.g2)("InputText"),y=(0,a.g2)("Password"),v=(0,a.g2)("Button"),U=(0,a.g2)("Card"),V=(0,a.g2)("Toast");return(0,a.uX)(),(0,a.CE)("div",u,[(0,a.bF)(U,{style:{width:"25rem",overflow:"hidden"}},{title:(0,a.k6)((()=>[(0,a.eW)("Sign up")])),content:(0,a.k6)((()=>[(0,a.Lk)("div",l,[n,(0,a.bF)(g,{modelValue:e.user.name,"onUpdate:modelValue":s[0]||(s[0]=s=>e.user.name=s)},null,8,["modelValue"])]),(0,a.Lk)("div",c,[d,(0,a.bF)(g,{modelValue:e.user.username,"onUpdate:modelValue":s[1]||(s[1]=s=>e.user.username=s)},null,8,["modelValue"])]),(0,a.Lk)("div",i,[m,(0,a.bF)(y,{modelValue:e.user.password,"onUpdate:modelValue":s[2]||(s[2]=s=>e.user.password=s),feedback:!1,inputStyle:{width:"100%"},toggleMask:""},null,8,["modelValue"])]),(0,a.Lk)("div",p,[f,(0,a.bF)(y,{modelValue:e.confirmPassword,"onUpdate:modelValue":s[3]||(s[3]=s=>e.confirmPassword=s),feedback:!1,inputStyle:{width:"100%"},toggleMask:""},null,8,["modelValue"])]),e.error?((0,a.uX)(),(0,a.CE)("span",h,(0,t.v_)(e.error),1)):(0,a.Q3)("",!0)])),footer:(0,a.k6)((()=>[(0,a.Lk)("div",w,[(0,a.bF)(v,{label:"Login",class:"w-full",onClick:e.createUser},null,8,["onClick"])])])),_:1}),(0,a.bF)(V)])}r(4114);var b=r(1357),g=r(2151),y=r(782),v=r(1459),U=(0,a.pM)({name:"ConfirmUserPage",setup(){const e=(0,g.d)();function s(){e.add({severity:"success",summary:"Success",detail:"User registered successfully"})}return{showSucessToast:s}},data(){return{user:{},users:[],confirmPassword:"",error:""}},created(){const e=(0,y.Pj)(),s=e.state.userId,r=e.state.userName;s&&r&&v.A.push("/home")},async mounted(){await this.fetchUsers()},methods:{async fetchUsers(){try{const e=await b.A.get("/user");this.users=e.data}catch(e){console.error("Error fetching users",e)}},async postUser(){try{await b.A.post("/user",this.user),this.showSucessToast()}catch(e){console.error("Error creating user",e)}},async createUser(){this.user.password===this.confirmPassword?(await this.postUser(),v.A.push({path:"/",query:{successToast:"true"}})):this.error="Passwords do not match"}}}),V=r(1241);const L=(0,V.A)(U,[["render",k],["__scopeId","data-v-e7280370"]]);var C=L}}]);
//# sourceMappingURL=667.dfe0fab0.js.map