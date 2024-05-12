"use strict";(self["webpackChunkweb_project"]=self["webpackChunkweb_project"]||[]).push([[161],{1763:function(e,a,t){t.r(a),t.d(a,{default:function(){return ie}});var n=t(6768),s=t(4232);const i=e=>((0,n.Qi)("data-v-028e3a3a"),e=e(),(0,n.jt)(),e),r={class:"container"},l={class:"table"},o={class:"title"},c=i((()=>(0,n.Lk)("div",{class:"spinner-container"},[(0,n.Lk)("i",{class:"pi pi-spin pi-spinner large-spinner"})],-1))),d={class:"title"},h=i((()=>(0,n.Lk)("i",{class:"pi pi-search"},null,-1))),u={class:"dataTable",ref:"tableRef"},p={class:"p-d-flex p-jc-end p-ai-center"};function m(e,a,t,i,m,b){const y=(0,n.g2)("Button"),_=(0,n.g2)("InputText"),g=(0,n.g2)("InputGroupAddon"),f=(0,n.g2)("InputGroup"),v=(0,n.g2)("Toolbar"),C=(0,n.g2)("Column"),k=(0,n.g2)("CountryFlag"),L=(0,n.g2)("DataTable"),F=(0,n.g2)("DeleteModal"),w=(0,n.g2)("BranchModal");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.Lk)("div",r,[(0,n.Lk)("div",l,[e.isLoaded?((0,n.uX)(),(0,n.CE)(n.FK,{key:1},[(0,n.Lk)("h1",d,(0,s.v_)(e.company.name),1),(0,n.bF)(v,null,{start:(0,n.k6)((()=>[(0,n.bF)(y,{icon:"pi pi-file-excel",class:"mr-2",severity:"secondary",onClick:e.exportToExcel},null,8,["onClick"]),(0,n.bF)(y,{icon:"pi pi-print",severity:"secondary",onClick:e.exportToPDF},null,8,["onClick"])])),center:(0,n.k6)((()=>[(0,n.bF)(f,null,{default:(0,n.k6)((()=>[(0,n.bF)(_,{icon:"pi pi-search",modelValue:e.searchText,"onUpdate:modelValue":a[0]||(a[0]=a=>e.searchText=a),placeholder:e.$t("branches_page.search_bar"),style:{width:"30vw"},onInput:e.filterBranches,rounded:""},null,8,["modelValue","placeholder","onInput"]),(0,n.bF)(g,null,{default:(0,n.k6)((()=>[h])),_:1})])),_:1})])),end:(0,n.k6)((()=>[(0,n.bF)(y,{label:e.$t("branches_page.button_add_branche"),onClick:a[1]||(a[1]=a=>e.openItem())},null,8,["label"])])),_:1}),(0,n.Lk)("div",u,[(0,n.bF)(L,{value:e.filteredBranches,paginator:!0,rows:10,tableStyle:"width: 100%",loading:!e.isLoaded},{empty:(0,n.k6)((()=>[(0,n.eW)((0,s.v_)(e.$t("branches_page.empty_table")),1)])),loading:(0,n.k6)((()=>[(0,n.eW)((0,s.v_)(e.company.name)+" está carregando, por favor espere",1)])),default:(0,n.k6)((()=>[(0,n.bF)(C,{field:"name",header:e.$t("branches_page.table_column_name"),sortable:"",style:{width:"15%"}},null,8,["header"]),(0,n.bF)(C,{field:"cnpj",header:e.$t("branches_page.table_column_cnpj"),sortable:"",style:{width:"15%"}},null,8,["header"]),(0,n.bF)(C,{field:"legal_nature",header:e.$t("branches_page.table_column_legal_nature"),sortable:"",style:{width:"15%"}},null,8,["header"]),(0,n.bF)(C,{field:"country",header:e.$t("branches_page.table_column_country"),sortable:"",style:{width:"15%"}},{body:(0,n.k6)((({data:a})=>[(0,n.bF)(k,{class:"mr-1",country:e.getCountryCode(a.country)},null,8,["country"]),(0,n.Lk)("span",null,(0,s.v_)(e.getCountryName(a.country)),1)])),_:1},8,["header"]),(0,n.bF)(C,{field:"share_capital",header:e.$t("branches_page.table_column_share_capital"),sortable:"",style:{width:"10%"}},{body:(0,n.k6)((({data:a})=>[(0,n.Lk)("div",null,(0,s.v_)(e.formatCurrency(a.share_capital)),1)])),_:1},8,["header"]),(0,n.bF)(C,{field:"active",header:e.$t("branches_page.table_column_status"),sortable:"",style:{width:"10%"}},{body:(0,n.k6)((({data:e})=>[(0,n.Lk)("i",{class:(0,s.C4)(["pi",{"pi-check-circle text-green-500":1===e.active,"pi-times-circle text-red-400":0===e.active}])},null,2)])),_:1},8,["header"]),(0,n.bF)(C,{field:"actions",header:e.$t("branches_page.table_column_action"),style:{width:"10%"}},{body:(0,n.k6)((({data:a})=>[(0,n.Lk)("div",p,[(0,n.bF)(y,{icon:"pi pi-pencil",class:"mb-2 mr-2",severity:"success",rounded:"",onClick:t=>e.openItem(a)},null,8,["onClick"]),(0,n.bF)(y,{icon:"pi pi-times",class:"mb-2 mr-2",severity:"danger",rounded:"",onClick:t=>e.deleteItem(a)},null,8,["onClick"]),(0,n.bF)(y,{icon:"pi pi-dollar",class:"mb-2",severity:"help",rounded:"",onClick:t=>e.goToFinancial(a)},null,8,["onClick"])])])),_:1},8,["header"])])),_:1},8,["value","loading"])],512)],64)):((0,n.uX)(),(0,n.CE)(n.FK,{key:0},[(0,n.Lk)("h1",o,(0,s.v_)(e.$t("branches_page.title")),1),c],64))])]),e.isDeleteModalVisible?((0,n.uX)(),(0,n.Wv)(F,{key:0,visible:e.isDeleteModalVisible,"onUpdate:visible":a[2]||(a[2]=a=>e.isDeleteModalVisible=a),id:e.idBranch,items:"branch",onItemDeleted:e.handlerFilteringBranch},null,8,["visible","id","onItemDeleted"])):(0,n.Q3)("",!0),e.isModalVisible?((0,n.uX)(),(0,n.Wv)(w,{key:1,visible:e.isModalVisible,"onUpdate:visible":a[3]||(a[3]=a=>e.isModalVisible=a),id:e.idBranch,idCompany:e.idCompany,onBrancheUpdated:e.handlerFilteringBranch},null,8,["visible","id","idCompany","onBrancheUpdated"])):(0,n.Q3)("",!0)],64)}t(4114);var b=t(1357);const y=e=>((0,n.Qi)("data-v-368656e7"),e=e(),(0,n.jt)(),e),_={class:"flex-container"},g={class:"flex-item"},f={class:"column gap-2 mb-3"},v={for:"company"},C={class:"column gap-2 mb-3"},k={for:"name"},L={class:"column gap-2 mb-3"},F={for:"country"},w={class:"country-option"},$={class:"column gap-2 mb-3"},V={for:"legalNature"},I={class:"column gap-2 mb-3"},S={for:"cnpj"},B={class:"flex-item"},N={class:"column gap-2 mb-3"},D={for:"share_capital"},A=y((()=>(0,n.Lk)("i",{class:"pi pi-dollar"},null,-1))),j={class:"column gap-2 mb-3"},E={for:"establishment"},M={class:"column gap-2 mb-3"},U={for:"zip"},x={class:"column gap-2 mb-3"},T={for:"phone"},K={class:"column gap-2 mb-3"},W={for:"phone"},G={class:"flex flex-wrap"},P={for:"active",class:"mr-4"},z={for:"inactive",class:"ml-2"};function O(e,a,t,i,r,l){const o=(0,n.g2)("InputText"),c=(0,n.g2)("CountryFlag"),d=(0,n.g2)("Dropdown"),h=(0,n.g2)("InputMask"),u=(0,n.g2)("InputNumber"),p=(0,n.g2)("InputGroupAddon"),m=(0,n.g2)("InputGroup"),b=(0,n.g2)("Calendar"),y=(0,n.g2)("RadioButton"),O=(0,n.g2)("Button"),X=(0,n.g2)("Toast"),R=(0,n.g2)("Dialog");return(0,n.uX)(),(0,n.Wv)(R,{visible:e.innerVisible,"onUpdate:visible":a[11]||(a[11]=a=>e.innerVisible=a),modal:!0,header:e.labelTitle,style:{width:"100%",maxWidth:"50rem"}},{footer:(0,n.k6)((()=>[(0,n.bF)(O,{label:e.$t("branches_modal.button_cancel"),severity:"secondary",onClick:e.onCancel},null,8,["label","onClick"]),(0,n.bF)(O,{icon:"pi pi-check",severity:"success",label:e.$t("branches_modal.button_save"),onClick:e.onSave},null,8,["label","onClick"])])),default:(0,n.k6)((()=>[(0,n.Lk)("div",_,[(0,n.Lk)("div",g,[(0,n.Lk)("div",f,[(0,n.Lk)("label",v,(0,s.v_)(e.$t("branches_modal.label_company")),1),(0,n.bF)(o,{id:"company",modelValue:e.selectedCompany,"onUpdate:modelValue":a[0]||(a[0]=a=>e.selectedCompany=a),disabled:""},null,8,["modelValue"])]),(0,n.Lk)("div",C,[(0,n.Lk)("label",k,(0,s.v_)(e.$t("branches_modal.label_name")),1),(0,n.bF)(o,{id:"name",modelValue:e.branches.name,"onUpdate:modelValue":a[1]||(a[1]=a=>e.branches.name=a)},null,8,["modelValue"])]),(0,n.Lk)("div",L,[(0,n.Lk)("label",F,(0,s.v_)(e.$t("branches_modal.label_country")),1),(0,n.bF)(d,{modelValue:e.selectedCountry,"onUpdate:modelValue":a[2]||(a[2]=a=>e.selectedCountry=a),options:e.countries,optionLabel:"name",optionValue:"code",onChange:e.onCountryChange},{option:(0,n.k6)((({option:e})=>[(0,n.Lk)("div",w,[(0,n.bF)(c,{class:"mr-1",country:e.code,size:"small"},null,8,["country"]),(0,n.Lk)("span",null,(0,s.v_)(e.name),1)])])),_:1},8,["modelValue","options","onChange"])]),(0,n.Lk)("div",$,[(0,n.Lk)("label",V,(0,s.v_)(e.$t("branches_modal.label_legal_nature")),1),(0,n.bF)(d,{modelValue:e.selectedLegalNature,"onUpdate:modelValue":a[3]||(a[3]=a=>e.selectedLegalNature=a),options:e.getLegalNaturesForCountry(e.selectedCountry),optionLabel:"name",optionValue:"name",onChange:e.onLegalNatureChange},null,8,["modelValue","options","onChange"])]),(0,n.Lk)("div",I,[(0,n.Lk)("label",S,(0,s.v_)(e.$t("branches_modal.label_cnpj")),1),(0,n.bF)(h,{id:"cnpj",modelValue:e.branches.cnpj,"onUpdate:modelValue":a[4]||(a[4]=a=>e.branches.cnpj=a),mask:e.getMaskForCountryBranche()},null,8,["modelValue","mask"])])]),(0,n.Lk)("div",B,[(0,n.Lk)("div",N,[(0,n.Lk)("label",D,(0,s.v_)(e.$t("branches_modal.label_share_capital")),1),(0,n.bF)(m,null,{default:(0,n.k6)((()=>[(0,n.bF)(u,{id:"share_capital",modelValue:e.branches.share_capital,"onUpdate:modelValue":a[5]||(a[5]=a=>e.branches.share_capital=a),inputId:"currency-us",mode:"currency",currency:"USD",locale:"en-US"},null,8,["modelValue"]),(0,n.bF)(p,null,{default:(0,n.k6)((()=>[A])),_:1})])),_:1})]),(0,n.Lk)("div",j,[(0,n.Lk)("label",E,(0,s.v_)(e.$t("branches_modal.label_date_establishment")),1),(0,n.bF)(b,{id:"establishment",showIcon:"",iconDisplay:"input",modelValue:e.dateEstablishment,"onUpdate:modelValue":a[6]||(a[6]=a=>e.dateEstablishment=a),dateFormat:"mm/dd/yy"},null,8,["modelValue"])]),(0,n.Lk)("div",M,[(0,n.Lk)("label",U,(0,s.v_)(e.$t("branches_modal.label_zip_code")),1),(0,n.bF)(h,{id:"zip",modelValue:e.branches.zip,"onUpdate:modelValue":a[7]||(a[7]=a=>e.branches.zip=a),mask:e.getMaskForCountryZipCode()},null,8,["modelValue","mask"])]),(0,n.Lk)("div",x,[(0,n.Lk)("label",T,(0,s.v_)(e.$t("branches_modal.label_phone")),1),(0,n.bF)(h,{id:"phone",modelValue:e.branches.phone,"onUpdate:modelValue":a[8]||(a[8]=a=>e.branches.phone=a),mask:e.getMaskForCountryPhone()},null,8,["modelValue","mask"])]),(0,n.Lk)("div",K,[(0,n.Lk)("label",W,(0,s.v_)(e.$t("branches_modal.label_status")),1),(0,n.Lk)("div",G,[(0,n.bF)(y,{modelValue:e.branches.active,"onUpdate:modelValue":a[9]||(a[9]=a=>e.branches.active=a),id:"1",class:"mr-2",name:"Active",value:1},null,8,["modelValue"]),(0,n.Lk)("label",P,(0,s.v_)(e.$t("branches_modal.radio_button_active")),1),(0,n.bF)(y,{modelValue:e.branches.active,"onUpdate:modelValue":a[10]||(a[10]=a=>e.branches.active=a),id:"0",class:"mr-2",name:"Inactive",value:0},null,8,["modelValue"]),(0,n.Lk)("label",z,(0,s.v_)(e.$t("branches_modal.radio_button_inactive")),1)])])])]),(0,n.bF)(X)])),_:1},8,["visible","header"])}var X=t(1459),R=t(2151),Q=t(782),q=t(5384),H=(0,n.pM)({name:"BrancheModal",props:{id:String,idCompany:{required:!0,type:String},visible:Boolean},setup(){const e=(0,R.d)(),{t:a}=(0,q.s9)();function t(){e.add({severity:"error",summary:a("toast_error.summary"),detail:a("toast_error.detail_branch_exists"),life:3e3})}return{showFailedToast:t}},data(){return{branches:{},user:{},branchesArray:[],company:{},companies:[],companyNames:[],dateEstablishment:new Date,isDuplicate:!1,labelTitle:this.$t("branches_modal.title_add"),userIdentify:0,userNameIdentify:"",selectedPhoneMask:"",selectedCompany:"",selectedCountry:"",selectedLegalNature:"",masks:{br:"+55 (99) 99999-9999",us:"+1 (999) 999-9999",fr:"+33 99 99 99 99 99",de:"+49 99999 999999",it:"+39 999 999 9999",jp:"+81 999-9999-9999",pt:"+351 999 999 999"},legalNatures:{br:["Empresário Individual","Ltda","S.A","EIRELI","MEI","Cooperativa"],us:["LLC","Corp","Sole Proprietorship","Partnership","Cooperative","Nonprofit Organization"],fr:["SARL","SA","Entreprise Individuelle","SNC","SCS","Association"],de:["GmbH","AG","Einzelunternehmen","OHG","KG","eG"],jp:["Kabushiki Kaisha","Godo Kaisha","Shokushu Gyo","Gomei Kaisha","Goshi Kaisha"],it:["SRL","SpA","Impresa Individuale","SNC","SAS","COOP"],pt:["Lda","SA","Empresário em Nome Individual","Sociedade em Comandita","Cooperativa"]},countries:[{name:this.$t("countries.brazil"),code:"br"},{name:this.$t("countries.united_states"),code:"us"},{name:this.$t("countries.france"),code:"fr"},{name:this.$t("countries.germany"),code:"de"},{name:this.$t("countries.japan"),code:"jp"},{name:this.$t("countries.italy"),code:"it"},{name:this.$t("countries.portugal"),code:"pt"}]}},created(){const e=(0,Q.Pj)(),a=e.state.userId,t=e.state.userName;a||t||X.A.push("/"),this.userIdentify=a,this.userNameIdentify=t},async mounted(){await this.fetchUsers(),await this.fetchCompany(),await this.fetchAllCompanies(),""!==this.id&&(await this.fetchBranch(),this.labelTitle=this.$t("branches_modal.title_edit"))},computed:{innerVisible:{get(){return this.visible},set(e){e||this.$emit("update:visible",e)}}},methods:{async fetchUsers(){try{const e=await b.A.get(`/user/${this.userIdentify}`);this.user=e.data}catch(e){console.error("Error fetching user",e)}},async fetchAllCompanies(){try{const e=await b.A.get("/company");this.companies=e.data,this.companies=this.companies.filter((e=>this.user.companies.includes(e._id)))}catch(e){console.error("Error fetching companies",e)}},async fetchCompany(){try{const e=await b.A.get(`/company/${this.idCompany}`);this.company=e.data,this.selectedCompany=this.company.name}catch(e){console.error("Error fetching company",e)}},async fetchBranch(){try{const e=await b.A.get(`/branch/${this.id}`);this.branches=e.data,this.dateEstablishment=new Date(this.branches.date_establishment),this.selectedLegalNature=this.branches.legal_nature,this.selectedCountry=this.branches.country,this.branches.date_establishment=this.formatDate(this.branches.date_establishment)}catch(e){console.error("Error fetching branche",e)}},async postBranch(){this.onSelectCompany();try{if(this.isDuplicate=await this.checkDuplicateBranche(this.branches.name),this.isDuplicate)return void this.showFailedToast();this.branches.date_establishment=this.dateEstablishment.toISOString();const e=await b.A.post("/branch/",this.branches),a=e.data.branch._id;this.user.branches.push(a),await b.A.put(`/user/${this.userIdentify}`,this.user)}catch(e){console.error("Error posting branche",e)}},async putBranch(){this.onSelectCompany();try{if(this.isDuplicate=await this.checkDuplicateBranche(this.branches.name),this.isDuplicate)return void this.showFailedToast();this.branches.date_establishment=this.dateEstablishment.toISOString(),await b.A.put(`/branch/${this.id}`,this.branches)}catch(e){console.error("Error posting branche",e)}},async onSave(){""!==this.id?await this.putBranch():await this.postBranch(),this.isDuplicate||(this.innerVisible=!1,this.$emit("brancheUpdated"))},async checkDuplicateBranche(e){try{const a=await b.A.get("/branch"),t=a.data.filter((a=>this.user.branches.some((t=>t===a._id&&e.toLowerCase()===a.name.toLowerCase()&&a._id!==this.id))));return t.length>0}catch(a){return console.error("Error checking duplicate branche",a),!1}},onCountryChange(){this.branches.country=this.selectedCountry},formatDate(e){return e?new Date(e).toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}):""},onLegalNatureChange(){this.branches.legal_nature=this.selectedLegalNature},getLegalNaturesForCountry(e){return(this.legalNatures[e]||[]).map((e=>({name:e,value:e})))},getMaskForCountryBranche(){const e={br:"99.999.999/9999-99",us:"99-9999999",fr:"99999999999",de:"999999999999",it:"99.999.999.999",jp:"999-99-99999",pt:"999999999"};return e[this.selectedCountry]||""},getMaskForCountryZipCode(){const e={br:"99999-999",us:"99999-9999",fr:"99999",de:"99999",it:"99999",jp:"999-9999",pt:"9999-999"};return e[this.selectedCountry]||""},getMaskForCountryPhone(){const e={br:"+55 (99) 99999-9999",us:"+1 (999) 999-9999",fr:"+33 99 99 99 99 99",de:"+49 99999 999999",it:"+39 999 999 9999",jp:"+81 999-9999-9999",pt:"+351 999 999 999"};return e[this.selectedCountry]||""},onSelectCompany(){const e=this.companies.find((e=>e.name===this.selectedCompany))?._id||"";this.branches.company_id=e},searchCompanies(e){const a=e.query.toLowerCase();this.companyNames=this.companies.filter((e=>e.name.toLowerCase().includes(a))).map((e=>e.name))},onCancel(){this.innerVisible=!1}}}),Z=t(1241);const J=(0,Z.A)(H,[["render",O],["__scopeId","data-v-368656e7"]]);var Y=J,ee=t(8797),ae=t(1749),te=(t(5839),t(3230)),ne=(0,n.pM)({name:"BranchePage",props:{idCompany:{type:String,required:!0}},components:{BranchModal:Y,DeleteModal:ee.A},data(){return{filteredBranches:[],branches:[],company:{},user:{},modalData:{},isModalVisible:!1,isDeleteModalVisible:!1,isLoaded:!1,statusActive:this.$t("branches_page.table_status_value_active"),statusInactive:this.$t("branches_page.table_status_value_inactive"),userIdentify:"",userNameIdentify:"",idBranch:"",searchText:"",countries:[{name:this.$t("countries.brazil"),code:"br"},{name:this.$t("countries.united_states"),code:"us"},{name:this.$t("countries.france"),code:"fr"},{name:this.$t("countries.germany"),code:"de"},{name:this.$t("countries.japan"),code:"jp"},{name:this.$t("countries.italy"),code:"it"},{name:this.$t("countries.portugal"),code:"pt"}]}},created(){const e=(0,Q.Pj)(),a=e.state.userId,t=e.state.userName;a||t||X.A.push("/"),this.userIdentify=a,this.userNameIdentify=t},async mounted(){this.userIdentify&&(await this.fetchUsers(),await this.fetchCompanies(),await this.fetchBranches(),this.isLoaded=!0)},methods:{async fetchUsers(){try{const e=await b.A.get(`/user/${this.userIdentify}`);this.user=e.data}catch(e){console.error("Error fetching user",e)}},async fetchCompanies(){try{const e=await b.A.get(`/company/${this.idCompany}`);return this.company=e.data,this.company}catch(e){console.error("Error fetching companies",e)}},async fetchBranches(){try{const e=await b.A.get("/branch");this.branches=e.data,this.branches=this.branches.filter((e=>this.company._id===e.company_id)),this.branches=this.branches.filter((e=>this.user.branches.includes(e._id))),this.branches=this.branches.map((e=>({...e,date_establishment:this.formatDate(e.date_establishment)}))),this.filteredBranches=this.branches}catch(e){console.error("Error fetching branches:",e)}},async handlerFilteringBranch(){await this.fetchUsers(),this.fetchBranches()},onSave(e){this.filteredBranches=this.filteredBranches.map((a=>a._id===e._id?e:a))},getCountryName(e){const a=this.countries.find((a=>a.code===e));return a?a.name:""},getStatus(e){return 1===e?this.statusActive:this.statusInactive},formatDate(e){return e?new Date(e).toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}):""},onConfirm(e){this.isModalVisible=!1,this.$emit("onConfirm",e)},deleteItem(e){this.idBranch=e._id,this.isDeleteModalVisible=!0},goToFinancial(e){X.A.push(`/financial/${e._id}`)},openItem(e){this.idBranch=e?e._id:"",this.isModalVisible=!0},getCountryCode(e){const a=this.countries.find((a=>a.code===e));return a?a.code:""},exportToPDF(){const e=new ae["default"]("p","pt","a4"),a=[{title:"Name",dataKey:"name"},{title:"CNPJ",dataKey:"cnpj"},{title:"Legal Nature",dataKey:"legal_nature"},{title:"Country",dataKey:"country"},{title:"Share Capital",dataKey:"share_capital"},{title:"Company",dataKey:"company_id"},{title:"Status",dataKey:"active"}],t=this.filteredBranches.map((e=>({name:e.name,cnpj:e.cnpj,legal_nature:e.legal_nature,country:this.getCountryName(e.country),share_capital:this.formatCurrency(e.share_capital.toString()),company_id:this.company.name,active:this.getStatus(e.active)})));e.autoTable({head:[a.map((e=>e.title))],body:t.map((e=>a.map((a=>e[a.dataKey])))),startY:40,styles:{overflow:"linebreak"},columnStyles:{0:{cellWidth:80},1:{cellWidth:80},2:{cellWidth:80},3:{cellWidth:100},4:{cellWidth:80},5:{cellWidth:80},6:{cellWidth:70}},margin:{top:60,left:15}}),e.save("branch.pdf")},formatCurrency(e){if(!e||isNaN(parseFloat(e)))return"";const a=parseFloat(e);return"$"+a.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")},exportToExcel(){const e=this.filteredBranches.map((e=>({Name:e.name,Branch:e.cnpj,"Legal Nature":e.legal_nature,Country:this.getCountryName(e.country),"Share Capital":this.formatCurrency(e.share_capital.toString()),Company:this.company.name,Status:this.getStatus(e.active)}))),a=te.Wp.json_to_sheet(e),t=te.Wp.book_new();te.Wp.book_append_sheet(t,a,"Branche"),te._h(t,"branches.xlsx")},filterBranches(){const e=this.searchText.toLowerCase();this.filteredBranches=this.branches.filter((a=>{const t=a.name?.toLowerCase()||"",n=a.cnpj?.toLowerCase()||"",s=a.legal_nature?.toLocaleLowerCase()||"",i=this.getCountryName(a.country)?.toLowerCase()||"",r=a.share_capital?.toString()||"",l=(1===a.active?this.statusActive:this.statusInactive).toLowerCase();return t.includes(e)||n.includes(e)||s.includes(e)||i.includes(e)||r.includes(e)||l.startsWith(e)}))}}});const se=(0,Z.A)(ne,[["render",m],["__scopeId","data-v-028e3a3a"]]);var ie=se}}]);
//# sourceMappingURL=161.3bd2e342.js.map