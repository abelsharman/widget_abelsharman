<template>
  <div id="app" class="widget" @click="clickWidget">
    <v-app class="app_1" v-if="width > 768" style="background: #e7ecef; border-radius: 10px; padding: 5vw 10%; width: 100%;height: 40vh; overflow-y: scroll; display: inline-block;" :style="[ resultCheck || checkForm ? { 'height': '80vh', 'background-color': background }: { 'height': '40vh', 'background-color': background }]">

      <div style="display: flex;position: relative;transition:0.5s all ease;" :style="[ width > 768 && resultCheck || checkForm ? { 'left': '-3%' }: { 'left': '0%' }]">
        <div style="width: 35vw; display: flex;transition: 0.5s all ease;" :style="[ width > 768 && resultCheck || checkForm ? { 'width': '30vw' }: { 'width': '35vw' }]">
      
          <v-main style="width: 100%;">
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
                style="border-left: 1px solid #d1d1d1; width: 100%;">
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
                @input="closeModal">
              </v-date-picker>


            </v-menu>










          </v-main>
        </div>


        <div id="widget_form" class="widget_form" :style="[ width > 768 && resultCheck || checkForm ? { 'width': '30vw', 'marginLeft': '0.5vw' }: { 'width': '35vw', 'marginLeft': '1vw' }]">
          <img id="widget_form_img" style="margin-left: 1.5vw;" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/user.png" alt="user"> 
          <span id="widget_form_span" style="margin-left: 0.5vw;">{{ adult_count }} взрослых, {{ children_count }} детей</span>
        </div>

      </div>



      <div id="widget_people" class="widget_people" style="width: 40%;position: absolute;background-color: white;left: 51%;top:39px;animation: appearBlock 0.5s; border-radius: 5px; padding-left: 20px; padding-top: 10px; display: none;">
        <p>Взрослых 
          <svg :style="svgAccentColor"  @click="parentMinus" id="widget_people_1" style="cursor: pointer;margin-left: 11px;vertical-align: top;width: 24px;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg> 
            <span style="margin-left: 11px;">{{ adult_count }} </span> 
          <svg :style="svgAccentColor" @click="parentPlus" id="widget_people_2" style="margin-left: 10px;vertical-align: top;width: 24px; cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
        </p>
        <p>Детей 
          <svg :style="svgAccentColor"  @click="childMinus" id="widget_people_3" style="cursor: pointer;margin-left: 11px;vertical-align: top;width: 24px;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg> 
            <span style="margin-left: 11px;">{{ children_count }}</span>  
          <svg :style="svgAccentColor" @click="childPlus" id="widget_people_4" style="margin-left: 10px;vertical-align: top;width: 24px; cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
        </p>
      </div>



      <div class="text-center" v-show="width > 768" style="margin-top: 13vh; position: relative; transition: 0.5s all ease;left: 94%; width: 10vw;" :style="[ resultCheck || checkForm && width > 768 ? { 'marginTop': '0vh', 'top': '-50px', 'left': '91%' }: { 'marginTop': '13vh', 'top': '0px', 'left': '43%'  }]">
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


      <div class="text-center" v-show="width <= 768" style="margin-top: 13vh; position: relative; transition: 0.5s all ease;left: 94%; width: 10vw;" :style="[ resultCheck || checkForm ? { 'marginTop': '0vh', 'top': '-50px', 'left': '75%' }: { 'marginTop': '13vh', 'top': '0px', 'left': '35%'  }]">
        <v-btn
          class="widget_button_primary_color"
          style="width: 25vw;"
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
            style="background-color: black;"
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




      <v-container class="main_card" v-show="checkForm" style="background-color: white;width: 110%;position: relative;left: -5%;padding: 2% 5%;">
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


    <v-app class="app_1" v-if="width <= 768" style="transition: all 0.5s ease;background: #e7ecef; border-radius: 10px; padding: 5vw 10%; width: 100%;height: 40vh; overflow-y: scroll; display: inline-block;" :style="[ resultCheck || checkForm ? { 'height': '90vh', 'padding': '5vw 2%', 'background-color': background }: { 'height': '40vh', 'padding': '5vw 10%', 'background-color': background }]">

      <div style="display: flex;position: relative;">
        <div style="width: 35vw; display: flex;transition: 0.5s all ease;" :style="[ width > 768 && resultCheck || checkForm ? { 'width': '37vw' }: { 'width': '37vw' }]">
      
          <v-main style="width: 100%;">
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
                style="border-left: 1px solid #d1d1d1; width: 100%; font-size: 2.61vw !important;">
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
                @input="closeModal">
              </v-date-picker>


            </v-menu>










          </v-main>
        </div>


        <div id="widget_form" class="widget_form" :style="[ width > 768 && resultCheck || checkForm ? { 'width': '33vw', 'marginLeft': '0.5vw' }: { 'width': '33vw', 'marginLeft': '1vw' }]">
          <img id="widget_form_img" style="margin-left: 1.5vw;width: 3.5vw;" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/user.png" alt="user"> 
          <span id="widget_form_span" style="margin-left: 0.5vw;">{{ adult_count }} взрослых, {{ children_count }} детей</span>
        </div>

      </div>


      <div id="widget_people" class="widget_people" style="display: none;width: 50vw;position: absolute;background-color: white;left: 45%;top: 39px;animation: appearBlock 0.5s; border-radius: 5px; padding-left: 20px; padding-top: 10px; font-size: 2.9vw;">
        <p>Взрослых 
          <svg :style="svgAccentColor"  @click="parentMinus" id="widget_people_1" style="cursor: pointer;margin-left: 11px;vertical-align: top;width: 24px;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg> 
            <span style="margin-left: 11px;">{{ adult_count }} </span> 
          <svg :style="svgAccentColor" @click="parentPlus" id="widget_people_2" style="margin-left: 10px;vertical-align: top;width: 24px; cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
        </p>
        <p>Детей 
          <svg :style="svgAccentColor"  @click="childMinus" id="widget_people_3" style="cursor: pointer;margin-left: 11px;vertical-align: top;width: 24px;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg> 
            <span style="margin-left: 11px;">{{ children_count }}</span>  
          <svg :style="svgAccentColor" @click="childPlus" id="widget_people_4" style="margin-left: 10px;vertical-align: top;width: 24px; cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
        </p>
      </div>


      <div class="text-center" style="margin-top: 13vh; position: relative; transition: 0.5s all ease;left: 94%; width: 10vw;" :style="[ resultCheck || checkForm ? { 'marginTop': '0vh', 'top': '-39px', 'left': '75%' }: { 'marginTop': '13vh', 'top': '0px', 'left': '35%'  }]">
        <v-btn
          class="widget_button_primary_color"
          style="width: 25vw;"
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
            style="background-color: black;"
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




      <v-container class="main_card" v-show="checkForm" style="background-color: rgb(231, 236, 239);width: 110%;position: relative;left: -5%;padding: 2% 5%;" :style="divBackground">
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
  name: 'Home',
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
          text_button: localStorage.getItem("text_button")
          }
        },
        mounted(){
            this.$vuetify.lang.current = 'ru'
            if(!localStorage.getItem("orders")){
              let datas = [];
              localStorage.setItem("orders", JSON.stringify(datas));
            }
            console.log(localStorage.getItem("id_company"), localStorage.getItem("primary"), localStorage.getItem("accent"))
            let primary_buttons = document.querySelectorAll(".widget_button_primary_color")
            let primary = localStorage.getItem("primary") 
            let text_button = localStorage.getItem("text_button")
            for (let i = 0; i < primary_buttons.length; i++) {
              primary_buttons[i].setAttribute('style', 'background-color:'+ primary+' !important',  'color:'+ text_button+' !important' );

            }


            let text_p = document.querySelectorAll("#app p, h1, h2, h3, strong")
            let text = localStorage.getItem("text")
            for (let i = 0; i < text_p.length; i++) {
              text_p[i].setAttribute('style', 'color:'+ text+'  !important' );
            }


            


        },
        computed:{
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
                )} - ${moment(this.filter.dates[1]).format("DD-MMM YYYY")}`;
              }
            } else if (this.isRange == "lucky") {
              if (this.tabModel) {
                if (Array.isArray(this.luckyDate)) {
                  let from = moment(this.luckyDate[0]).format("DD-MMM YYYY");
                  let to = moment(this.luckyDate[1]).format("DD-MMM YYYY");
                  return `${from} - ${to}`;
                }
              } else {
                return moment(this.luckyDate).format("DD-MMM YYYY");
              }
            } else {
              return moment(this.filter.checkout_time).format("DD-MMM YYYY");
            }
            return `${moment(this.filter.dates[0]).format(
                  "DD-MMM YYYY"
                )} - ${moment(this.filter.dates[1]).format("DD-MMM YYYY")}`;
          },
          isRange() {
            if (this.getCurrentType) {
              if (
                this.getCurrentType == 2 ||
                this.getCurrentType == 3 ||
                (this.getCurrentType == 7 && this.directionState == "twoway") ||
                (this.getCurrentType == 8 && this.directionState == "twoway")
              ) {
                return "range";
              } else if (this.getCurrentType == 1) {
                return "lucky";
              } else {
                return "single";
              }
            }
            return "range";
          },
        },
        methods: {
          toggleDetailCard(){
            this.detailCard = !this.detailCard
          },
          toggleOrderCard(x){
            this.orderCard = x;
            console.log(this.orderCard, this.orderCard.length)
          },
          refreshPage() {
            location.reload();
          },
          changeForm(){
            this.checkForm = !this.checkForm
            this.resultCheck = !this.resultCheck
          },
          success() {
            this.dialog = true;
          },
          accomodationSubmit() {
            this.$refs.accform.sendData();
          },
          setActive(idx) {
            this.currentIndex = idx;
          },
          goFromWidget(){
            localStorage.setItem("adult_count", this.adult_count)
            localStorage.setItem("children_count", this.children_count)
            localStorage.setItem("date_form", this.filter.dates[0])
            localStorage.setItem("date_to", this.filter.dates[1])
            let id = localStorage.getItem("id_company")
            //console.log(localStorage.adult_count, localStorage.children_count, localStorage.date_form, localStorage.date_to)
            // http://185.121.81.239/api/go2trip/v2/accommodation/zone/categories/4/?start=2021-06-10&end=2021-06-11&count=1&child_count=0&type=2&id=4&directions=2&page[number]=1&page[size]=5/api/go2trip/v2/accommodation/zone/categories/4/?start=2021-06-10&end=2021-06-11&count=1&child_count=0&type=2&id=4&directions=2&page[number]=1&page[size]=5
            axios.get("http://185.121.81.239/api/booking-module/categories/"+id+"/?start="+this.filter.dates[0]+"&end="+this.filter.dates[1]+"&count="+this.adult_count+"&child_count="+this.children_count+"&page[number]=1&page[size]=10&type=2&id=NA&directions=2")
            .then(res => {
              if(res){
                this.results = res.data;
                this.resultCheck = true
                this.checkForm = false
              }
              else{
                console.log("error on fetching lists of rooms")
              }
            });
          },
          clickWidget(event){
            let widget = document.querySelector("#widget_people").style.display;
            if(event.target.id == "widget_form" || event.target.id == "widget_form_span" || event.target.id == "widget_form_img"){
              if(widget == "block"){
                document.querySelector("#widget_people").style.display = "none";
              }
              else{
                document.querySelector("#widget_people").style.display = "block";
              }
            }
            else if(event.target.id != "widget_people_2" && event.target.id != "widget_people_3" && event.target.id != "widget_people_4" && event.target.id != "widget_people_1"){
              if(widget == "block"){
                document.querySelector("#widget_people").style.display = "none";
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
            if(this.menu || !this.menu){
              let buttons = document.querySelectorAll(".widget_button_primary_color")
              let primary = localStorage.getItem("primary") 
              console.log(primary)
              for (let i = 0; i < buttons.length; i++) {
                buttons[i].setAttribute( 'style', 'background-color:'+ primary+'  !important' );
              }
            }
            if (this.tabModel) {
              this.luckyDate &&= this.luckyDate[0];
            } else {
              this.luckyDate = "";
            }
          },
          menu() {
            if (this.isRange == "range") {
              if (this.filter.dates[0] > this.filter.dates[1]) {
                this.filter.dates.reverse();
              }
            } else if (this.isRange == "lucky" && this.menu == false) {
              if (this.luckyDate.length) {
                this.filter.dates = this.luckyDate;
              } else {
                this.filter.date = this.luckyDate;
              }
            }
          }
        },
}
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");
.v-application .primary {
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





.v-application p{
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

	.web_acc_box .visible .description .titles .tags_list p::before {
		content: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/dotblue.png");
		top: -3px;
		left: -11px;
		position: absolute;
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

	.visible .description .titles .tags_list p::before {
		content: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/dotblue.png");
		top: -3px;
		left: -11px;
		position: absolute;
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

.mobile_acc_box .visible .description .titles .tags_list p::before {
	content: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/dotblue.png");
	top: -3px;
	left: -11px;
	position: absolute;
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

	.mobile_acc_box .visible .description .titles .tags_list p::before {
		content: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/dotblue.png");
		top: -3px;
		left: -11px;
		position: absolute;
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
