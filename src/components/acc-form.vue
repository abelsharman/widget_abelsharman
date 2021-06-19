<template>
    <div class="main_form">
    <h1 :style="pTextColor"><img class="main_form_img" @click="back" src="https://img.icons8.com/ios/452/back--v1.png" :style="pTextColor">Оформление бронирования</h1>
    <h5 :style="h5TextColor">
      Введите корректные контактные данные, на которые будет оформлен билет.
      После совершения оплаты на указанный email будет выслано письмо с
      подтверждением и номером брони.
    </h5>
    <h2 :style="pTextColor">Контактная информация</h2>
    <v-form ref="form">
      <v-row>
  
  
  
  
        <v-col cols="12" md='6' lg='6' xs='12'>
          <label for="name" :style="pTextColor">Имя <span>*</span></label>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                autocomplete="off"
                placeholder="Имя"
                height="48"
                v-model="first_name"
                class="mt-2"
                v-bind="attrs"
                v-on="on"
                outlined
                :rules="[v => !!v]"
                hide-details
              >
              </v-text-field>
            </template>
            <v-list>
              <v-list-item
                class="list_item"
                v-for="(item, index) in availableUsers"
                :key="index"
                @click="selectUserData(item)"
              >
                <v-list-item-title class="list_item__title">{{
                  item.first_name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
              
  
  
        <v-col cols="12" md='6' lg='6' xs='12'>
          <label for="name" :style="pTextColor">Фамилия <span>*</span></label>
          <v-text-field
            class="mt-2"
            v-model="last_name"
            placeholder="Фамилия"
            outlined
            hide-details
            :rules="[v => !!v]"
          ></v-text-field>
        </v-col>
  
  
        <v-col cols="12" md='6' lg='6' xs='12'>
          <label for="name" :style="pTextColor">Вид документа <span>*</span></label>
          <v-select
            v-model="document_type"
            item-text="name"
            item-value="id"
            class="mt-2"
            hide-details
            :items="items"
            :rules="[v => !!v]"
            outlined
            :style="pTextColor"
          ></v-select>
        </v-col>
        <v-col cols="12" md='6' lg='6' xs='12'>
          <label for="name" :style="pTextColor">Номер документа <span>*</span></label>
          <v-text-field
            v-model="document_number"
            class="mt-2"
            placeholder="Номер документа"
            outlined
            :rules="[v => !!v]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md='6' lg='6' xs='12'>
          <label for="name" :style="pTextColor">Ваш номер телефона <span>*</span></label>
          <v-text-field
            class="mt-2"
            v-model="phone_number"
            placeholder="Тел"
            outlined
            :rules="[v => !!v]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md='6' lg='6' xs='12'>
          <label for="name" :style="pTextColor">Ваш e-mail <span>*</span></label>
          <v-text-field
            v-model="email"
            class="mt-2"
            placeholder="E-mail"
            outlined
            :rules="[v => !!v]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <label for="additional" :style="pTextColor">Дополнительные пожелания</label>
          <v-textarea
            v-model="comment"
            class="mt-2"
            name="input-7-1"
            outlined
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn @click="showCard" v-show="width < 768" color="primary" class="mb-8 showCardBtn" height="40" block :style="btnAccentColor">Показать карточку</v-btn>
  
  
    </v-form>
    <form
      v-show="context"
      ref="paymentForm"
      class="payment__passenger__form"
      name="SendOrder"
      method="post"
      action="https://epay.kkb.kz/jsp/process/logon.jsp"
    >
      <input
        v-show="context"
        type="hidden"
        name="Signed_Order_B64"
        id="Signed_Order_B64"
        :value="context"
      >
  
      <input
        class="v-payment__passenger__form__group--input mgt-12px"
        type="text"
        placeholder="email@email.com"
        id="formSurname"
        name="email"
        :value="person.email"
        required
      >
  
      <input type="hidden" name="Language" value="rus" >
      <input
        type="hidden"
        name="BackLink"
        value="https://app.easybook.kz/go2trip/#/"
      >
      <input
        type="hidden"
        name="PostLink"
        value="https://app.easybook.kz/api/go2trip/v2/booking-complete/"
      >
  
      <div class="agrrement d-flex align-center mt-4">
        <label class="m-0" for="checkbox">Со счетом согласен (-а) </label>
        <input class="ml-2" type="checkbox" id="checkbox" v-model="checked" >
      </div>
      <button
        v-show="checked"
        class="submit-btn mt-4"
        type="submit"
        name="GotoPay"
        value="Да, перейти к оплате"
      >
        отправить
      </button>
    </form>
  </div>
</template>
  


<script>
import axios from 'axios'
export default {
    name: 'AccForm',
      props: {
      ordercard: Array,
      submitaccbtnloading: Object,
      accomodationsubmit: Function,
    },
    data() {  
      return{
        mobileCard: false,
        selectedUser: {},
        availableUsers: [],
        person: {},
        items: [
          {
            id: "IC",
            name: "Удостоверение личности"
          },
          {
            id: "P",
            name: "Паспорт"
          },
          {
            id: "BC",
            name: "Свидетельство о рождении"
          },
          {
            id: "R",
            name: "Вид на жительство"
          }
        ],
        checked: true,
        context: false,
        width: window.innerWidth,
        text_color: localStorage.getItem("text"),
        text_button: localStorage.getItem("text_button"),
        accent_color: localStorage.getItem("accent")
      }
    },
    computed: {
      pTextColor:{
        get(){
          return {
            "color": this.text_color + " !important",
          }
        },
        set(value){
          this.$store.commit("updateFirstName", value)
        }
      },
      btnAccentColor:{
        get(){
          return {
            "background-color": this.accent_color + " !important",
            "color": this.text_button + " !important",
            "border-color": this.accent_color
          }
        },
        set(value){
          this.$store.commit("updateFirstName", value)
        }
      },
      h5TextColor:{
        get(){
          return {
            "color": this.text_color + " !important",
            "opacity": "0.5"
          }
        },
        set(value){
          this.$store.commit("updateFirstName", value)
        }
      },
      first_name:{
        get(){
          return this.$store.state.person.first_name
        },
        set(value){
          this.$store.commit("updateFirstName", value)
        }
      },
      last_name:{
        get(){
          return this.$store.state.person.last_name
        },
        set(value){
          this.$store.commit("updateLastName", value)
        }
      },
      document_type:{
        get(){
          return this.$store.state.person.document_type
        },
        set(value){
          this.$store.commit("updateDocumentType", value)
        }
      },
      document_number:{
        get(){
          return this.$store.state.person.document_number
        },
        set(value){
          this.$store.commit("updateDocumentNumber", value)
        }
      },
      phone_number:{
        get(){
          return this.$store.state.person.phone_number 
        },
        set(value){
          this.$store.commit("updatePhoneNumber", value)
        }
      },
      email:{
        get(){
          return this.$store.state.person.email
        },
        set(value){
          this.$store.commit("updateEmail", value)
        }
      },
      comment:{
        get(){
          return this.$store.state.person.comment
        },
        set(value){
          this.$store.commit("updateComment", value)
        }
      },
    },
    created() {
      this.availableUsers = [];
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },
    methods: {
      closeMobileCard() {
        this.mobileCard = false
      },
      showCard() {
        if(this.$store.state.person.first_name.length == 0 || 
          this.$store.state.person.last_name.length == 0 || 
          this.$store.state.person.document_type.length == 0 || 
          this.$store.state.person.document_number.length == 0 || 
          this.$store.state.person.email.length == 0){
            alert("Заполните данные")
        }
        else{
          this.mobileCard = true
          this.$emit("change-detail")
        }
      },
      selectUserData(e) {
        let tmp = {};
        Object.assign(tmp, e);
        this.person = tmp;
      },
      sendData() {
        if (!this.$refs.form.validate()) return;
        this.submitaccbtnloading.ready = true;
        this.person["id_card"] = this.person.document_number;
        let data = {
          clients: [this.person],
          order_id: this.$route.query.id
        };
  
        axios.post("https://app.easybook.kz/api/go2trip/v2/accommodation/book/", data)
          .then(res => {
            this.submitaccbtnloading.ready = false;
            //this.$store.commit("setPaymentContext", res.context);
            this.context = res.context;
            // this.$router.push({
            //   path: "/Payment",
            //   type: this.$route.query.type
            // });
            setTimeout(() => {
              if (res.context) this.$refs.paymentForm.submit();
            }, 1000);
          })
          .catch(() => {
            this.submitaccbtnloading.ready = false;
          });
      },
      back(){
        this.$emit('change-form')
        let datas = [];
        localStorage.setItem("orders", JSON.stringify(datas));
      }
    }
}
</script>




<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");
#app .v-application .primary {
    background-color: transparent !important;
    border-color: transparent !important;
}
.widget{
    position: relative;
    background: #e7ecef !important;
    color: rgba(61,61,61,.8);
    margin: 5vw 0;
    width: 80vw;
    display: inline-block;
    font-family: "Roboto",sans-serif;
    text-align: left;
}
.widget_form{
	width: 35vw; 
	transition: 0.5s all ease; 
	margin-left: 1vw;
	background-color:white;
	display: inline-block;
	cursor: pointer; 
	box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12); 
	border-radius: 3px;
}
.widget_form img{
	margin-top: 11px
}
.widget_form span{
	position: relative; 
	top: -3px;
	font-weight: 400;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	color: #001239; 
}





#app .v-application p{
  margin-bottom: 0px;
}

.widget p{
  margin-bottom: 0px;
}


#app{
  text-align: left;
}

.active_tab {
  background: #ff7f51;
}

.luckyDateBtns {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}





@keyframes appearBlock {
  from {opacity: 0;}
  to {opacity: 1;}
}

.widget_datepicker div div{
  display: flex !important;
}

.boxes{
  margin: 10px 0;
}




.web_acc_box .mobile_header {
	display: block;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 44px;
	z-index: 1002;
	background: #fff;
}

.web_acc_box .mobile_header img {
	position: absolute;
	left: 16px;
	top: 12px;
}

.web_acc_box .mobile_header p {
	font-family: SFsemibold;
	text-align: center;
	font-size: 1.180vw; /* 17px */
	line-height: 1.388vw; /* 20px; */
	color: #001239;
	margin-bottom: 0 !important;
}

.web_acc_box .book_room_btn {
	display: none;
}

.web_acc_box .main_box {
	height: auto;
	padding: 25px;
	margin-bottom: 20px;
	background: #ffffff;
	box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1);
	border-radius: 4px;
}

.web_acc_box .main_box:last-of-type {
	margin-bottom: 0;
}

.web_acc_box .visible {
	display: grid;
	grid-template-columns: 10vw 1fr;
	grid-column-gap: 1vw;
	align-items: start;
}

.web_acc_box .visible .avatar {
	background-image: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png");
	cursor: pointer;
	background-size: cover;
	background-position: center center;
	height: 178px;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	padding: 10px;
	border-radius: 4px;
}

.web_acc_box .visible .avatar__count {
	padding: 4px 7px;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.web_acc_box .visible .avatar__count p {
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-size: 0.8333vw; /*12px;*/
	line-height: 0.97vw; /*14px;*/
	color: #ffffff;
	margin: 0;
}

.web_acc_box .visible .description {
	display: grid;
	grid-template-columns: 24vw 11vw 11vw;
	grid-column-gap: 1vw;
}

.web_acc_box .visible .description .titles .tags_list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 12px 0px;
	padding-left: 0px;
}

.web_acc_box .visible .description .titles .tags_list p {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	color: #000000;
	margin-right: 19px;
	position: relative;
}



.web_acc_box .visible .description .titles h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
  font-size: 1.52777vw; /* 22px */
	line-height: 1.805vw; /*26px;*/
	color: #001239;
	margin-bottom: 12px;
}

.web_acc_box .visible .description .titles__main {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	color: #000000;
	margin-bottom: 12px;
	display: block;
      /* Fallback for non-webkit */
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

.web_acc_box .visible .description .titles .additional {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.web_acc_box .visible .description .titles .additional h4 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	color: #ff7f51;
	margin-bottom: 0;
	margin-right: 16px;
}

.web_acc_box .visible .description .titles .additional button {
	width: 149px;
	height: 40px;
	border: 1px solid #ff7f51;
	background: #ff7f51;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
	border-radius: 4px;
	transition: 0.22s;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	color: #ffffff;
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
}

.web_acc_box .visible .description .titles .additional button svg {
	margin-right: 10px;
}

.web_acc_box .visible .description .titles .additional button:hover {
	background: #fff;
	color: #ff7f51;
}

.web_acc_box .visible .description .titles .additional button:hover svg path {
	fill: #ff7f51;
}

.web_acc_box .visible .description .price {
	text-align: center;
	padding-top: 52px;
}

.web_acc_box .visible .description .price h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.52777vw; /* 22px */
	line-height: 1.80vw; /*26px;*/
	color: #001239;
	margin-bottom: 6px;
}

.web_acc_box .visible .description .price p {
	font-size: 0.8333vw; /*12px;*/
	line-height: 0.97vw; /*14px;*/
	color: #021011;
	margin: 0;
}

.web_acc_box .visible .description .actions {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding-top: 21px;
}

.web_acc_box .visible .description .actions h4 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.01vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	color: #00b1bb;
}

.web_acc_box .visible .description .actions p {
	display: grid;
	grid-template-columns: 25px 18px 25px;
	grid-column-gap: 10px;
	align-items: center;
	text-align: center;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-size: 1.38vw; /*20px;*/
	line-height: 1.66vw; /*24px;*/
	color: #001239;
	margin-bottom: 10px;
	padding: 10px 0px;
}

.web_acc_box .visible .description .actions p img {
	cursor: pointer;
}

.web_acc_box .visible .description .actions button {
	width: 160px;
	height: 44px;
	background: #ff7f51;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	color: #ffffff;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
	border-radius: 4px;
	transition: 0.22s;
	border: 1px solid #ff7f51;
}

.web_acc_box .visible .description .actions button:hover {
	background: #fff;
	color: #ff7f51;
}

.web_acc_box .hidden {
	padding-top: 25px;
	border-top: 1px solid #d7dddd;
	margin-top: 24px;
}

.web_acc_box .hidden h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	text-transform: uppercase;
	color: #021011;
	margin-bottom: 26px;
}

.web_acc_box .hidden .additional_counter {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: 100%;
}

.web_acc_box .hidden .additional_counter__single {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 300px;
}

.web_acc_box .hidden .additional_counter__single h3 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	color: #021011;
	margin: 0;
}

.web_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /*16px;*/
	line-height: 1.3194vw; /*19px;*/
	color: #021011;
	margin-bottom: 6px;
}

.web_acc_box .hidden .additional_counter__single .people_age h5 {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 0.833vw; /*12px;*/
	line-height: 0.97vw; /*14px;*/
	color: #cfd7e3;
	margin: 0;
}

.web_acc_box .hidden .additional_counter__single .actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;
	width: 80px;
}

.web_acc_box .hidden .additional_counter__single .actions p {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	margin: 0 !important;
	font-size: 0.97vw; /*14px;*/
	line-height: 1.11vw; /*16px;*/
	color: #021011;
}

.web_acc_box .hidden .additional_counter__single .actions img {
	cursor: pointer;
}

.web_acc_box .activeBtn {
	background: #fff !important;
	color: #ff7f51 !important;
}

.web_acc_box .activeBtn svg path {
	fill: #ff7f51 !important;
}

.web_acc_box .hidden-leave {
	position: absolute;
	opacity: 0;
	display: none;
}
.web_acc_box .room_left {
	position: absolute;
	top: 14px;
	left: 16px;
	background: #FF7F51;
	border-radius: 4px;
	padding: 6px;
}
.web_acc_box .room_left	h3 {
	font-family: SFsemibold;
	font-size: 10px;
	line-height: 12px;
	color: #FFFFFF;	
}
  
.web_acc_box {
	display: unset !important;
}
.mobile_acc_box {
	display: none !important;
}
@media all and (max-width: 768px) {
	.widget_form{
		width: 35vw; 
		transition: 0.5s all ease; 
		margin-left: 1vw;
		background-color:white;
		display: inline-block;
		cursor: pointer; 
		box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12); 
		border-radius: 3px;
	}
	.widget_form img{
		margin-top: 14px
	}
	.widget_form span{
		position: relative; 
		top: -3px;
		font-weight: 400;
		font-size: 2.61vw; 
		line-height: 1.3194vw; /*19px;*/
		color: #001239; 
	}
	
	.widget{
		margin: 5vw 0vw;
		width: 100vw;
	}
	.mobile_acc_box {
		display: unset !important;
	}
	.web_acc_box {
		display: none !important;
	}
	.web_acc_box .main_box {
		width: 100%;
		min-height: 402px;
		overflow-x: hidden;
		overflow-y: hidden;
		height: auto;
		padding: 0;
		box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1);
		margin-top: 8px;
	}

	.web_acc_box .visible {
		display: block;
		grid-template-columns: unset;
		grid-column-gap: unset;
		align-items: start;
	}

	.web_acc_box .visible .avatar {
		height: 151px;
		padding: 12px;
		border-radius: 4px 4px 0px 0px;
		margin-bottom: 12px;
	}

	.web_acc_box .visible .description {
		display: block;
		grid-template-columns: 464px 139px 1fr;
		grid-column-gap: 32px;
	}

	.web_acc_box .visible .description .titles .tags_list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 12px 0px;
		padding-left: 12px;
	}

	.web_acc_box .visible .description .titles .tags_list p {
		font-size: 1.041vw; /* 15px */
		line-height: 1.25vw; /* 18px; */
		color: rgba(0, 18, 57, 0.5);
		margin-right: 19px;
	}

	

	.web_acc_box .visible .description .titles h2 {
		font-size: 1.180vw; /* 17px */
		line-height: 1.388vw; /* 20px; */
		margin-bottom: 12px;
	}

	.web_acc_box .visible .description .titles__main {
		font-size: 1.041vw; /* 15px */
		line-height: 1.25vw; /* 18px; */
		-webkit-line-clamp: 4;
	}

	.web_acc_box .visible .description .titles .additional {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.web_acc_box .visible .description .titles .additional h4 {
		font-size: 0.833vw; /* 12px */
		line-height: 0.972vw; /* 14px; */
		margin-bottom: 0;
		margin-right: 16px;
	}

	.web_acc_box .visible .description .titles .additional button {
		width: 149px;
		font-size: 1.041vw; /* 15px */
		line-height: 1.25vw; /* 18px; */
	}

	.web_acc_box .visible .description .price {
		text-align: left;
		padding-top: 12px;
	}

	.web_acc_box .visible .description .price h2 {
		font-size: 1.180vw; /* 17px */
		line-height: 1.388vw; /* 20px; */
	}

	.web_acc_box .visible .description .price p {
		font-size: 0.833vw; /* 12px */
		line-height: 0.972vw; /* 14px; */
	}

	.web_acc_box .visible .description .actions {
		flex-direction: row;
		padding-top: 12px;
	}

	.web_acc_box .visible .description .actions h4 {
		font-size: 0.833vw; /* 12px */
		line-height: 0.972vw; /* 14px; */
		width: 78px;
	}

	.web_acc_box .visible .description .actions p {
		grid-template-columns: 20px 18px 20px;
		grid-column-gap: 6px;
		font-size: 0.833vw; /* 12px */
		line-height: 0.972vw; /* 14px; */
		padding: 5px 0px;
	}

	.web_acc_box .visible .description .actions button {
		margin-left: 12px;
		width: 100px;
		height: 40px;
		font-size: 1.11vw; /* 16px */
		line-height: 1.31vw; /* 19px; */
	}

	.web_acc_box .hidden {
		padding-top: 13px;
		margin-top: 12px;
	}

	.web_acc_box .hidden h2 {
		font-size: 1.041vw; /* 15px */
		line-height: 1.25vw; /* 18px; */
		text-transform: unset;
		margin-bottom: 10px;
	}

	.web_acc_box .hidden .additional_counter {
		display: block;
	}

	.web_acc_box .hidden .additional_counter__single {
		width: 100%;
	}

	.web_acc_box .hidden .additional_counter__single h3 {
		font-size: 1.041vw; /* 15px */
		line-height: 1.25vw; /* 18px; */
		color: #FF7F51;
	}

	.web_acc_box .hidden .additional_counter__single .people_age {
		width: 100px;
	}

	.web_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
		font-size: 1.041vw; /* 15px */
		line-height: 1.25vw; /* 18px; */
	}

	.web_acc_box .hidden .additional_counter__single .people_age h5 {
		font-size: 0.833vw; /* 12px */
		line-height: 0.972vw; /* 14px; */
		margin: 0;
	}

	.web_acc_box .hidden .additional_counter__single .actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5px;
		width: 100px;
	}
}

@media all and (max-width: 768px) {

	.main_box {
		width: 100%;
		min-height: 402px;
		overflow-x: hidden;
		overflow-y: hidden;
		height: auto;
		padding: 0;
		box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1);
		margin-top: 8px;
	}

	.visible {
		display: block;
		grid-template-columns: unset;
		grid-column-gap: unset;
		align-items: start;
	}

	.visible .avatar {
		height: 151px;
		padding: 12px;
		border-radius: 4px 4px 0px 0px;
		margin-bottom: 12px;
	}

	.visible .description {
		display: block;
		grid-template-columns: 464px 139px 1fr;
		grid-column-gap: 32px;
	}

	.visible .description .titles .tags_list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 12px 0px;
		padding-left: 12px;
	}

	.visible .description .titles .tags_list p {
		font-size: 15px;
		line-height: 18px;
		color: rgba(0, 18, 57, 0.5);
		margin-right: 19px;
	}

	

	.visible .description .titles h2 {
		font-size: 17px;
		line-height: 20px;
		margin-bottom: 12px;
	}

	.visible .description .titles__main {
		font-size: 15px;
		line-height: 18px;
		-webkit-line-clamp: 4;
	}

	.visible .description .additional h3 {
		font-family: SFsemibold;
		font-size: 12px;
		line-height: 14px;
		margin-bottom: 6px !important;
		margin-right: 16px;
	}

	.visible .description .additional button {
		width: 149px;
		font-size: 15px;
		line-height: 18px;
	}

	.visible .description .price {
		padding-top: 12px;
	}

	.visible .description .price h2 {
		font-size: 17px;
		line-height: 20px;
	}

	.visible .description .price p {
		font-size: 12px;
		line-height: 14px;
	}

	.visible .description .actions {
		flex-direction: row;
		padding-top: 12px;
	}

	.visible .description .actions h2 {
		font-size: 12px;
		line-height: 14px;
		width: 78px;
	}

	.visible .description .actions p {
		grid-template-columns: 24px 18px 24px;
		grid-column-gap: 6px;
		font-size: 12px;
		line-height: 14px;
		padding: 5px 0px;
	}

	.visible .description .actions button {
		margin-left: 12px;
		width: 100px;
		height: 40px;
		font-size: 16px;
		line-height: 19px;
	}

	.hidden {
		padding-top: 13px;
		margin-top: 12px;
	}

	.hidden h2 {
		font-size: 15px;
		line-height: 18px;
		text-transform: unset;
		margin-bottom: 10px;
	}

	.hidden .additional_counter {
		display: block;
	}

	.hidden .additional_counter__single {
		width: 100%;
	}

	.hidden .additional_counter__single h3 {
		font-size: 15px;
		line-height: 18px;
		color: #FF7F51;
	}

	.hidden .additional_counter__single .people_age {
		width: 100px;
	}

	.hidden .additional_counter__single .people_age p:first-of-type {
		font-size: 15px;
		line-height: 18px;
	}

	.hidden .additional_counter__single .people_age h5 {
		font-size: 12px;
		line-height: 14px;
		margin: 0;
	}

	.hidden .additional_counter__single .actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5px;
		width: 100px;
	}
}

.swiper_container {
	padding-top: 54px;
}

.swiper_container .slider_content {
	border-bottom: 0px solid #FF7F51;
	padding-bottom: 6px;
	color: #FF7F51 !important;
}

.swiper_container .swiper_slide {
	width: 25vw;
	display: inline-block;
}

.swiper_container .swiper_slide .slider_content {
	cursor: pointer;
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	width: 95px;
	font-size: 1.11vw; /* 16px */
	line-height: 19px; /* 19px; */
	text-align: center;
	color: #001239;
	padding-bottom: 10px;
}

.mobile_services {
	background: #fff;
	width: 100%;
	height: 100vh;
	overflow-y: hidden;
}

.mobile_services__footer {
	position: fixed;
	background: #fff;
	bottom: 0;
	padding-bottom: 83px;
	padding-top: 12px;
	left: 0;
	right: 0;
	width: 100%;
}

.single_service {
	display: grid;
	grid-template-columns: 1fr 1fr 88px;
	align-items: center;
}

.single_service h5 {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 0.902vw; /* 13px */
	line-height: 1.11vw; /* 16px; */
	color: #BAB8B8;
	margin: 0 !important;
}

.single_service .price {
	padding-left: 8px;
}

.single_service .price h1 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.180vw; /* 17px */
	line-height: 1.388vw; /* 20px; */
	color: #FF7F51;
	margin-bottom: 2px !important;
}

.single_service .title h2 {
	font-size: 1.041vw; /* 15px */
	line-height: 1.25vw; /* 18px; */
	color: #001239;
	margin-bottom: 2px !important;
}

.single_service .actions {
	display: grid;
	grid-template-columns: repeat(3, 25px);
	align-items: center;
	text-align: center;
	min-height: 70px;
	margin-bottom: 8px;
}

.service_wrapper {
	overflow-y: scroll;
	padding: 0 16px 230px;
	height: 100vh;
}





































/* mobile list of rooms */

.mobile_acc_box .room_left {
	position: absolute;
	top: 14px;
	left: 16px;
	background: #FF7F51;
	border-radius: 4px;
	padding: 6px;
}

.mobile_acc_box .room_left h4 {
	font-family: SFsemibold;
	font-weight: lighter;
	font-size: 10px;
	line-height: 12px;
	color: #FFFFFF;
}

.mobile_services .mobile_header {
	display: block;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 44px;
	z-index: 1002;
	background: #fff;
}
.mobile_services .mobile_header img {
	position: absolute;
	left: 16px;
	top: 12px;
}

.mobile_services .mobile_header p {
	font-family: SFsemibold;
	text-align: center;
	font-size: 17px;
	line-height: 20px;
	color: #001239;
	margin-bottom: 0 !important;
}

.mobile_acc_box .book_room_btn {
	display: none;
}

.mobile_acc_box .main_box {
	height: auto;
	padding: 25px;
	margin-bottom: 20px;
	background: #ffffff;
	box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1);
	border-radius: 4px;
}

.mobile_acc_box .main_box:last-of-type {
	margin-bottom: 0;
}

.mobile_acc_box .visible {
	display: grid;
	grid-template-columns: 178px 1fr;
	grid-column-gap: 25px;
	align-items: start;
}

.mobile_acc_box .visible .avatar {
	position: relative;
	background-image: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png");
	cursor: pointer;
	background-size: cover;
	background-position: center center;
	height: 178px;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	padding: 10px;
	border-radius: 4px;
}

.mobile_acc_box .visible .avatar__count {
	padding: 4px 7px;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.mobile_acc_box .visible .avatar__count p {
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-size: 12px;
	line-height: 14px;
	color: #ffffff;
	margin: 0;
}

.mobile_acc_box .visible .description {
	display: grid;
	grid-template-columns: 464px 139px 1fr;
	grid-column-gap: 32px;
}

.mobile_acc_box .visible .description .titles {
	padding: 0 12px;
}

.mobile_acc_box .visible .description .titles .tags_list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 12px 0px;
	padding-left: 12px;
}

.mobile_acc_box .visible .description .titles .tags_list p {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	margin-right: 19px;
	position: relative;
}


.mobile_acc_box .visible .description .titles h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 22px;
	line-height: 26px;
	color: #001239;
	margin-bottom: 12px;
}

.mobile_acc_box .visible .description .titles__main {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	margin-bottom: 12px;
	display: block;
        /* Fallback for non-webkit */
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

.mobile_acc_box .visible .description .additional {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 12px;
}

.mobile_acc_box .visible .description .additional h3 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: #ff7f51;
	margin-bottom: 0;
	margin-right: 16px;
}

.mobile_acc_box .visible .description .additional button {
	width: 149px;
	height: 40px;
	border: 1px solid #ff7f51;
	background: #ff7f51;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
	border-radius: 4px;
	transition: 0.22s;
	font-size: 16px;
	line-height: 19px;
	color: #ffffff;
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
}

.mobile_acc_box .visible .description .additional button svg {
	margin-right: 10px;
}

.mobile_acc_box .visible .description .additional button:hover {
	background: #fff;
	color: #ff7f51;
}

.mobile_acc_box .visible .description .additional button:hover svg path {
	fill: #ff7f51;
}

.mobile_acc_box .visible .description .price {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 12px 12px 0px;
	padding-top: 52px;
}

.mobile_acc_box .visible .description .price h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 22px;
	line-height: 26px;
	color: #001239;
	margin-bottom: 6px;
}

.mobile_acc_box .visible .description .price p {
	font-size: 12px;
	line-height: 14px;
	color: #021011;
	margin: 0;
}

.mobile_acc_box .visible .description .price button {
	width: 100px;
	height: 40px;
	font-size: 16px;
	line-height: 19px;
	background: #ff7f51;
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	color: #ffffff;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
	border-radius: 4px;
	transition: 0.22s;
	border: 1px solid #ff7f51;
}

.mobile_acc_box .visible .description .price button:hover {
	background: #fff;
	color: #ff7f51;
}

.mobile_acc_box .visible .description .actions {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding-top: 21px;
}

.mobile_acc_box .visible .description .actions h4 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: #00b1bb;
}

.mobile_acc_box .visible .description .actions p {
	display: grid;
	grid-template-columns: 25px 18px 25px;
	grid-column-gap: 10px;
	align-items: center;
	text-align: center;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: #001239;
	margin-bottom: 10px;
	padding: 10px 0px;
}

.mobile_acc_box .visible .description .actions p img {
	cursor: pointer;
}

.mobile_acc_box .visible .description .actions button {
	width: 160px;
	height: 44px;
	background: #ff7f51;
	font-size: 16px;
	line-height: 19px;
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	color: #ffffff;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
	border-radius: 4px;
	transition: 0.22s;
	border: 1px solid #ff7f51;
}

.mobile_acc_box .visible .description .actions button:hover {
	background: #fff;
	color: #ff7f51;
}

.mobile_acc_box .hidden {
	padding-top: 25px;
	border-top: 1px solid #d7dddd;
	margin-top: 24px;
}

.mobile_acc_box .hidden h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	text-transform: uppercase;
	color: #021011;
	margin-bottom: 26px;
}

.mobile_acc_box .hidden .additional_counter {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: 100%;
	padding: 0 12px;
}

.mobile_acc_box .hidden .additional_counter__single {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 300px;
}

.mobile_acc_box .hidden .additional_counter__single h3 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: #021011;
	margin: 0;
}

.mobile_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #021011;
	margin-bottom: 6px;
}

.mobile_acc_box .hidden .additional_counter__single .people_age h5 {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 12px;
	line-height: 14px;
	color: #cfd7e3;
	margin: 0;
}

.mobile_acc_box .hidden .additional_counter__single .actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;
	width: 80px;
}

.mobile_acc_box .hidden .additional_counter__single .actions p {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	margin: 0 !important;
	font-size: 14px;
	line-height: 16px;
	color: #021011;
}

.mobile_acc_box .hidden .additional_counter__single .actions img {
	cursor: pointer;
}

.mobile_acc_box .activeBtn {
	background: #fff !important;
	color: #ff7f51 !important;
}

.mobile_acc_box .activeBtn svg path {
	fill: #ff7f51 !important;
}

.mobile_acc_box .hidden-leave {
	position: absolute;
	opacity: 0;
	display: none;
}

@media all and (max-width: 768px) {
	.mobile_acc_box .main_box {
		width: 100%;
		min-height: 402px;
		overflow-x: hidden;
		overflow-y: hidden;
		height: auto;
		padding: 0;
		box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1);
		margin-top: 8px;
	}

	.mobile_acc_box .visible {
		display: block;
		grid-template-columns: unset;
		grid-column-gap: unset;
		align-items: start;
	}

	.mobile_acc_box .visible .avatar {
		height: 151px;
		padding: 12px;
		border-radius: 4px 4px 0px 0px;
		margin-bottom: 12px;
	}

	.mobile_acc_box .visible .description {
		display: block;
		grid-template-columns: 464px 139px 1fr;
		grid-column-gap: 32px;
	}

	.mobile_acc_box .visible .description .titles .tags_list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 12px 0px;
		padding-left: 12px;
	}

	.mobile_acc_box .visible .description .titles .tags_list p {
		font-size: 15px;
		line-height: 18px;
		color: rgba(0, 18, 57, 0.5);
		margin-right: 19px;
	}

	
	.single_service_p{
		font-family: "Roboto",sans-serif;
		font-weight: 400;
		font-size: 13px;
		line-height: 16px;
		color: #bab8b8;
		margin: 0!important;
	}


	.mobile_acc_box .visible .description .titles h2 {
		font-size: 17px;
		line-height: 20px;
		margin-bottom: 12px;
	}

	.mobile_acc_box .visible .description .titles__main {
		font-size: 15px;
		line-height: 18px;
		-webkit-line-clamp: 4;
	}

	.mobile_acc_box .visible .description .additional h4 {
		font-family: SFsemibold;
		font-size: 12px;
		line-height: 14px;
		margin-bottom: 6px !important;
		margin-right: 16px;
	}

	.mobile_acc_box .visible .description .additional button {
		width: 149px;
		font-size: 15px;
		line-height: 18px;
	}

	.mobile_acc_box .visible .description .price {
		padding-top: 12px;
	}

	.mobile_acc_box .visible .description .price h2 {
		font-size: 17px;
		line-height: 20px;
	}

	.mobile_acc_box .visible .description .price p {
		font-size: 12px;
		line-height: 14px;
	}

	.mobile_acc_box .visible .description .actions {
		flex-direction: row;
		padding-top: 12px;
	}

	.mobile_acc_box .visible .description .actions h4 {
		font-size: 12px;
		line-height: 14px;
		width: 78px;
	}

	.mobile_acc_box .visible .description .actions p {
		grid-template-columns: 24px 18px 24px;
		grid-column-gap: 6px;
		font-size: 12px;
		line-height: 14px;
		padding: 5px 0px;
	}

	.mobile_acc_box .visible .description .actions button {
		margin-left: 12px;
		width: 100px;
		height: 40px;
		font-size: 16px;
		line-height: 19px;
	}

	.mobile_acc_box .hidden {
		padding-top: 13px;
		margin-top: 12px;
	}

	.mobile_acc_box .hidden h2 {
		font-size: 15px;
		line-height: 18px;
		text-transform: unset;
		margin-bottom: 10px;
		margin-left: 10px;
	}

	.mobile_acc_box .hidden .additional_counter {
		display: block;
	}

	.mobile_acc_box .hidden .additional_counter__single {
		margin: 2vw 0;
		width: 100%;
	}

	.mobile_acc_box .hidden .additional_counter__single h3 {
		font-size: 15px;
		line-height: 18px;
		color: #FF7F51;
	}

	.mobile_acc_box .hidden .additional_counter__single .people_age {
		width: 100px;
	}

	.mobile_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
		font-size: 15px;
		line-height: 18px;
	}

	.mobile_acc_box .hidden .additional_counter__single .people_age h5 {
		font-size: 12px;
		line-height: 14px;
		margin: 0;
	}

	.mobile_acc_box .hidden .additional_counter__single .actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5px;
		width: 100px;
	}
}

.mobile_acc_box .swiper_container {
	overflow-x: scroll;
	justify-content: center;
	padding-top: 54px;
}

.mobile_acc_box .swiper_container  .slider_content {
	border-bottom: 0px solid #FF7F51;
	padding-bottom: 6px;
	color: #FF7F51 !important;
	font-size: 14px;
	transition: 0.5s all ease;
}
.slider_content_active {
	border-bottom: 1px solid #FF7F51 !important;
}
.mobile_acc_box .swiper_container .swiper_slide {
	display: inline-block;
	width: auto;
}

.mobile_acc_box .swiper_container .swiper_slide .slider_content {
	cursor: pointer;
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	width: 95px;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	color: #001239;
	padding-bottom: 10px;
}

.mobile_acc_box .mobile_services {
	background: #fff;
	width: 100%;
	height: 100vh;
	overflow-y: hidden;
}

.mobile_acc_box .mobile_services__footer {
	position: fixed;
	background: #fff;
	bottom: 0;
	padding-bottom: 83px;
	padding-top: 12px;
	left: 0;
	right: 0;
	width: 100%;
}

.mobile_acc_box .single_service {
	display: grid;
	grid-template-columns: 1fr 1fr 88px;
	align-items: center;
}

.mobile_services .single_service h5 {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
	color: #BAB8B8;
	margin: 0 !important;
}

.mobile_acc_box .single_service .price {
	padding-left: 8px;
}

.mobile_services .single_service .price h1 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 17px;
	line-height: 20px;
	color: #FF7F51;
	margin-bottom: 2px !important;
}

.mobile_services .single_service .title h2 {
	font-size: 15px;
	line-height: 18px;
	color: #001239;
	margin-bottom: 2px !important;
}

.mobile_acc_box .single_service .actions {
	display: grid;
	grid-template-columns: repeat(3, 25px);
	align-items: center;
	text-align: center;
	min-height: 70px;
	margin-bottom: 8px;
}

.mobile_acc_box .service_wrapper {
	overflow-y: scroll;
	padding: 0 16px 230px;
	height: 100vh;
	margin-top: 4vw;
}







































/* форма бронирования */




.payment__passenger__form {
	display: none;
}

.main_form {
	width: 100%;
  max-width: 27vw;
  display: inline-block;
  vertical-align: top;
  margin-top: 2vh;
}

.main_form h1 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.527vw; /*22px;*/
	line-height: 1.805vw; /* 26px; */
	text-transform: uppercase;
	color: #001239;
	margin-bottom: 30px;
}
.main_form_img{
  width: 20px;
  position: relative;
  top: 2px;
  margin-right: 10px;
  background-color: lightgrey;
  border-radius: 25px;
  padding: 5px;
  cursor: pointer;
}

.main_form h5 {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: rgba(0, 18, 57, 0.5);
	margin-bottom: 30px;
}

.main_form h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin-bottom: 32px;
}

.form_inputs {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 25px;
	grid-row-gap: 20px;
	margin-bottom: 20px;
}

.form_inputs__single {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}

label {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin-bottom: 6px;
}

label span {
	color: #ff7f51;
}

input {
	/* width: 100%; */
	/* height: 50px;
	padding-left: 20px; */
	outline: none;
	border: 1px solid #bbc2d0;
	box-sizing: border-box;
	border-radius: 4px;
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
}

::placeholder {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #e9e9e9;
}

.showCardBtn {
	display: none;
}

@media all and (max-width: 768px) {
	.showCardBtn {
		display: unset;
	}

	.main_form {
		display: block;
		max-width: 96vw;
		padding: 0 2.5vw;
	}

	.main_form h1 {
		font-size: 17px; /* 1.180vw */
		line-height: 20px; /* 1.388vw; */
		margin-bottom: 18px;
		text-align: center;
	}

	.main_form h5 {
		font-size: 10px; /* 0.694vw */
		line-height: 12px; /* 0.83vw; */
		margin-bottom: 32px !important;
	}

	.main_form h2 {
		font-size: 15px; /* 1.041vw */
		line-height: 18px; /* 1.25vw; */
		margin-bottom: 12px;
	}
	label {
		font-family: "Roboto", sans-serif;
		font-weight: 400;
		font-size: 16px; /* 1.11vw; */
		line-height: 19px; /* 1.31vw; */
		color: #001239;
		margin-bottom: 6px;
	}
	input {
		/* width: 100%; */
		/* height: 50px;
		padding-left: 20px; */
		outline: none;
		border: 1px solid #bbc2d0;
		box-sizing: border-box;
		border-radius: 4px;
		font-family: "Roboto", sans-serif;
		font-weight: 400;
		font-size: 16px; /* 1.11vw; */
		line-height: 19px; /* 1.31vw;; */
		color: #001239;
	}
	::placeholder {
		font-family: "Roboto", sans-serif;
		font-weight: 400;
		font-size: 16px;  /* 1.11vw; */
		line-height: 19px;  /* 1.31vw;; */
		color: #e9e9e9;
	}
}

.closeMobileCard {
	position: absolute;
	z-index: 999;
	top: 24px;
	right: 24px;
	width: 16px !important;
	height: 16px;
}







































/* sidebox часть для бронирования */

.main_card{
  background-color: white;
  width: 110%;
  position: relative;
  left: -5%;
  padding: 2% 5%;
}



.disabled {
	opacity: 0.5;
	cursor: default;
}

.disabled:hover {
	background: #ff7f51;
	color: #fff;
}

.main_box_1 {
	width: 100%;
	max-width: 550px;
	background: #ffffff;
	box-shadow: 0px 10px 20px rgba(146, 178, 193, 0.3);
	border-radius: 5px;
	padding: 20px;
  width: 100%;
}
.main_box_2{
  width: 34vw;
  margin-left: 1vw;
  display: inline-block;
  padding: 1.5vw;
  margin-top: 2vh;
  background-color: white;
}
.box {
	position: relative;
	padding-bottom: 20px;
	margin-bottom: 20px;
}

.box .custom_border {
	position: absolute;
	bottom: 0;
	left: -20px;
	right: -20px;
	height: 1px;
	background: #ff7f51;
}

.box__title {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	text-transform: uppercase;
	color: #001239;
	margin-bottom: 20px;
}

.box__header {
	display: grid;
	grid-template-columns: 180px 1fr;
	grid-column-gap: 20px;
	align-items: start;
	height: 180px;
}

.box__header .avatar {
	width: 100%;
	height: 180px;
	background-size: cover;
	background-position: center center;
	border-radius: 4px;
}

.box__header .descr {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	height: 100%;
}

.box__header .descr__type {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: rgba(0, 18, 57, 0.5);
	margin-bottom: 6px !important;
}

.box__header .descr__title {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin-bottom: 10px !important;
}

.box__header .descr__loc {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin-bottom: 9px !important;
}

.box__header .descr__loc img {
	margin-right: 6px;
}

.box__header .descr__name {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
}

.box__header .descr button {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	height: 50px;
	width: 100%;
	border: 1px solid #ff7f51;
	border-radius: 4px;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #fff;
	letter-spacing: normal;
	text-transform: none;
}

.dates {
	padding-top: 40px;
	padding-bottom: 20px;
	margin-bottom: 19px;
	border-bottom: 1px solid #e6e6e6;
}

.dates p {
	display: grid;
	grid-template-columns: 18px 1fr;
	grid-column-gap: 10px;
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin-bottom: 11px !important;
}

.dates p:last-of-type {
	margin-bottom: 0 !important;
}

.time {
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #e6e6e6;
}

.time p {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #ff7f51;
	margin-bottom: 12px !important;
}

.time p:last-of-type {
	margin-bottom: 0 !important;
}

.time p strong {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	color: #001239;
	margin-left: 10px;
	margin-right: 20px;
}

.time p img {
	margin-bottom: 1px;
	cursor: pointer;
}

.additional_service {
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #e6e6e6;
}

.additional_service h2 {
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	text-transform: uppercase;
	color: #001239;
	margin-bottom: 20px;
	font-family: "Roboto", sans-serif;
	font-weight: 500;
}

.additional_service p {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin-bottom: 12px;
}

.additional_service p:last-of-type {
	margin-bottom: 0;
}

.price div {
	display: block;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin: 2vw 0;
	
}


.price div p {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin: 0;
}

.sum_up__value {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;
}

.sum_up__value h4 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	text-transform: uppercase;
	color: #ff7f51;
	margin: 0;
}

.sum_up__short {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 0.833vw; /* 12px */
	line-height: 0.972vw; /* 14px; */
	color: rgba(0, 18, 57, 0.5);
	margin-bottom: 20px !important;
}

.sum_up__short span {
	text-decoration: underline;
	color: #00b1bb;
	cursor: pointer;
}

.sum_up__short input {
	transform: translateY(4px);
}

.sum_up button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 56px;
	background: #ff7f51;
	border-radius: 4px;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	color: #ffffff;
	text-transform: none;
	letter-spacing: normal;
}
.v-input__slot{
  min-height: 45px !important;
}
.v-input__icon{
  height: 10px !important;
}
.sum_up button svg {
	margin-right: 10px;
}

.close {
	position: absolute;
	top: 24px;
	right: 24px;
	cursor: pointer;
}

.services_pop {
	position: relative;
	padding: 52px 50px 49px 50px;
	background: #ffffff;
	border-radius: 5px;
}

.services_pop h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.805vw; /* 26px */
	line-height: 2.083vw; /* 30px; */
	color: #001239;
	margin-bottom: 28px;
}

.services_pop .single_service {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	border-bottom: 1px solid #e9e9e9;
	margin-bottom: 16px;
}

.services_pop .single_service:last-of-type {
	margin-bottom: 0;
}

.services_pop__title h3 {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.388vw; /* 20px */
	line-height: 1.59vw; /* 23px; */
	color: #001239;
	margin-bottom: 6px;
}

.services_pop__title p {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 0.972vw; /* 14px */
	line-height: 1.11vw; /* 16px; */
	color: rgba(0, 18, 57, 0.3);
}

.services_pop .actions {
	display: grid;
	grid-template-columns: 1fr 90px 140px;
	grid-column-gap: 20px;
	align-items: center;
	justify-content: end;
}

.services_pop .actions__price h1 {
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-size: 1.388vw; /* 20px */
	line-height: 1.59vw; /* 23px; */
	text-align: right;
	color: #ff7f51;
	margin-bottom: 4px;
}

.services_pop .actions__price h5 {
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #bab8b8;
	margin: 0;
}

.services_pop .actions__count {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.services_pop .actions__count img {
	cursor: pointer;
}

.services_pop .actions__count p {
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-size: 1.388vw; /* 20px */
	line-height: 1.59vw; /* 23px; */
	color: #001239;
	margin: 0 !important;
}

.services_pop .actions button {
	border: 1px solid #ff7f51;
	box-sizing: border-box;
	filter: drop-shadow(0px 10px 20px rgba(82, 177, 186, 0.25));
	border-radius: 5px;
	height: 44px;
	width: 100%;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #fff;
	text-transform: none;
	letter-spacing: normal;
}

.change_time {
	position: relative;
	padding: 54px 50px 30px 50px;
	background: #ffffff;
	border-radius: 5px;
}

.change_time h1 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.805vw; /* 26px */
	line-height: 2.083vw; /* 30px; */
	color: #001239;
	margin-bottom: 20px;
}

.change_time p {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	opacity: 0.5;
	margin-bottom: 30px;
}

.change_time label {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin-bottom: 6px;
}

.change_time input {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	width: 100%;
	height: 50px;
	padding-left: 20px;
	border: 1px solid #bbc2d0;
	border-radius: 4px;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #001239;
	margin-bottom: 20px;
}

.change_time input:last-of-type {
	margin-bottom: 0;
}

.change_time button {
	margin-top: 30px;
	background: #ff7f51;
	border-radius: 4px;
	font-size: 1.11vw; /* 16px */
	line-height: 1.31vw; /* 19px; */
	color: #ffffff;
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	transition: 0.22s;
	width: 100%;
	height: 56px;
}

.change_time button:hover {
	color: #ff7f51;
	background: #fff;
}

.partial_payment h2 {
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	font-size: 1.6666vw; /* 24px */
	line-height: 1.944vw; /* 28px; */
	color: #ff7f51;
}

.partial_payment p {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-size: 0.833vw; /* 12px */
	line-height: 0.972vw; /* 14px; */
	color: #001239;
	margin-top: 6px !important;
	margin-bottom: 0 !important;
}

.box_links {
	color: #00b1bb !important;
}

@media all and (max-width: 768px) {
	.main_card{
		top: -15vh;
	}
	.main_box_1 {
		padding-bottom: 120px;
	}
	.main_box_2{
		margin-left: 0vw;
    width: 100vw !important;
    padding: 2.5vw;
	}

	.text--white {
		display: none;
	}
	.box__title {
		font-size: 16px;
		line-height: 19px;
	}
	.box__header .descr__type {
		font-size: 16px;
		line-height: 19px;
	}
	.box__header .descr__title {
		font-size: 16px;
		line-height: 19px;
	}
	.box__header .descr__loc {
		font-size: 16px;
		line-height: 19px;
	}
	.box__header .descr__name{
		font-size: 16px;
		line-height: 19px;
	}
	.dates p{
		font-size: 16px;
		line-height: 19px;
	}
	.time p{
		font-size: 16px;
		line-height: 19px;
	}
	.price div p{
		font-size: 16px;
		line-height: 19px;
	}
	.sum_up__value h4{
		font-size: 16px;
		line-height: 19px;
	}
	.partial_payment h2 {
		font-size: 24px;
		line-height: 28px;
	}
	.partial_payment p {
		font-size: 12px;
		line-height: 14px;
	}
	.sum_up__short{
		font-size: 12px;
		line-height: 14px;	
	}
	.main_box_2 .price div{
		display: flex;
	}
	.additional_service h2 {
		font-size: 16px;
		line-height: 19px;
	}
	.additional_service p {
		font-size: 16px;
		line-height: 19px;
	}



}



</style>

