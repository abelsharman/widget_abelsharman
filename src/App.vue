<template>
  <div id="app" class="widget" @click="clickWidget">
    <v-app class="app_1" v-if="width > 768" style="background: #e7ecef !important ; border-radius: 10px !important ; padding: 5vw 10% !important ; width: 100% !important ;height: 40vh !important ; overflow-y: scroll !important ; display: inline-block !important ;" :style="[ resultCheck || checkForm ? { 'height': '80vh', 'background-color': background }: { 'height': '40vh', 'background-color': background }]">

      <div style="display: flex !important ;position: relative !important ;transition:0.5s all ease !important ;" :style="[ width > 768 && resultCheck || checkForm ? { 'left': '-3%' }: { 'left': '0%' }]">
        <div style="width: 35vw !important ; display: flex !important ;transition: 0.5s all ease !important ;" :style="[ width > 768 && resultCheck || checkForm ? { 'width': '30vw' }: { 'width': '35vw' }]">
      
          <v-main style="width: 100% !important ;">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
              :nudge-top="22">


              <template v-slot:activator="{ on, attrs }">

              <v-text-field
                hide-details
                background-color="white"
                v-model="dateRangeText"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                solo
                class="widget_datepicker"
                style="border-left: 1px solid #d1d1d1 !important ; width: 100% !important ;">
              </v-text-field>

              </template>

              <v-date-picker
                v-show="isRange == 'range'"
                :first-day-of-week="1"
                :allowed-dates="allowedDates"
                range
                v-model="filter.dates"
                no-title
                scrollable
                class="widget_date_picker"
                style="margin: 0 !important ;"
                @input="closeModal">
              </v-date-picker>


            </v-menu>










          </v-main>
        </div>


        <div id="widget_form" class="widget_form" :style="[ width > 768 && resultCheck || checkForm ? { 'width': '30vw', 'marginLeft': '0.5vw' }: { 'width': '35vw', 'marginLeft': '1vw' }]">
          <img id="widget_form_img" style="margin-left: 1.5vw !important ;vertical-align: inherit;" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/user.png" alt="user"> 
          <span id="widget_form_span" style="margin-left: 0.5vw !important ;" :style="pTextColor">{{ adult_count }} взрослых, {{ children_count }} детей</span>
        </div>

      </div>



      <div id="widget_people" class="widget_people" style="width: 40% !important ;position: absolute !important ;background-color: white !important ;left: 51% !important ;top:39px !important ;animation: appearBlock 0.5s !important ; border-radius: 5px !important ; padding-left: 20px !important ; padding-top: 10px !important ; display: none !important ;">
        <p :style="pTextColor">Взрослых 
          <svg :style="svgAccentColor"  @click="parentMinus" id="widget_people_1" style="cursor: pointer !important ;margin-left: 11px !important ;vertical-align: top !important ;width: 24px !important ;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg> 
            <span style="margin-left: 11px !important ;">{{ adult_count }} </span> 
          <svg :style="svgAccentColor" @click="parentPlus" id="widget_people_2" style="margin-left: 10px !important ;vertical-align: top !important ;width: 24px !important ; cursor: pointer !important ;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
        </p>
        <p :style="pTextColor">Детей 
          <svg :style="svgAccentColor"  @click="childMinus" id="widget_people_3" style="cursor: pointer !important ;margin-left: 11px !important ;vertical-align: top !important ;width: 24px !important ;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg> 
            <span style="margin-left: 11px !important ;">{{ children_count }}</span>  
          <svg :style="svgAccentColor" @click="childPlus" id="widget_people_4" style="margin-left: 10px !important ;vertical-align: top !important ;width: 24px !important ; cursor: pointer !important ;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
        </p>
      </div>



      <div class="text-center" v-show="width > 768" style="margin-top: 13vh !important ; position: relative !important ; transition: 0.5s all ease !important ;left: 94% !important ; width: 10vw !important ;" :style="[ resultCheck || checkForm && width > 768 ? { 'marginTop': '0vh', 'top': '-50px', 'left': '91%' }: { 'marginTop': '13vh', 'top': '0px', 'left': '43%'  }]">
        <v-btn
          class="widget_button_primary_color"
          x-large
          color="primary"
          @click="goFromWidget"
          :style="btnPrimary"
          dark>
          Искать
        </v-btn>
      </div>


      <div class="text-center" v-show="width <= 768" style="margin-top: 13vh !important ; position: relative !important ; transition: 0.5s all ease !important ;left: 94% !important ; width: 10vw !important ;" :style="[ resultCheck || checkForm ? { 'marginTop': '0vh', 'top': '-50px', 'left': '75%' }: { 'marginTop': '13vh', 'top': '0px', 'left': '35%'  }]">
        <v-btn
          class="widget_button_primary_color"
          style="width: 25vw !important ;"
          color="primary"
          @click="goFromWidget"
          dark>
          Искать
        </v-btn>
      </div>






      <div v-show="resultCheck">
        <div v-for="(item, index) in results" :key="index" id="categories" class="boxes">
          <AccBox
            v-show="item.room_count"
            class="web_acc_box"
            :item="item"
            :index="index"
            :currentindex="currentIndex"
            @change-form='changeForm'
            @toggle='toggleOrderCard($event)'
            @set-active="setActive"
          />

          <MobileAccBox
            style="background-color: black !important ;"
            class="mobile_acc_box"
            v-show="item.room_count"
            :item="item"
            :index="index"
            :currentindex="currentIndex"
            @change-form='changeForm'
            @toggle='toggleOrderCard($event)'
            @set-active="setActive"
          />

        </div>
      </div>




      <v-container class="main_card" v-show="checkForm" style="background-color: white !important ;width: 110% !important ;position: relative !important ;left: -5% !important ;padding: 2% 5% !important ;">
        <AccForm
          ref="accform"
          :submitaccbtnloading="submitAccBtnloading"
          :accomodationsubmit="accomodationSubmit"
          :ordercard="orderCard"
          @change-form='changeForm'
          @success="success"
        />


        <SideBox
          :accomodationsubmit="accomodationSubmit"
          @refresh-page="refreshPage"
          @toggle='toggleOrderCard($event)'
          :ordercard="orderCard"
          :submitaccbtnloading="submitAccBtnloading"
        />

      </v-container>


    </v-app>


    <v-app class="app_1" v-if="width <= 768" style="transition: all 0.5s ease !important ;background: #e7ecef !important ; border-radius: 10px !important ; padding: 5vw 10% !important ; width: 100% !important ;height: 40vh !important ; overflow-y: scroll !important ; display: inline-block !important ;" :style="[ resultCheck || checkForm ? { 'height': '90vh', 'padding': '5vw 2%', 'background-color': background }: { 'height': '40vh', 'padding': '5vw 10%', 'background-color': background }]">

      <div style="display: flex !important ;position: relative !important ;">
        <div style="width: 35vw !important ; display: flex !important ;transition: 0.5s all ease !important ;" :style="[ width > 768 && resultCheck || checkForm ? { 'width': '37vw' }: { 'width': '37vw' }]">
      
          <v-main style="width: 100% !important ;">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
              :nudge-top="22">


              <template v-slot:activator="{ on, attrs }">

              <v-text-field
                hide-details
                background-color="white"
                v-model="dateRangeText"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                solo
                class="widget_datepicker"
                style="border-left: 1px solid #d1d1d1 !important ; width: 100% !important ; font-size: 2.61vw  !important ;">
              </v-text-field>

              </template>

              <v-date-picker
                v-show="isRange == 'range'"
                :first-day-of-week="1"
                :allowed-dates="allowedDates"
                range
                v-model="filter.dates"
                no-title
                scrollable
                style="margin: 0 !important ;"
                @input="closeModal">
              </v-date-picker>


            </v-menu>










          </v-main>
        </div>


        <div id="widget_form" class="widget_form" :style="[ width > 768 && resultCheck || checkForm ? { 'width': '33vw', 'marginLeft': '0.5vw' }: { 'width': '33vw', 'marginLeft': '1vw' }]">
          <img id="widget_form_img" style="margin-left: 1.5vw !important ;vertical-align: inherit;;width: 3.5vw !important ;" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/user.png" alt="user"> 
          <span id="widget_form_span" style="margin-left: 0.5vw !important ;" :style="pTextColor">{{ adult_count }} взрослых, {{ children_count }} детей</span>
        </div>

      </div>


      <div id="widget_people" class="widget_people" style="display: none !important ;width: 50vw !important ;position: absolute !important ;background-color: white !important ;left: 45% !important ;top: 39px !important ;animation: appearBlock 0.5s !important ; border-radius: 5px !important ; padding-left: 20px !important ; padding-top: 10px !important ; font-size: 2.9vw !important ;">
        <p :style="pTextColor">Взрослых 
          <svg :style="svgAccentColor"  @click="parentMinus" id="widget_people_1" style="cursor: pointer !important ;margin-left: 11px !important ;vertical-align: top !important ;width: 24px !important ;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg> 
            <span style="margin-left: 11px !important ;">{{ adult_count }} </span> 
          <svg :style="svgAccentColor" @click="parentPlus" id="widget_people_2" style="margin-left: 10px !important ;vertical-align: top !important ;width: 24px !important ; cursor: pointer !important ;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
        </p>
        <p :style="pTextColor">Детей 
          <svg :style="svgAccentColor"  @click="childMinus" id="widget_people_3" style="cursor: pointer !important ;margin-left: 11px !important ;vertical-align: top !important ;width: 24px !important ;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg> 
            <span style="margin-left: 11px !important ;">{{ children_count }}</span>  
          <svg :style="svgAccentColor" @click="childPlus" id="widget_people_4" style="margin-left: 10px !important ;vertical-align: top !important ;width: 24px !important ; cursor: pointer !important ;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
        </p>
      </div>


      <div class="text-center" style="margin-top: 13vh !important ; position: relative !important ; transition: 0.5s all ease !important ;left: 94% !important ; width: 10vw !important ;" :style="[ resultCheck || checkForm ? { 'marginTop': '0vh', 'top': '-39px', 'left': '75%' }: { 'marginTop': '13vh', 'top': '0px', 'left': '35%'  }]">
        <v-btn
          class="widget_button_primary_color"
          style="width: 25vw !important ;"
          color="primary"
          :style="btnPrimary"
          @click="goFromWidget"
          dark>
          Искать
        </v-btn>
      </div>






      <div v-show="resultCheck">
        <div v-for="(item, index) in results" :key="index" id="categories" class="boxes">
          <AccBox
            v-show="item.room_count"
            class="web_acc_box"
            :item="item"
            :index="index"
            :currentindex="currentIndex"
            @change-form='changeForm'
            @toggle='toggleOrderCard($event)'
            @set-active="setActive"
          />

          <MobileAccBox
            style="background-color: black !important ;"
            class="mobile_acc_box"
            v-show="item.room_count"
            :item="item"
            :index="index"
            :currentindex="currentIndex"
            @change-form='changeForm'
            @toggle='toggleOrderCard($event)'
            @set-active="setActive"
          />

        </div>
      </div>




      <v-container class="main_card" v-show="checkForm" style="background-color: rgb(231, 236, 239) !important ;width: 110% !important ;position: relative !important ;left: -5% !important ;padding: 2% 5% !important ;" :style="divBackground">
        <AccForm
          ref="accform"
          :style="divBackground"
          :submitaccbtnloading="submitAccBtnloading"
          :accomodationsubmit="accomodationSubmit"
          :ordercard="orderCard"
          @change-form='changeForm'
          @change-detail='toggleDetailCard'
          @success="success"
        />
        
        <v-dialog v-model="detailCard" fullscreen hide-overlay>
          <img src="https://marketbot.abelsharman.kz/widget_go2trip/assets/close.png" @click="toggleDetailCard" class="closeMobileCard">
          <SideBox
            :accomodationsubmit="accomodationSubmit"
            @refresh-page="refreshPage"
            :ordercard="orderCard"
            :submitaccbtnloading="submitAccBtnloading"
          />
        </v-dialog>

      </v-container>


    </v-app>

    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
import axios from 'axios'
import Vuetify from "vuetify"
import AccBox from "@/components/acc-box.vue"
import AccForm from "@/components/acc-form.vue"
import SideBox from "@/components/side-box.vue"
import MobileAccBox from "@/components/mobile-acc-box.vue"


export default {
  name: 'App',
  components:{
	AccBox,
	AccForm,
	SideBox,
	MobileAccBox
  },
  vuetify: new Vuetify(),
  data() {
    return{
          menu: false,
          filter: {
              dates: [
                new Date().toISOString().substr(0, 10),
                new Date().toISOString().substr(0, 10)
              ],
              checkout_time: new Date().toISOString().substr(0, 10),
              adult_count: 1,
              children_count: 0
          },
          luckyDate: new Date().toISOString().substr(0, 10),
          tabModel: 0,
          getCurrentType: 2,
          directionState: "twoway",
          childrenAge: 7, 
          leisureTypes: [],
          adult_count: 1,
          children_count: 0,
          homePage: false,
          currentIndex: 0,
          results: [],
          resultCheck: false,
          submitAccBtnloading: {
            ready: false
          },  
          checkForm: false, 
          orderCard: [],
          width: window.innerWidth, 
          detailCard: false,
          accent_color: localStorage.getItem("accent"),
          background: localStorage.getItem("background"),
          primary_1: localStorage.getItem("primary"),
          text_button: localStorage.getItem("text_button"),
			text: localStorage.getItem("text")
          }
        },
        mounted(){
		
            this.$vuetify.lang.current = 'ru'
            if(!localStorage.getItem("orders")){
              let datas = []  ;
              localStorage.setItem("orders", JSON.stringify(datas))  ;
            }

            
            


        },
        computed:{
			pTextColor(){
				return {
              "color": this.text + " !important",
            }
			},
          divBackground(){
            return {
              "background-color": this.background + " !important",
            }
          },
          btnPrimary(){
            return {
              "background-color": this.primary_1 + " !important",
              "color": this.text_button + " !important"
            }
          },
          svgAccentColor(){
            return {
              "fill": this.accent_color + " !important",
            }
          },
          dateRangeText() {
            if (this.isRange == "range") {
              if (this.filter.dates) {
                return `${moment(this.filter.dates[0]).format(
                  "DD-MMM YYYY"
                )} - ${moment(this.filter.dates[1]).format("DD-MMM YYYY")}` ;
              }
            } else if (this.isRange == "lucky") {
              if (this.tabModel) {
                if (Array.isArray(this.luckyDate)) {
                  let from = moment(this.luckyDate[0]).format("DD-MMM YYYY")  ;
                  let to = moment(this.luckyDate[1]).format("DD-MMM YYYY")  ;
                  return `${from} - ${to}`  ;
                }
              } else {
                return moment(this.luckyDate).format("DD-MMM YYYY")  ;
              }
            } else {
              return moment(this.filter.checkout_time).format("DD-MMM YYYY")  ;
            }
            return `${moment(this.filter.dates[0]).format(
                  "DD-MMM YYYY"
                )} - ${moment(this.filter.dates[1]).format("DD-MMM YYYY")}`  ;
          },
          isRange() {
            if (this.getCurrentType) {
              if (
                this.getCurrentType == 2 ||
                this.getCurrentType == 3 ||
                (this.getCurrentType == 7 && this.directionState == "twoway") ||
                (this.getCurrentType == 8 && this.directionState == "twoway")
              ) {
                return "range"  ;
              } else if (this.getCurrentType == 1) {
                return "lucky"  ;
              } else {
                return "single"  ;
              }
            }
            return "range"  ;
          },
        },
        methods: {
          toggleDetailCard(){
            this.detailCard = !this.detailCard
          },
          toggleOrderCard(x){
            this.orderCard = x  ;
            console.log(this.orderCard, this.orderCard.length)
          },
          refreshPage() {
            location.reload()  ;
          },
          changeForm(){
            this.checkForm = !this.checkForm
            this.resultCheck = !this.resultCheck
          },
          success() {
            this.dialog = true  ;
          },
          accomodationSubmit() {
            this.$refs.accform.sendData()  ;
          },
          setActive(idx) {
            this.currentIndex = idx  ;
          },
          goFromWidget(){
            localStorage.setItem("adult_count", this.adult_count)
            localStorage.setItem("children_count", this.children_count)
            localStorage.setItem("date_form", this.filter.dates[0])
            localStorage.setItem("date_to", this.filter.dates[1])
            let id = localStorage.getItem("id_company")
            //console.log(localStorage.adult_count, localStorage.children_count, localStorage.date_form, localStorage.date_to)
            // https://app.easybook.kz/api/go2trip/v2/accommodation/zone/categories/4/?start=2021-06-10&end=2021-06-11&count=1&child_count=0&type=2&id=4&directions=2&page[number]=1&page[size]=5/api/go2trip/v2/accommodation/zone/categories/4/?start=2021-06-10&end=2021-06-11&count=1&child_count=0&type=2&id=4&directions=2&page[number]=1&page[size]=5
            axios.get("https://app.easybook.kz/api/booking-module/categories/"+id+"/?start="+this.filter.dates[0]+"&end="+this.filter.dates[1]+"&count="+this.adult_count+"&child_count="+this.children_count+"&page[number]=1&page[size]=10&type=2&id=NA&directions=2")
            .then(res => {
              if(res){
				if(res.data.length > 0){
					this.results = res.data  ;
                    this.resultCheck = true  ;
                    this.checkForm = false  ;

				}
				else{
					alert("Нет свободных номеров. Пожалуйста выберите другие даты.")
				}
              }
              else{
                console.log("error on fetching lists of rooms")
              }
            })  ;
          },
          clickWidget(event){
            let widget = document.querySelector("#widget_people").style.display  ;
            if(event.target.id == "widget_form" || event.target.id == "widget_form_span" || event.target.id == "widget_form_img"){
              if(widget == "block"){
                document.querySelector("#widget_people").style.display = "none"  ;
              }
              else{
                document.querySelector("#widget_people").style.display = "block"  ;
              }
            }
            else if(event.target.id != "widget_people_2" && event.target.id != "widget_people_3" && event.target.id != "widget_people_4" && event.target.id != "widget_people_1"){
              if(widget == "block"){
                document.querySelector("#widget_people").style.display = "none"  ;
              }
            }
          },
          parentMinus(){
            if(this.adult_count != 1) {this.adult_count--}
          },
          parentPlus(){
            this.adult_count++
          },
          childMinus(){
            if(this.children_count != 0) {this.children_count--}
          },
          childPlus(){
            this.children_count++
          },
          closeModal() {
              if (this.filter.dates.length == 2) {
                  this.menu = false
              }
          },
          allowedDates: val => val >= new Date().toISOString().substr(0, 10),
        },
        watch: {
          tabModel() {
            if (this.tabModel) {
              this.luckyDate &&= this.luckyDate[0]  ;
            } else {
              this.luckyDate = ""  ;
            }
          },
          menu() {
            if (this.isRange == "range") {
              if (this.filter.dates[0] > this.filter.dates[1]) {
                this.filter.dates.reverse()  ;
              }
            } else if (this.isRange == "lucky" && this.menu == false) {
              if (this.luckyDate.length) {
                this.filter.dates = this.luckyDate  ;
              } else {
                this.filter.date = this.luckyDate  ;
              }
            }
          }
        },
}
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

#app th, td{
	border: 0px;
}
button{
	padding: 0px !important;
}
th, td{
	border: 0px !important;
	padding: 0px !important;
}
.widget th, td, button{
	padding: 0px !important;
}
.v-date-picker-table .v-btn{
	padding: 0px !important;
}
.v-date-picker-table td, .v-date-picker-table th{
	border: 0px !important;
	padding: 0px !important;
}
#app .v-application .primary {
    background-color: transparent  !important ;
    border-color: transparent  !important ;
}
.widget{
    position: relative !important ;
    background: #e7ecef  !important ;
    color: rgba(61,61,61,.8) !important ;
    margin: 5vw 0 !important ;
    width: 80vw !important ;
    display: inline-block !important ;
    font-family: "Roboto",sans-serif !important ;
    text-align: left !important ;
}
.widget_form{
	width: 35vw !important ; 
	transition: 0.5s all ease !important ; 
	margin-left: 1vw !important ;
	background-color:white !important ;
	display: inline-block !important ;
	cursor: pointer !important ; 
	box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12) !important ; 
	border-radius: 3px !important ;
}
.widget_form img{
	margin-top: 11px
}
.widget_form span{
	position: relative !important ; 
	top: -3px !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	color: #001239 !important ; 
}





#app .v-application p{
  margin-bottom: 0px !important ;
}

.widget p{
  margin-bottom: 0px !important ;
}


#app{
  text-align: left !important ;
}

.active_tab {
  background: #ff7f51 !important ;
}

.luckyDateBtns {
  width: 100% !important ;
  display: flex !important ;
  flex-direction: column !important ;
  align-items: center !important ;
  justify-content: flex-start !important ;
}





@keyframes appearBlock {
  from {opacity: 0 !important ;}
  to {opacity: 1 !important ;}
}

.widget_datepicker div div{
  display: flex  !important ;
}

.boxes{
  margin: 10px 0 !important ;
}




.web_acc_box .mobile_header {
	display: block !important ;
	position: fixed !important ;
	display: flex !important ;
	align-items: center !important ;
	justify-content: center !important ;
	top: 0 !important ;
	left: 0 !important ;
	right: 0 !important ;
	width: 100% !important ;
	height: 44px !important ;
	z-index: 1002 !important ;
	background: #fff !important ;
}

.web_acc_box .mobile_header img {
	position: absolute !important ;
	left: 16px !important ;
	top: 12px !important ;
}

.web_acc_box .mobile_header p {
	font-family: SFsemibold !important ;
	text-align: center !important ;
	font-size: 1.180vw !important ; /* 17px */
	line-height: 1.388vw !important ; /* 20px !important ; */
	color: #001239 !important ;
	margin-bottom: 0  !important ;
}

.web_acc_box .book_room_btn {
	display: none !important ;
}

.web_acc_box .main_box {
	height: auto !important ;
	padding: 25px !important ;
	margin-bottom: 20px !important ;
	background: #ffffff !important ;
	box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1) !important ;
	border-radius: 4px !important ;
}

.web_acc_box .main_box:last-of-type {
	margin-bottom: 0 !important ;
}

.web_acc_box .visible {
	display: grid !important ;
	grid-template-columns: 10vw 1fr !important ;
	grid-column-gap: 1vw !important ;
	align-items: start !important ;
}

.web_acc_box .visible .avatar {
	background-image: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png") ;
	cursor: pointer !important ;
	background-size: cover !important ;
	background-position: center center !important ;
	height: 178px !important ;
	display: flex !important ;
	align-items: flex-end !important ;
	justify-content: flex-end !important ;
	padding: 10px !important ;
	border-radius: 4px !important ;
}

.web_acc_box .visible .avatar__count {
	padding: 4px 7px !important ;
	background: rgba(0, 0, 0, 0.5) !important ;
	border-radius: 4px !important ;
	display: flex !important ;
	align-items: center !important ;
	justify-content: center !important ;
}

.web_acc_box .visible .avatar__count p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 700 !important ;
	font-size: 0.8333vw !important ; /*12px !important ;*/
	line-height: 0.97vw !important ; /*14px !important ;*/
	color: #ffffff !important ;
	margin: 0 !important ;
}

.web_acc_box .visible .description {
	display: grid !important ;
	grid-template-columns: 24vw 11vw 11vw !important ;
	grid-column-gap: 1vw !important ;
}

.web_acc_box .visible .description .titles .tags_list {
	display: flex !important ;
	align-items: center !important ;
	flex-wrap: wrap !important ;
	margin: 12px 0px !important ;
	padding-left: 0px !important ;
}

.web_acc_box .visible .description .titles .tags_list p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	color: #000000 !important ;
	margin-right: 19px !important ;
	position: relative !important ;
}



.web_acc_box .visible .description .titles h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
  font-size: 1.52777vw !important ; /* 22px */
	line-height: 1.805vw !important ; /*26px !important ;*/
	color: #001239 !important ;
	margin-bottom: 12px !important ;
}

.web_acc_box .visible .description .titles__main {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	color: #000000 !important ;
	margin-bottom: 12px !important ;
	display: block !important ;
      /* Fallback for non-webkit */
	display: -webkit-box !important ;
	-webkit-line-clamp: 5 !important ;
	-webkit-box-orient: vertical !important ;
	overflow: hidden !important ;
	text-overflow: ellipsis !important ;
}

.web_acc_box .visible .description .titles .additional {
	display: flex !important ;
	align-items: center !important ;
	justify-content: flex-start !important ;
}

.web_acc_box .visible .description .titles .additional h4 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	color: #ff7f51 !important ;
	margin-bottom: 0 !important ;
	margin-right: 16px !important ;
}

.web_acc_box .visible .description .titles .additional button {
	width: 149px !important ;
	height: 40px !important ;
	border: 1px solid #ff7f51 !important ;
	background: #ff7f51 !important ;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1) !important ;
	border-radius: 4px !important ;
	transition: 0.22s !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	color: #ffffff !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	display: flex !important ;
	align-items: center !important ;
	justify-content: center !important ;
}

.web_acc_box .visible .description .titles .additional button svg {
	margin-right: 10px !important ;
}

.web_acc_box .visible .description .titles .additional button:hover {
	background: #fff !important ;
	color: #ff7f51 !important ;
}

.web_acc_box .visible .description .titles .additional button:hover svg path {
	fill: #ff7f51 !important ;
}

.web_acc_box .visible .description .price {
	text-align: center !important ;
	padding-top: 52px !important ;
}

.web_acc_box .visible .description .price h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.52777vw !important ; /* 22px */
	line-height: 1.80vw !important ; /*26px !important ;*/
	color: #001239 !important ;
	margin-bottom: 6px !important ;
}

.web_acc_box .visible .description .price p {
	font-size: 0.8333vw !important ; /*12px !important ;*/
	line-height: 0.97vw !important ; /*14px !important ;*/
	color: #021011 !important ;
	margin: 0 !important ;
}

.web_acc_box .visible .description .actions {
	display: flex !important ;
	flex-direction: column !important ;
	align-items: center !important ;
	justify-content: flex-start !important ;
	padding-top: 21px !important ;
}

.web_acc_box .visible .description .actions h4 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.01vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	color: #00b1bb !important ;
}

.web_acc_box .visible .description .actions p {
	display: grid !important ;
	grid-template-columns: 25px 18px 25px !important ;
	grid-column-gap: 10px !important ;
	align-items: center !important ;
	text-align: center !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 700 !important ;
	font-size: 1.38vw !important ; /*20px !important ;*/
	line-height: 1.66vw !important ; /*24px !important ;*/
	color: #001239 !important ;
	margin-bottom: 10px !important ;
	padding: 10px 0px !important ;
}

.web_acc_box .visible .description .actions p img {
	cursor: pointer !important ;
}

.web_acc_box .visible .description .actions button {
	width: 160px !important ;
	height: 44px !important ;
	background: #ff7f51 !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	color: #ffffff !important ;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1) !important ;
	border-radius: 4px !important ;
	transition: 0.22s !important ;
	border: 1px solid #ff7f51 !important ;
}

.web_acc_box .visible .description .actions button:hover {
	background: #fff !important ;
	color: #ff7f51 !important ;
}

.web_acc_box .hidden {
	padding-top: 25px !important ;
	border-top: 1px solid #d7dddd !important ;
	margin-top: 24px !important ;
}

.web_acc_box .hidden h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	text-transform: uppercase !important ;
	color: #021011 !important ;
	margin-bottom: 26px !important ;
}

.web_acc_box .hidden .additional_counter {
	display: grid !important ;
	grid-template-columns: repeat(2, 1fr) !important ;
	width: 100% !important ;
}

.web_acc_box .hidden .additional_counter__single {
	display: flex !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
	width: 300px !important ;
}

.web_acc_box .hidden .additional_counter__single h3 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	color: #021011 !important ;
	margin: 0 !important ;
}

.web_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /*16px !important ;*/
	line-height: 1.3194vw !important ; /*19px !important ;*/
	color: #021011 !important ;
	margin-bottom: 6px !important ;
}

.web_acc_box .hidden .additional_counter__single .people_age h5 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 0.833vw !important ; /*12px !important ;*/
	line-height: 0.97vw !important ; /*14px !important ;*/
	color: #cfd7e3 !important ;
	margin: 0 !important ;
}

.web_acc_box .hidden .additional_counter__single .actions {
	display: flex !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
	gap: 5px !important ;
	width: 80px !important ;
}

.web_acc_box .hidden .additional_counter__single .actions p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	margin: 0  !important ;
	font-size: 0.97vw !important ; /*14px !important ;*/
	line-height: 1.11vw !important ; /*16px !important ;*/
	color: #021011 !important ;
}

.web_acc_box .hidden .additional_counter__single .actions img {
	cursor: pointer !important ;
}

.web_acc_box .activeBtn {
	background: #fff  !important ;
	color: #ff7f51  !important ;
}

.web_acc_box .activeBtn svg path {
	fill: #ff7f51  !important ;
}

.web_acc_box .hidden-leave {
	position: absolute !important ;
	opacity: 0 !important ;
	display: none !important ;
}
.web_acc_box .room_left {
	position: absolute !important ;
	top: 14px !important ;
	left: 16px !important ;
	background: #FF7F51 !important ;
	border-radius: 4px !important ;
	padding: 6px !important ;
}
.web_acc_box .room_left	h3 {
	font-family: SFsemibold !important ;
	font-size: 10px !important ;
	line-height: 12px !important ;
	color: #FFFFFF !important ;	
}
  
.web_acc_box {
	display: unset  !important ;
}
.mobile_acc_box {
	display: none  !important ;
}
@media all and (max-width: 768px) {
	.widget_form{
		width: 35vw !important ; 
		transition: 0.5s all ease !important ; 
		margin-left: 1vw !important ;
		background-color:white !important ;
		display: inline-block !important ;
		cursor: pointer !important ; 
		box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12) !important ; 
		border-radius: 3px !important ;
	}
	.widget_form img{
		margin-top: 14px
	}
	.widget_form span{
		position: relative !important ; 
		top: -3px !important ;
		font-weight: 400 !important ;
		font-size: 2.61vw !important ; 
		line-height: 1.3194vw !important ; /*19px !important ;*/
		color: #001239 !important ; 
	}
	
	.widget{
		margin: 5vw 0vw !important ;
		width: 100vw !important ;
	}
	.mobile_acc_box {
		display: unset  !important ;
	}
	.web_acc_box {
		display: none  !important ;
	}
	.web_acc_box .main_box {
		width: 100% !important ;
		min-height: 402px !important ;
		overflow-x: hidden !important ;
		overflow-y: hidden !important ;
		height: auto !important ;
		padding: 0 !important ;
		box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1) !important ;
		margin-top: 8px !important ;
	}

	.web_acc_box .visible {
		display: block !important ;
		grid-template-columns: unset !important ;
		grid-column-gap: unset !important ;
		align-items: start !important ;
	}

	.web_acc_box .visible .avatar {
		height: 151px !important ;
		padding: 12px !important ;
		border-radius: 4px 4px 0px 0px !important ;
		margin-bottom: 12px !important ;
	}

	.web_acc_box .visible .description {
		display: block !important ;
		grid-template-columns: 464px 139px 1fr !important ;
		grid-column-gap: 32px !important ;
	}

	.web_acc_box .visible .description .titles .tags_list {
		display: flex !important ;
		align-items: center !important ;
		flex-wrap: wrap !important ;
		margin: 12px 0px !important ;
		padding-left: 12px !important ;
	}

	.web_acc_box .visible .description .titles .tags_list p {
		font-size: 1.041vw !important ; /* 15px */
		line-height: 1.25vw !important ; /* 18px !important ; */
		color: rgba(0, 18, 57, 0.5) !important ;
		margin-right: 19px !important ;
	}

	

	.web_acc_box .visible .description .titles h2 {
		font-size: 1.180vw !important ; /* 17px */
		line-height: 1.388vw !important ; /* 20px !important ; */
		margin-bottom: 12px !important ;
	}

	.web_acc_box .visible .description .titles__main {
		font-size: 1.041vw !important ; /* 15px */
		line-height: 1.25vw !important ; /* 18px !important ; */
		-webkit-line-clamp: 4 !important ;
	}

	.web_acc_box .visible .description .titles .additional {
		display: flex !important ;
		align-items: center !important ;
		justify-content: flex-start !important ;
	}

	.web_acc_box .visible .description .titles .additional h4 {
		font-size: 0.833vw !important ; /* 12px */
		line-height: 0.972vw !important ; /* 14px !important ; */
		margin-bottom: 0 !important ;
		margin-right: 16px !important ;
	}

	.web_acc_box .visible .description .titles .additional button {
		width: 149px !important ;
		font-size: 1.041vw !important ; /* 15px */
		line-height: 1.25vw !important ; /* 18px !important ; */
	}

	.web_acc_box .visible .description .price {
		text-align: left !important ;
		padding-top: 12px !important ;
	}

	.web_acc_box .visible .description .price h2 {
		font-size: 1.180vw !important ; /* 17px */
		line-height: 1.388vw !important ; /* 20px !important ; */
	}

	.web_acc_box .visible .description .price p {
		font-size: 0.833vw !important ; /* 12px */
		line-height: 0.972vw !important ; /* 14px !important ; */
	}

	.web_acc_box .visible .description .actions {
		flex-direction: row !important ;
		padding-top: 12px !important ;
	}

	.web_acc_box .visible .description .actions h4 {
		font-size: 0.833vw !important ; /* 12px */
		line-height: 0.972vw !important ; /* 14px !important ; */
		width: 78px !important ;
	}

	.web_acc_box .visible .description .actions p {
		grid-template-columns: 20px 18px 20px !important ;
		grid-column-gap: 6px !important ;
		font-size: 0.833vw !important ; /* 12px */
		line-height: 0.972vw !important ; /* 14px !important ; */
		padding: 5px 0px !important ;
	}

	.web_acc_box .visible .description .actions button {
		margin-left: 12px !important ;
		width: 100px !important ;
		height: 40px !important ;
		font-size: 1.11vw !important ; /* 16px */
		line-height: 1.31vw !important ; /* 19px !important ; */
	}

	.web_acc_box .hidden {
		padding-top: 13px !important ;
		margin-top: 12px !important ;
	}

	.web_acc_box .hidden h2 {
		font-size: 1.041vw !important ; /* 15px */
		line-height: 1.25vw !important ; /* 18px !important ; */
		text-transform: unset !important ;
		margin-bottom: 10px !important ;
	}

	.web_acc_box .hidden .additional_counter {
		display: block !important ;
	}

	.web_acc_box .hidden .additional_counter__single {
		width: 100% !important ;
	}

	.web_acc_box .hidden .additional_counter__single h3 {
		font-size: 1.041vw !important ; /* 15px */
		line-height: 1.25vw !important ; /* 18px !important ; */
		color: #FF7F51 !important ;
	}

	.web_acc_box .hidden .additional_counter__single .people_age {
		width: 100px !important ;
	}

	.web_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
		font-size: 1.041vw !important ; /* 15px */
		line-height: 1.25vw !important ; /* 18px !important ; */
	}

	.web_acc_box .hidden .additional_counter__single .people_age h5 {
		font-size: 0.833vw !important ; /* 12px */
		line-height: 0.972vw !important ; /* 14px !important ; */
		margin: 0 !important ;
	}

	.web_acc_box .hidden .additional_counter__single .actions {
		display: flex !important ;
		align-items: center !important ;
		justify-content: space-between !important ;
		gap: 5px !important ;
		width: 100px !important ;
	}
}

@media all and (max-width: 768px) {

	.main_box {
		width: 100% !important ;
		min-height: 402px !important ;
		overflow-x: hidden !important ;
		overflow-y: hidden !important ;
		height: auto !important ;
		padding: 0 !important ;
		box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1) !important ;
		margin-top: 8px !important ;
	}

	.visible {
		display: block !important ;
		grid-template-columns: unset !important ;
		grid-column-gap: unset !important ;
		align-items: start !important ;
	}

	.visible .avatar {
		height: 151px !important ;
		padding: 12px !important ;
		border-radius: 4px 4px 0px 0px !important ;
		margin-bottom: 12px !important ;
	}

	.visible .description {
		display: block !important ;
		grid-template-columns: 464px 139px 1fr !important ;
		grid-column-gap: 32px !important ;
	}

	.visible .description .titles .tags_list {
		display: flex !important ;
		align-items: center !important ;
		flex-wrap: wrap !important ;
		margin: 12px 0px !important ;
		padding-left: 12px !important ;
	}

	.visible .description .titles .tags_list p {
		font-size: 15px !important ;
		line-height: 18px !important ;
		color: rgba(0, 18, 57, 0.5) !important ;
		margin-right: 19px !important ;
	}

	

	.visible .description .titles h2 {
		font-size: 17px !important ;
		line-height: 20px !important ;
		margin-bottom: 12px !important ;
	}

	.visible .description .titles__main {
		font-size: 15px !important ;
		line-height: 18px !important ;
		-webkit-line-clamp: 4 !important ;
	}

	.visible .description .additional h3 {
		font-family: SFsemibold !important ;
		font-size: 12px !important ;
		line-height: 14px !important ;
		margin-bottom: 6px  !important ;
		margin-right: 16px !important ;
	}

	.visible .description .additional button {
		width: 149px !important ;
		font-size: 15px !important ;
		line-height: 18px !important ;
	}

	.visible .description .price {
		padding-top: 12px !important ;
	}

	.visible .description .price h2 {
		font-size: 17px !important ;
		line-height: 20px !important ;
	}

	.visible .description .price p {
		font-size: 12px !important ;
		line-height: 14px !important ;
	}

	.visible .description .actions {
		flex-direction: row !important ;
		padding-top: 12px !important ;
	}

	.visible .description .actions h2 {
		font-size: 12px !important ;
		line-height: 14px !important ;
		width: 78px !important ;
	}

	.visible .description .actions p {
		grid-template-columns: 24px 18px 24px !important ;
		grid-column-gap: 6px !important ;
		font-size: 12px !important ;
		line-height: 14px !important ;
		padding: 5px 0px !important ;
	}

	.visible .description .actions button {
		margin-left: 12px !important ;
		width: 100px !important ;
		height: 40px !important ;
		font-size: 16px !important ;
		line-height: 19px !important ;
	}

	.hidden {
		padding-top: 13px !important ;
		margin-top: 12px !important ;
	}

	.hidden h2 {
		font-size: 15px !important ;
		line-height: 18px !important ;
		text-transform: unset !important ;
		margin-bottom: 10px !important ;
	}

	.hidden .additional_counter {
		display: block !important ;
	}

	.hidden .additional_counter__single {
		width: 100% !important ;
	}

	.hidden .additional_counter__single h3 {
		font-size: 15px !important ;
		line-height: 18px !important ;
		color: #FF7F51 !important ;
	}

	.hidden .additional_counter__single .people_age {
		width: 100px !important ;
	}

	.hidden .additional_counter__single .people_age p:first-of-type {
		font-size: 15px !important ;
		line-height: 18px !important ;
	}

	.hidden .additional_counter__single .people_age h5 {
		font-size: 12px !important ;
		line-height: 14px !important ;
		margin: 0 !important ;
	}

	.hidden .additional_counter__single .actions {
		display: flex !important ;
		align-items: center !important ;
		justify-content: space-between !important ;
		gap: 5px !important ;
		width: 100px !important ;
	}
}

.swiper_container {
	padding-top: 54px !important ;
}

.swiper_container .slider_content {
	border-bottom: 0px solid #FF7F51 !important ;
	padding-bottom: 6px !important ;
	color: #FF7F51  !important ;
}

.swiper_container .swiper_slide {
	width: 25vw !important ;
	display: inline-block !important ;
}

.swiper_container .swiper_slide .slider_content {
	cursor: pointer !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	width: 95px !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 19px !important ; /* 19px !important ; */
	text-align: center !important ;
	color: #001239 !important ;
	padding-bottom: 10px !important ;
}

.mobile_services {
	background: #fff !important ;
	width: 100% !important ;
	height: 100vh !important ;
	overflow-y: hidden !important ;
}

.mobile_services__footer {
	position: fixed !important ;
	background: #fff !important ;
	bottom: 0 !important ;
	padding-bottom: 83px !important ;
	padding-top: 12px !important ;
	left: 0 !important ;
	right: 0 !important ;
	width: 100% !important ;
}

.single_service {
	display: grid !important ;
	grid-template-columns: 1fr 1fr 88px !important ;
	align-items: center !important ;
}

.single_service h5 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 0.902vw !important ; /* 13px */
	line-height: 1.11vw !important ; /* 16px !important ; */
	color: #BAB8B8 !important ;
	margin: 0  !important ;
}

.single_service .price {
	padding-left: 8px !important ;
}

.single_service .price h1 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.180vw !important ; /* 17px */
	line-height: 1.388vw !important ; /* 20px !important ; */
	color: #FF7F51 !important ;
	margin-bottom: 2px  !important ;
}

.single_service .title h2 {
	font-size: 1.041vw !important ; /* 15px */
	line-height: 1.25vw !important ; /* 18px !important ; */
	color: #001239 !important ;
	margin-bottom: 2px  !important ;
}

.single_service .actions {
	display: grid !important ;
	grid-template-columns: repeat(3, 25px) !important ;
	align-items: center !important ;
	text-align: center !important ;
	min-height: 70px !important ;
	margin-bottom: 8px !important ;
}

.service_wrapper {
	overflow-y: scroll !important ;
	padding: 0 16px 230px !important ;
	height: 100vh !important ;
}





































/* mobile list of rooms */

.mobile_acc_box .room_left {
	position: absolute !important ;
	top: 14px !important ;
	left: 16px !important ;
	background: #FF7F51 !important ;
	border-radius: 4px !important ;
	padding: 6px !important ;
}

.mobile_acc_box .room_left h4 {
	font-family: SFsemibold !important ;
	font-weight: lighter !important ;
	font-size: 10px !important ;
	line-height: 12px !important ;
	color: #FFFFFF !important ;
}

.mobile_services .mobile_header {
	display: block !important ;
	position: fixed !important ;
	display: flex !important ;
	align-items: center !important ;
	justify-content: center !important ;
	top: 0 !important ;
	left: 0 !important ;
	right: 0 !important ;
	width: 100% !important ;
	height: 44px !important ;
	z-index: 1002 !important ;
	background: #fff !important ;
}
.mobile_services .mobile_header img {
	position: absolute !important ;
	left: 16px !important ;
	top: 12px !important ;
}

.mobile_services .mobile_header p {
	font-family: SFsemibold !important ;
	text-align: center !important ;
	font-size: 17px !important ;
	line-height: 20px !important ;
	color: #001239 !important ;
	margin-bottom: 0  !important ;
}

.mobile_acc_box .book_room_btn {
	display: none !important ;
}

.mobile_acc_box .main_box {
	height: auto !important ;
	padding: 25px !important ;
	margin-bottom: 20px !important ;
	background: #ffffff !important ;
	box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1) !important ;
	border-radius: 4px !important ;
}

.mobile_acc_box .main_box:last-of-type {
	margin-bottom: 0 !important ;
}

.mobile_acc_box .visible {
	display: grid !important ;
	grid-template-columns: 178px 1fr !important ;
	grid-column-gap: 25px !important ;
	align-items: start !important ;
}

.mobile_acc_box .visible .avatar {
	position: relative !important ;
	background-image: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png") !important ;
	cursor: pointer !important ;
	background-size: cover !important ;
	background-position: center center !important ;
	height: 178px !important ;
	display: flex !important ;
	align-items: flex-end !important ;
	justify-content: flex-end !important ;
	padding: 10px !important ;
	border-radius: 4px !important ;
}

.mobile_acc_box .visible .avatar__count {
	padding: 4px 7px !important ;
	background: rgba(0, 0, 0, 0.5) !important ;
	border-radius: 4px !important ;
	display: flex !important ;
	align-items: center !important ;
	justify-content: center !important ;
}

.mobile_acc_box .visible .avatar__count p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 700 !important ;
	font-size: 12px !important ;
	line-height: 14px !important ;
	color: #ffffff !important ;
	margin: 0 !important ;
}

.mobile_acc_box .visible .description {
	display: grid !important ;
	grid-template-columns: 464px 139px 1fr !important ;
	grid-column-gap: 32px !important ;
}

.mobile_acc_box .visible .description .titles {
	padding: 0 12px !important ;
}

.mobile_acc_box .visible .description .titles .tags_list {
	display: flex !important ;
	align-items: center !important ;
	flex-wrap: wrap !important ;
	margin: 12px 0px !important ;
	padding-left: 12px !important ;
}

.mobile_acc_box .visible .description .titles .tags_list p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	color: #000000 !important ;
	margin-right: 19px !important ;
	position: relative !important ;
}


.mobile_acc_box .visible .description .titles h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 22px !important ;
	line-height: 26px !important ;
	color: #001239 !important ;
	margin-bottom: 12px !important ;
}

.mobile_acc_box .visible .description .titles__main {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	color: #000000 !important ;
	margin-bottom: 12px !important ;
	display: block !important ;
        /* Fallback for non-webkit */
	display: -webkit-box !important ;
	-webkit-line-clamp: 5 !important ;
	-webkit-box-orient: vertical !important ;
	overflow: hidden !important ;
	text-overflow: ellipsis !important ;
}

.mobile_acc_box .visible .description .additional {
	display: flex !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
	padding: 0 12px !important ;
}

.mobile_acc_box .visible .description .additional h3 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	color: #ff7f51 !important ;
	margin-bottom: 0 !important ;
	margin-right: 16px !important ;
}

.mobile_acc_box .visible .description .additional button {
	width: 149px !important ;
	height: 40px !important ;
	border: 1px solid #ff7f51 !important ;
	background: #ff7f51 !important ;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1) !important ;
	border-radius: 4px !important ;
	transition: 0.22s !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	color: #ffffff !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	display: flex !important ;
	align-items: center !important ;
	justify-content: center !important ;
}

.mobile_acc_box .visible .description .additional button svg {
	margin-right: 10px !important ;
}

.mobile_acc_box .visible .description .additional button:hover {
	background: #fff !important ;
	color: #ff7f51 !important ;
}

.mobile_acc_box .visible .description .additional button:hover svg path {
	fill: #ff7f51 !important ;
}

.mobile_acc_box .visible .description .price {
	display: flex !important ;
	align-items: flex-start !important ;
	justify-content: space-between !important ;
	padding: 12px 12px 0px !important ;
	padding-top: 52px !important ;
}

.mobile_acc_box .visible .description .price h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 22px !important ;
	line-height: 26px !important ;
	color: #001239 !important ;
	margin-bottom: 6px !important ;
}

.mobile_acc_box .visible .description .price p {
	font-size: 12px !important ;
	line-height: 14px !important ;
	color: #021011 !important ;
	margin: 0 !important ;
}

.mobile_acc_box .visible .description .price button {
	width: 100px !important ;
	height: 40px !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	background: #ff7f51 !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	color: #ffffff !important ;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1) !important ;
	border-radius: 4px !important ;
	transition: 0.22s !important ;
	border: 1px solid #ff7f51 !important ;
}

.mobile_acc_box .visible .description .price button:hover {
	background: #fff !important ;
	color: #ff7f51 !important ;
}

.mobile_acc_box .visible .description .actions {
	display: flex !important ;
	flex-direction: column !important ;
	align-items: center !important ;
	justify-content: flex-start !important ;
	padding-top: 21px !important ;
}

.mobile_acc_box .visible .description .actions h4 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	color: #00b1bb !important ;
}

.mobile_acc_box .visible .description .actions p {
	display: grid !important ;
	grid-template-columns: 25px 18px 25px !important ;
	grid-column-gap: 10px !important ;
	align-items: center !important ;
	text-align: center !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 700 !important ;
	font-size: 20px !important ;
	line-height: 24px !important ;
	color: #001239 !important ;
	margin-bottom: 10px !important ;
	padding: 10px 0px !important ;
}

.mobile_acc_box .visible .description .actions p img {
	cursor: pointer !important ;
}

.mobile_acc_box .visible .description .actions button {
	width: 160px !important ;
	height: 44px !important ;
	background: #ff7f51 !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	color: #ffffff !important ;
	box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1) !important ;
	border-radius: 4px !important ;
	transition: 0.22s !important ;
	border: 1px solid #ff7f51 !important ;
}

.mobile_acc_box .visible .description .actions button:hover {
	background: #fff !important ;
	color: #ff7f51 !important ;
}

.mobile_acc_box .hidden {
	padding-top: 25px !important ;
	border-top: 1px solid #d7dddd !important ;
	margin-top: 24px !important ;
}

.mobile_acc_box .hidden h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	text-transform: uppercase !important ;
	color: #021011 !important ;
	margin-bottom: 26px !important ;
}

.mobile_acc_box .hidden .additional_counter {
	display: grid !important ;
	grid-template-columns: repeat(2, 1fr) !important ;
	width: 100% !important ;
	padding: 0 12px !important ;
}

.mobile_acc_box .hidden .additional_counter__single {
	display: flex !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
	width: 300px !important ;
}

.mobile_acc_box .hidden .additional_counter__single h3 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	color: #021011 !important ;
	margin: 0 !important ;
}

.mobile_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	color: #021011 !important ;
	margin-bottom: 6px !important ;
}

.mobile_acc_box .hidden .additional_counter__single .people_age h5 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 12px !important ;
	line-height: 14px !important ;
	color: #cfd7e3 !important ;
	margin: 0 !important ;
}

.mobile_acc_box .hidden .additional_counter__single .actions {
	display: flex !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
	gap: 5px !important ;
	width: 80px !important ;
}

.mobile_acc_box .hidden .additional_counter__single .actions p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	margin: 0  !important ;
	font-size: 14px !important ;
	line-height: 16px !important ;
	color: #021011 !important ;
}

.mobile_acc_box .hidden .additional_counter__single .actions img {
	cursor: pointer !important ;
}

.mobile_acc_box .activeBtn {
	background: #fff  !important ;
	color: #ff7f51  !important ;
}

.mobile_acc_box .activeBtn svg path {
	fill: #ff7f51  !important ;
}

.mobile_acc_box .hidden-leave {
	position: absolute !important ;
	opacity: 0 !important ;
	display: none !important ;
}

@media all and (max-width: 768px) {
	.mobile_acc_box .main_box {
		width: 100% !important ;
		min-height: 402px !important ;
		overflow-x: hidden !important ;
		overflow-y: hidden !important ;
		height: auto !important ;
		padding: 0 !important ;
		box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1) !important ;
		margin-top: 8px !important ;
	}

	.mobile_acc_box .visible {
		display: block !important ;
		grid-template-columns: unset !important ;
		grid-column-gap: unset !important ;
		align-items: start !important ;
	}

	.mobile_acc_box .visible .avatar {
		height: 151px !important ;
		padding: 12px !important ;
		border-radius: 4px 4px 0px 0px !important ;
		margin-bottom: 12px !important ;
	}

	.mobile_acc_box .visible .description {
		display: block !important ;
		grid-template-columns: 464px 139px 1fr !important ;
		grid-column-gap: 32px !important ;
	}

	.mobile_acc_box .visible .description .titles .tags_list {
		display: flex !important ;
		align-items: center !important ;
		flex-wrap: wrap !important ;
		margin: 12px 0px !important ;
		padding-left: 12px !important ;
	}

	.mobile_acc_box .visible .description .titles .tags_list p {
		font-size: 15px !important ;
		line-height: 18px !important ;
		color: rgba(0, 18, 57, 0.5) !important ;
		margin-right: 19px !important ;
	}

	
	.single_service_p{
		font-family: "Roboto",sans-serif !important ;
		font-weight: 400 !important ;
		font-size: 13px !important ;
		line-height: 16px !important ;
		color: #bab8b8 !important ;
		margin: 0 !important ;
	}


	.mobile_acc_box .visible .description .titles h2 {
		font-size: 17px !important ;
		line-height: 20px !important ;
		margin-bottom: 12px !important ;
	}

	.mobile_acc_box .visible .description .titles__main {
		font-size: 15px !important ;
		line-height: 18px !important ;
		-webkit-line-clamp: 4 !important ;
	}

	.mobile_acc_box .visible .description .additional h4 {
		font-family: SFsemibold !important ;
		font-size: 12px !important ;
		line-height: 14px !important ;
		margin-bottom: 6px  !important ;
		margin-right: 16px !important ;
	}

	.mobile_acc_box .visible .description .additional button {
		width: 149px !important ;
		font-size: 15px !important ;
		line-height: 18px !important ;
	}

	.mobile_acc_box .visible .description .price {
		padding-top: 12px !important ;
	}

	.mobile_acc_box .visible .description .price h2 {
		font-size: 17px !important ;
		line-height: 20px !important ;
	}

	.mobile_acc_box .visible .description .price p {
		font-size: 12px !important ;
		line-height: 14px !important ;
	}

	.mobile_acc_box .visible .description .actions {
		flex-direction: row !important ;
		padding-top: 12px !important ;
	}

	.mobile_acc_box .visible .description .actions h4 {
		font-size: 12px !important ;
		line-height: 14px !important ;
		width: 78px !important ;
	}

	.mobile_acc_box .visible .description .actions p {
		grid-template-columns: 24px 18px 24px !important ;
		grid-column-gap: 6px !important ;
		font-size: 12px !important ;
		line-height: 14px !important ;
		padding: 5px 0px !important ;
	}

	.mobile_acc_box .visible .description .actions button {
		margin-left: 12px !important ;
		width: 100px !important ;
		height: 40px !important ;
		font-size: 16px !important ;
		line-height: 19px !important ;
	}

	.mobile_acc_box .hidden {
		padding-top: 13px !important ;
		margin-top: 12px !important ;
	}

	.mobile_acc_box .hidden h2 {
		font-size: 15px !important ;
		line-height: 18px !important ;
		text-transform: unset !important ;
		margin-bottom: 10px !important ;
		margin-left: 10px !important ;
	}

	.mobile_acc_box .hidden .additional_counter {
		display: block !important ;
	}

	.mobile_acc_box .hidden .additional_counter__single {
		margin: 2vw 0 !important ;
		width: 100% !important ;
	}

	.mobile_acc_box .hidden .additional_counter__single h3 {
		font-size: 15px !important ;
		line-height: 18px !important ;
		color: #FF7F51 !important ;
	}

	.mobile_acc_box .hidden .additional_counter__single .people_age {
		width: 100px !important ;
	}

	.mobile_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
		font-size: 15px !important ;
		line-height: 18px !important ;
	}

	.mobile_acc_box .hidden .additional_counter__single .people_age h5 {
		font-size: 12px !important ;
		line-height: 14px !important ;
		margin: 0 !important ;
	}

	.mobile_acc_box .hidden .additional_counter__single .actions {
		display: flex !important ;
		align-items: center !important ;
		justify-content: space-between !important ;
		gap: 5px !important ;
		width: 100px !important ;
	}
}

.mobile_acc_box .swiper_container {
	overflow-x: scroll !important ;
	justify-content: center !important ;
	padding-top: 54px !important ;
}

.mobile_acc_box .swiper_container  .slider_content {
	border-bottom: 0px solid #FF7F51 !important ;
	padding-bottom: 6px !important ;
	color: #FF7F51  !important ;
	font-size: 14px !important ;
	transition: 0.5s all ease !important ;
}
.slider_content_active {
	border-bottom: 1px solid #FF7F51  !important ;
}
.mobile_acc_box .swiper_container .swiper_slide {
	display: inline-block !important ;
	width: auto !important ;
}

.mobile_acc_box .swiper_container .swiper_slide .slider_content {
	cursor: pointer !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	width: 95px !important ;
	font-size: 16px !important ;
	line-height: 19px !important ;
	text-align: center !important ;
	color: #001239 !important ;
	padding-bottom: 10px !important ;
}

.mobile_acc_box .mobile_services {
	background: #fff !important ;
	width: 100% !important ;
	height: 100vh !important ;
	overflow-y: hidden !important ;
}

.mobile_acc_box .mobile_services__footer {
	position: fixed !important ;
	background: #fff !important ;
	bottom: 0 !important ;
	padding-bottom: 83px !important ;
	padding-top: 12px !important ;
	left: 0 !important ;
	right: 0 !important ;
	width: 100% !important ;
}

.mobile_acc_box .single_service {
	display: grid !important ;
	grid-template-columns: 1fr 1fr 88px !important ;
	align-items: center !important ;
}

.mobile_services .single_service h5 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 13px !important ;
	line-height: 16px !important ;
	color: #BAB8B8 !important ;
	margin: 0  !important ;
}

.mobile_acc_box .single_service .price {
	padding-left: 8px !important ;
}

.mobile_services .single_service .price h1 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 17px !important ;
	line-height: 20px !important ;
	color: #FF7F51 !important ;
	margin-bottom: 2px  !important ;
}

.mobile_services .single_service .title h2 {
	font-size: 15px !important ;
	line-height: 18px !important ;
	color: #001239 !important ;
	margin-bottom: 2px  !important ;
}

.mobile_acc_box .single_service .actions {
	display: grid !important ;
	grid-template-columns: repeat(3, 25px) !important ;
	align-items: center !important ;
	text-align: center !important ;
	min-height: 70px !important ;
	margin-bottom: 8px !important ;
}

.mobile_acc_box .service_wrapper {
	overflow-y: scroll !important ;
	padding: 0 16px 230px !important ;
	height: 100vh !important ;
	margin-top: 4vw !important ;
}







































/* форма бронирования */




.payment__passenger__form {
	display: none !important ;
}

.main_form {
	width: 100% !important ;
  max-width: 27vw !important ;
  display: inline-block !important ;
  vertical-align: top !important ;
  margin-top: 2vh !important ;
}

.main_form h1 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.527vw !important ; /*22px !important ;*/
	line-height: 1.805vw !important ; /* 26px !important ; */
	text-transform: uppercase !important ;
	color: #001239 !important ;
	margin-bottom: 30px !important ;
}
.main_form_img{
  width: 20px !important ;
  position: relative !important ;
  top: 2px !important ;
  margin-right: 10px !important ;
  background-color: lightgrey !important ;
  border-radius: 25px !important ;
  padding: 5px !important ;
  cursor: pointer !important ;
}

.main_form h5 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: rgba(0, 18, 57, 0.5) !important ;
	margin-bottom: 30px !important ;
}

.main_form h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin-bottom: 32px !important ;
}

.form_inputs {
	display: grid !important ;
	grid-template-columns: repeat(2, 1fr) !important ;
	grid-column-gap: 25px !important ;
	grid-row-gap: 20px !important ;
	margin-bottom: 20px !important ;
}

.form_inputs__single {
	display: flex !important ;
	flex-direction: column !important ;
	align-items: flex-start !important ;
	justify-content: flex-start !important ;
}

label {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin-bottom: 6px !important ;
}

label span {
	color: #ff7f51 !important ;
}

input {
	/* width: 100% !important ; */
	/* height: 50px !important ;
	padding-left: 20px !important ; */
	outline: none !important ;
	border: 1px solid #bbc2d0 !important ;
	box-sizing: border-box !important ;
	border-radius: 4px !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
}

::placeholder {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #e9e9e9 !important ;
}

.showCardBtn {
	display: none !important ;
}

@media all and (max-width: 768px) {
	.showCardBtn {
		display: unset !important ;
	}

	.main_form {
		display: block !important ;
		max-width: 96vw !important ;
		padding: 0 2.5vw !important ;
	}

	.main_form h1 {
		font-size: 17px !important ; /* 1.180vw */
		line-height: 20px !important ; /* 1.388vw !important ; */
		margin-bottom: 18px !important ;
		text-align: center !important ;
	}

	.main_form h5 {
		font-size: 10px !important ; /* 0.694vw */
		line-height: 12px !important ; /* 0.83vw !important ; */
		margin-bottom: 32px  !important ;
	}

	.main_form h2 {
		font-size: 15px !important ; /* 1.041vw */
		line-height: 18px !important ; /* 1.25vw !important ; */
		margin-bottom: 12px !important ;
	}
	label {
		font-family: "Roboto", sans-serif !important ;
		font-weight: 400 !important ;
		font-size: 16px !important ; /* 1.11vw !important ; */
		line-height: 19px !important ; /* 1.31vw !important ; */
		color: #001239 !important ;
		margin-bottom: 6px !important ;
	}
	input {
		/* width: 100% !important ; */
		/* height: 50px !important ;
		padding-left: 20px !important ; */
		outline: none !important ;
		border: 1px solid #bbc2d0 !important ;
		box-sizing: border-box !important ;
		border-radius: 4px !important ;
		font-family: "Roboto", sans-serif !important ;
		font-weight: 400 !important ;
		font-size: 16px !important ; /* 1.11vw !important ; */
		line-height: 19px !important ; /* 1.31vw !important ; !important ; */
		color: #001239 !important ;
	}
	::placeholder {
		font-family: "Roboto", sans-serif !important ;
		font-weight: 400 !important ;
		font-size: 16px !important ;  /* 1.11vw !important ; */
		line-height: 19px !important ;  /* 1.31vw !important ; !important ; */
		color: #e9e9e9 !important ;
	}
}

.closeMobileCard {
	position: absolute !important ;
	z-index: 999 !important ;
	top: 24px !important ;
	right: 24px !important ;
	width: 16px  !important ;
	height: 16px !important ;
}







































/* sidebox часть для бронирования */

.main_card{
  background-color: white !important ;
  width: 110% !important ;
  position: relative !important ;
  left: -5% !important ;
  padding: 2% 5% !important ;
}



.disabled {
	opacity: 0.5 !important ;
	cursor: default !important ;
}

.disabled:hover {
	background: #ff7f51 !important ;
	color: #fff !important ;
}

.main_box_1 {
	width: 100% !important ;
	max-width: 550px !important ;
	background: #ffffff !important ;
	box-shadow: 0px 10px 20px rgba(146, 178, 193, 0.3) !important ;
	border-radius: 5px !important ;
	padding: 20px !important ;
  width: 100% !important ;
}
.main_box_2{
  width: 34vw !important ;
  margin-left: 1vw !important ;
  display: inline-block !important ;
  padding: 1.5vw !important ;
  margin-top: 2vh !important ;
  background-color: white !important ;
}
.box {
	position: relative !important ;
	padding-bottom: 20px !important ;
	margin-bottom: 20px !important ;
}

.box .custom_border {
	position: absolute !important ;
	bottom: 0 !important ;
	left: -20px !important ;
	right: -20px !important ;
	height: 1px !important ;
	background: #ff7f51 !important ;
}

.box__title {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	text-transform: uppercase !important ;
	color: #001239 !important ;
	margin-bottom: 20px !important ;
}

.box__header {
	display: grid !important ;
	grid-template-columns: 180px 1fr !important ;
	grid-column-gap: 20px !important ;
	align-items: start !important ;
	height: 180px !important ;
}

.box__header .avatar {
	width: 100% !important ;
	height: 180px !important ;
	background-size: cover !important ;
	background-position: center center !important ;
	border-radius: 4px !important ;
}

.box__header .descr {
	display: flex !important ;
	flex-direction: column !important ;
	align-items: flex-start !important ;
	justify-content: space-between !important ;
	height: 100% !important ;
}

.box__header .descr__type {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: rgba(0, 18, 57, 0.5) !important ;
	margin-bottom: 6px  !important ;
}

.box__header .descr__title {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin-bottom: 10px  !important ;
}

.box__header .descr__loc {
	display: flex !important ;
	align-items: center !important ;
	justify-content: flex-start !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin-bottom: 9px  !important ;
}

.box__header .descr__loc img {
	margin-right: 6px !important ;
}

.box__header .descr__name {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
}

.box__header .descr button {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	height: 50px !important ;
	width: 100% !important ;
	border: 1px solid #ff7f51 !important ;
	border-radius: 4px !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #fff !important ;
	letter-spacing: normal !important ;
	text-transform: none !important ;
}

.dates {
	padding-top: 40px !important ;
	padding-bottom: 20px !important ;
	margin-bottom: 19px !important ;
	border-bottom: 1px solid #e6e6e6 !important ;
}

.dates p {
	display: grid !important ;
	grid-template-columns: 18px 1fr !important ;
	grid-column-gap: 10px !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin-bottom: 11px  !important ;
}

.dates p:last-of-type {
	margin-bottom: 0  !important ;
}

.time {
	padding-bottom: 20px !important ;
	margin-bottom: 20px !important ;
	border-bottom: 1px solid #e6e6e6 !important ;
}

.time p {
	display: flex !important ;
	align-items: center !important ;
	justify-content: flex-start !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #ff7f51 !important ;
	margin-bottom: 12px  !important ;
}

.time p:last-of-type {
	margin-bottom: 0  !important ;
}

.time p strong {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	color: #001239 !important ;
	margin-left: 10px !important ;
	margin-right: 20px !important ;
}

.time p img {
	margin-bottom: 1px !important ;
	cursor: pointer !important ;
}

.additional_service {
	padding-bottom: 20px !important ;
	margin-bottom: 20px !important ;
	border-bottom: 1px solid #e6e6e6 !important ;
}

.additional_service h2 {
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	text-transform: uppercase !important ;
	color: #001239 !important ;
	margin-bottom: 20px !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
}

.additional_service p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin-bottom: 12px !important ;
}

.additional_service p:last-of-type {
	margin-bottom: 0 !important ;
}

.price div {
	display: block !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
	width: 100% !important ;
	margin: 2vw 0 !important ;
	
}


.price div p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin: 0 !important ;
}

.sum_up__value {
	display: flex !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
	margin-bottom: 40px !important ;
}

.sum_up__value h4 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	text-transform: uppercase !important ;
	color: #ff7f51 !important ;
	margin: 0 !important ;
}

.sum_up__short {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 0.833vw !important ; /* 12px */
	line-height: 0.972vw !important ; /* 14px !important ; */
	color: rgba(0, 18, 57, 0.5) !important ;
	margin-bottom: 20px  !important ;
}

.sum_up__short span {
	text-decoration: underline !important ;
	color: #00b1bb !important ;
	cursor: pointer !important ;
}

.sum_up__short input {
	transform: translateY(4px) !important ;
}

.sum_up button {
	display: flex !important ;
	align-items: center !important ;
	justify-content: center !important ;
	width: 100% !important ;
	height: 56px !important ;
	background: #ff7f51 !important ;
	border-radius: 4px !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	color: #ffffff !important ;
	text-transform: none !important ;
	letter-spacing: normal !important ;
}
.v-input__slot{
  min-height: 45px  !important ;
}
.v-input__icon{
  height: 10px  !important ;
}
.sum_up button svg {
	margin-right: 10px !important ;
}

.close {
	position: absolute !important ;
	top: 24px !important ;
	right: 24px !important ;
	cursor: pointer !important ;
}

.services_pop {
	position: relative !important ;
	padding: 52px 50px 49px 50px !important ;
	background: #ffffff !important ;
	border-radius: 5px !important ;
}

.services_pop h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.805vw !important ; /* 26px */
	line-height: 2.083vw !important ; /* 30px !important ; */
	color: #001239 !important ;
	margin-bottom: 28px !important ;
}

.services_pop .single_service {
	display: flex !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
	width: 100% !important ;
	border-bottom: 1px solid #e9e9e9 !important ;
	margin-bottom: 16px !important ;
}

.services_pop .single_service:last-of-type {
	margin-bottom: 0 !important ;
}

.services_pop__title h3 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.388vw !important ; /* 20px */
	line-height: 1.59vw !important ; /* 23px !important ; */
	color: #001239 !important ;
	margin-bottom: 6px !important ;
}

.services_pop__title p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 0.972vw !important ; /* 14px */
	line-height: 1.11vw !important ; /* 16px !important ; */
	color: rgba(0, 18, 57, 0.3) !important ;
}

.services_pop .actions {
	display: grid !important ;
	grid-template-columns: 1fr 90px 140px !important ;
	grid-column-gap: 20px !important ;
	align-items: center !important ;
	justify-content: end !important ;
}

.services_pop .actions__price h1 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 700 !important ;
	font-size: 1.388vw !important ; /* 20px */
	line-height: 1.59vw !important ; /* 23px !important ; */
	text-align: right !important ;
	color: #ff7f51 !important ;
	margin-bottom: 4px !important ;
}

.services_pop .actions__price h5 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 700 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #bab8b8 !important ;
	margin: 0 !important ;
}

.services_pop .actions__count {
	display: flex !important ;
	align-items: center !important ;
	justify-content: space-between !important ;
}

.services_pop .actions__count img {
	cursor: pointer !important ;
}

.services_pop .actions__count p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 700 !important ;
	font-size: 1.388vw !important ; /* 20px */
	line-height: 1.59vw !important ; /* 23px !important ; */
	color: #001239 !important ;
	margin: 0  !important ;
}

.services_pop .actions button {
	border: 1px solid #ff7f51 !important ;
	box-sizing: border-box !important ;
	filter: drop-shadow(0px 10px 20px rgba(82, 177, 186, 0.25)) !important ;
	border-radius: 5px !important ;
	height: 44px !important ;
	width: 100% !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 700 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #fff !important ;
	text-transform: none !important ;
	letter-spacing: normal !important ;
}

.change_time {
	position: relative !important ;
	padding: 54px 50px 30px 50px !important ;
	background: #ffffff !important ;
	border-radius: 5px !important ;
}

.change_time h1 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.805vw !important ; /* 26px */
	line-height: 2.083vw !important ; /* 30px !important ; */
	color: #001239 !important ;
	margin-bottom: 20px !important ;
}

.change_time p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	opacity: 0.5 !important ;
	margin-bottom: 30px !important ;
}

.change_time label {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin-bottom: 6px !important ;
}

.change_time input {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	width: 100% !important ;
	height: 50px !important ;
	padding-left: 20px !important ;
	border: 1px solid #bbc2d0 !important ;
	border-radius: 4px !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #001239 !important ;
	margin-bottom: 20px !important ;
}

.change_time input:last-of-type {
	margin-bottom: 0 !important ;
}

.change_time button {
	margin-top: 30px !important ;
	background: #ff7f51 !important ;
	border-radius: 4px !important ;
	font-size: 1.11vw !important ; /* 16px */
	line-height: 1.31vw !important ; /* 19px !important ; */
	color: #ffffff !important ;
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	transition: 0.22s !important ;
	width: 100% !important ;
	height: 56px !important ;
}

.change_time button:hover {
	color: #ff7f51 !important ;
	background: #fff !important ;
}

.partial_payment h2 {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 500 !important ;
	font-size: 1.6666vw !important ; /* 24px */
	line-height: 1.944vw !important ; /* 28px !important ; */
	color: #ff7f51 !important ;
}

.partial_payment p {
	font-family: "Roboto", sans-serif !important ;
	font-weight: 400 !important ;
	font-size: 0.833vw !important ; /* 12px */
	line-height: 0.972vw !important ; /* 14px !important ; */
	color: #001239 !important ;
	margin-top: 6px  !important ;
	margin-bottom: 0  !important ;
}

.box_links {
	color: #00b1bb  !important ;
}

@media all and (max-width: 768px) {
	.main_card{
		top: -15vh !important ;
	}
	.main_box_1 {
		padding-bottom: 120px !important ;
	}
	.main_box_2{
		margin-left: 0vw !important ;
    width: 100vw  !important ;
    padding: 2.5vw !important ;
	}

	.text--white {
		display: none !important ;
	}
	.box__title {
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.box__header .descr__type {
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.box__header .descr__title {
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.box__header .descr__loc {
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.box__header .descr__name{
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.dates p{
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.time p{
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.price div p{
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.sum_up__value h4{
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.partial_payment h2 {
		font-size: 24px !important ;
		line-height: 28px !important ;
	}
	.partial_payment p {
		font-size: 12px !important ;
		line-height: 14px !important ;
	}
	.sum_up__short{
		font-size: 12px !important ;
		line-height: 14px !important ;	
	}
	.main_box_2 .price div{
		display: flex !important ;
	}
	.additional_service h2 {
		font-size: 16px !important ;
		line-height: 19px !important ;
	}
	.additional_service p {
		font-size: 16px !important ;
		line-height: 19px !important ;
	}



}



</style>

