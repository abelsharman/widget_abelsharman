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
          <acc-box
            v-show="item.room_count"
            class="web_acc_box"
            :item="item"
            :index="index"
            :currentindex="currentIndex"
            @change-form='changeForm'
            @toggle='toggleOrderCard($event)'
            @set-active="setActive">
          </acc-box>

          <mobile-acc-box
            style="background-color: black;"
            class="mobile_acc_box"
            v-show="item.room_count"
            :item="item"
            :index="index"
            :currentindex="currentIndex"
            @change-form='changeForm'
            @toggle='toggleOrderCard($event)'
            @set-active="setActive">
          </mobile-acc-box>

        </div>
      </div>




      <v-container class="main_card" v-show="checkForm" style="background-color: white;width: 110%;position: relative;left: -5%;padding: 2% 5%;">
        <acc-form
          ref="accform"
          :submitaccbtnloading="submitAccBtnloading"
          :accomodationsubmit="accomodationSubmit"
          :ordercard="orderCard"
          @change-form='changeForm'
          @success="success">
        </acc-form>


        <side-box
          :accomodationsubmit="accomodationSubmit"
          @refresh-page="refreshPage"
          @toggle='toggleOrderCard($event)'
          :ordercard="orderCard"
          :submitaccbtnloading="submitAccBtnloading"
        >
        </side-box>

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
          <acc-box
            v-show="item.room_count"
            class="web_acc_box"
            :item="item"
            :index="index"
            :currentindex="currentIndex"
            @change-form='changeForm'
            @toggle='toggleOrderCard($event)'
            @set-active="setActive">
          </acc-box>

          <mobile-acc-box
            style="background-color: black;"
            class="mobile_acc_box"
            v-show="item.room_count"
            :item="item"
            :index="index"
            :currentindex="currentIndex"
            @change-form='changeForm'
            @toggle='toggleOrderCard($event)'
            @set-active="setActive">
          </mobile-acc-box>

        </div>
      </div>




      <v-container class="main_card" v-show="checkForm" style="background-color: rgb(231, 236, 239);width: 110%;position: relative;left: -5%;padding: 2% 5%;" :style="divBackground">
        <acc-form
          ref="accform"
          :style="divBackground"
          :submitaccbtnloading="submitAccBtnloading"
          :accomodationsubmit="accomodationSubmit"
          :ordercard="orderCard"
          @change-form='changeForm'
          @change-detail='toggleDetailCard'
          @success="success">
        </acc-form>
        
        <v-dialog v-model="detailCard" fullscreen hide-overlay>
          <img src="https://marketbot.abelsharman.kz/widget_go2trip/assets/close.png" @click="toggleDetailCard" class="closeMobileCard">
          <side-box
            :accomodationsubmit="accomodationSubmit"
            @refresh-page="refreshPage"
            :ordercard="orderCard"
            :submitaccbtnloading="submitAccBtnloading"
          >
          </side-box>
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

export default {
  name: 'Home',
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
