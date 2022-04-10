<template>
  <div id="app_widget" class="widget">
    <v-app class="ma-4 pa-4" :style="{ backgroundColor: background }" style="background: #e7ecef !important ; max-height: 90vh; border-radius: 5px !important ; padding: 5vw ; width: 100% !important;overflow-y: scroll !important ; display: inline-block !important ;">
        <v-row v-if="status != 'reserved'" class="mb-4">
          <v-col :cols="12" :md="5">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
              :nudge-top="22"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  hide-details
                  v-model="dateRangeText"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  dense
                  solo
                  height="44"
                >
                </v-text-field>
              </template>
              <v-date-picker
                :first-day-of-week="1"
                :allowed-dates="allowedDates"
                range
                v-model="filter.dates"
                no-title
                scrollable
                @input="closeModal"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col :cols="12" :md="5">
            <peopleCount :model="filter" />
          </v-col>
          <v-col :cols="12" :md="2" style="display:flex;justify-content:center"><v-btn height="44" style="width:90%;" :loading="loading" @click="goFromWidget" :style="btnPrimary">Искать</v-btn></v-col>
        </v-row>
        <v-row v-if="status == 'searched' && results.length > 0">
          <v-col cols="9"></v-col>
          <v-col cols="12" md="3">
            <v-btn style="float: right;position:sticky;top: 70px;right: 0px;z-index:4;width:100%" :style="btnPrimary" :loading="loading" @click="reserve"
              >Забронировать</v-btn
            >
          </v-col>
        </v-row>
        <div v-if="status == 'searched'">
          <div
            v-for="(item, index) in results"
            :key="index"
            id="categories"
            class="boxes"
          >
            <AccBox
              v-show="item.room_count"
              class="web_acc_box"
              :item="item"
            />

            <MobileAccBox
              style="background-color: black !important ;"
              class="mobile_acc_box"
              v-show="item.room_count"
              :item="item"
            />
          </div>
        </div>
        <div v-if="status == 'reserved'">
          <AccForm v-if="!mobileCheck || (mobileCheck && mobileShowCardCheck == 'form')" :orders="orders" @back="backToSearch" @open="mobileShowCardCheck = 'card'" />
          <SideBox v-if="!mobileCheck" :orders="orders" />
        </div>
    </v-app>
    <router-view />
    <VueNotification />
  </div>
</template>

<script>
import moment from "moment";
import Vuetify from "vuetify";
import AccBox from "@/components/acc-box.vue";
import AccForm from "@/components/acc-form.vue";
import SideBox from "@/components/side-box.vue";
import MobileAccBox from "@/components/mobile-acc-box.vue";
import peopleCount from "@/components/peopleCount"
import VueNotification from "@/components/vueNotification.vue";
export default {
  name: "App",
  components: {
    AccBox,
    AccForm,
    SideBox,
    MobileAccBox,
    peopleCount,
    VueNotification
  },
  vuetify: new Vuetify({
    theme: {
    themes: {
      light: {
        primary: localStorage.getItem("primary"),
        secondary: localStorage.getItem("accent"),
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
  }),
  data() {
    return {
      menu: false,
      mobileShowCardCheck: '', 
      mobileCheck: false, 
      api_url: "",
      filter: {
        dates: [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10),
        ],
        adult: 1,
        child: 0,
      },
      status: '',
      orders: [{
        calculated_by: {
          adult_price: 500,
          advance_booking: 150,
          calculation_type: "Тариф",
          child_price: 0,
          child_without_place: 0,
          days: 1,
          early_check_in: 0,
          first_day_price: 1500,
          last_day_price: 1500,
          late_check_out: 0,
          price: 1500,
          services: [],
          total: 1350,
        },
        accommodation_type: "rest_zone",
        adult_count: 1,
        booking_id: 877,
        category_name: "2х местный",
        check_in: "1651219200",
        check_out: "1651298400",
        child_count: 0,
        city: "Алматы",
        hotel: "test@test.kz",
        location: "Капшагай",
        main_adult_count: 2,
        main_child_count: 0,
        main_image: null,
        room_name: "Room1_ 4",
      }], 
      results: [],
      loading: false, 
      accent_color: localStorage.getItem("accent"),
      background: localStorage.getItem("background"),
      primary_1: localStorage.getItem("primary"),
      text_button: localStorage.getItem("text_button"),
      text: localStorage.getItem("text"),
    };
  },
  computed: {
    pTextColor() {
      return {
        color: this.text + " !important",
      };
    },
    divBackground() {
      return {
        "background-color": this.background + " !important",
      };
    },
    btnPrimary() {
      return {
        "background-color": this.primary_1 + " !important",
        color: this.text_button + " !important",
      };
    },
    svgAccentColor() {
      return {
        fill: this.accent_color + " !important",
      };
    },
    dateRangeText() {
      if (this.filter.dates) {
        return `${moment(this.filter.dates[0]).format("DD.MM.YYYY")} - ${moment(
          this.filter.dates[1]
        ).format("DD.MM.YYYY")}`;
      }
      return `${moment(this.filter.dates[0]).format("DD.MM.YYYY")} - ${moment(
        this.filter.dates[1]
      ).format("DD.MM.YYYY")}`;
    },
  },
  watch: {
    menu() {
      if (this.filter.dates[0] > this.filter.dates[1]) {
        this.filter.dates.reverse();
      }
    },
  },
  mounted() {
    this.api_url = localStorage.getItem("api_url");
    this.$vuetify.lang.current = "ru";
    let datas = [];
    localStorage.setItem("orders", JSON.stringify(datas));
    if(window.innerWidth < 500) {
      this.mobileShowCardCheck = 'form'
      this.mobileCheck = true
    }
    let link = document.createElement('link')
    link.href = 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css'
    link.rel = 'stylesheet'
    document.body.append(link)
  },
  methods: {
    backToSearch(){
      this.orders = []
      this.goFromWidget()
      this.status = 'searched'
    },
    async reserve(){
      let body = {
        check_in: this.filter.dates[0] + " " + this.results[0].check_in_time,
        check_out: this.filter.dates[1] + " " + this.results[0].check_out_time,
        tour_operator: null, 
        chosen_rooms: [],
        discounts: []
      };
      this.results.forEach((e) => {
        if (e.is_added) {
          e.counts.forEach((j) => {
            body.chosen_rooms.push({
              category: e.id,
              rooms: 1,
              adult_count: j.adult,
              child_count: j.child,
            });
          });
        }
      });
      if(body.chosen_rooms.length == 0) {
        this.$store.commit("SET_NOTIFICATION", {
          show: true,
          message: "Выберите номер!",
          color: "#c54949",
        });
        return
      }
      this.loading = true
      try{
        let res = await window.axios.post(`${this.api_url}/api/v2/widget/reserve/`, body)
        this.orders = res.data.orders
        this.status = 'reserved'
      }
      finally{
        this.loading = false
      }
    },
    async goFromWidget() {
      if(this.filter.dates.length < 2) {
        this.$store.commit("SET_NOTIFICATION", {
          show: true,
          message: "Выберите даты!",
          color: "#c54949",
        });
        return
      }
      localStorage.setItem("adult_count", this.adult_count);
      localStorage.setItem("child_count", this.children_count);
      localStorage.setItem("start", this.filter.dates[0]);
      localStorage.setItem("end", this.filter.dates[1]);
      let id = localStorage.getItem("id_company");
      let params = {
        start: this.filter.dates[0],
        end: this.filter.dates[1],
        adult_count: this.filter.adult, 
        child_count: this.filter.child,
        'page[number]': 1, 
        'page[size]': 10
      }      
      this.loading = true
      try{
        let res = await window.axios.get(`${this.api_url}/api/v2/widget/category-list/${id}/`, {params})
        if (res && res.data && res.data.results.length > 0) {
          res.data.results.forEach((e) => {
            e.count = 1;
            if (!e.room_count) e.count = 0;
            e.adult = 0;
            e.child = 0;
            e.counts = [
              {
                adult: 0,
                child: 0,
              },
            ];
          });
          this.results = res.data.results;
          this.status = 'searched'
          this.loading = false
        } else {
          this.$store.commit("SET_NOTIFICATION", {
            show: true,
            message: "Нет свободных номеров. Пожалуйста выберите другие даты!",
            color: "#c54949",
          });
          this.loading = false
        }
      }
      finally {
        this.loading = false
      }
    },
    closeModal() {
      if (this.filter.dates.length == 2) {
        this.menu = false;
      }
    },
    allowedDates: (val) => val >= new Date().toISOString().substr(0, 10),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

#app_widget th,
td {
  border: 0px;
}

#app_widget .row {
  flex: none;
}
#app_widget {
  .v-application--wrap{
    min-height: 30vh !important;
  }
}
#app_widget ::-webkit-scrollbar-track
{
  box-shadow: inset 0 0 6px red;
	-webkit-box-shadow: inset 0 0 6px red;
	border-radius: 10px;
	background-color: #F5F5F5;
}

#app_widget ::-webkit-scrollbar
{
    height: 2px;
	width: 2px;
	background-color: #F5F5F5;
}
#app_widget ::-webkit-scrollbar-track
{
  box-shadow: inset 0 0 6px lightgray;
	-webkit-box-shadow: inset 0 0 6px lightgray;
	border-radius: 10px;
	background-color: #F5F5F5;
}
.widget h1 {
  padding-bottom: 0px !important;
}
.widget label {
  text-transform: capitalize !important;
  margin-top: 0px !important;
  position: relative !important;
}
.widget th,
td,
button {
  padding: 0px !important;
}
.v-date-picker-table td,
.v-date-picker-table th {
  border: 0px !important;
  padding: 0px !important;
}
#app_widget .v-application .primary {
  background-color: transparent !important ;
  border-color: transparent !important ;
}
.widget {
  position: relative !important ;
  background: #e7ecef !important ;
  color: rgba(61, 61, 61, 0.8) !important ;
  margin: 5vw 0 !important ;
  width: 1200px !important ;
  display: inline-block !important ;
  font-family: "Roboto", sans-serif !important ;
  text-align: left !important ;
  border-radius: 5px !important ;
}
.widget_form {
  transition: 0.5s all ease !important ;
  background-color: white !important ;
  display: inline-block !important ;
  cursor: pointer !important ;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important ;
  border-radius: 3px !important ;
}
.widget_form img {
  margin-top: 11px;
}
.widget_form span {
  position: relative !important ;
  top: -3px !important ;
  font-weight: 400 !important ;
  font-size: 1.01vw !important ; /*16px !important ;*/
  line-height: 1.3194vw !important ; /*19px !important ;*/
  color: #001239 !important ;
}

#app_widget .v-application p {
  margin-bottom: 0px !important ;
}

.widget p {
  margin-bottom: 0px !important ;
}

#app_widget {
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
  from {
    opacity: 0 !important ;
  }
  to {
    opacity: 1 !important ;
  }
}

.boxes {
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
  font-size: 1.08vw !important ; /* 17px */
  line-height: 1.388vw !important ; /* 20px !important ; */
  color: #001239 !important ;
  margin-bottom: 0 !important ;
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
  grid-template-columns: 19% 1fr !important ;
  grid-column-gap: 1.5% !important ;
  align-items: start !important ;
}

.web_acc_box .visible .avatar {
  background-image: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png");
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
  font-size: 0.7333vw !important ; /*12px !important ;*/
  line-height: 0.97vw !important ; /*14px !important ;*/
  color: #ffffff !important ;
  margin: 0 !important ;
}

.web_acc_box .visible .description {
  display: grid !important ;
  grid-template-columns: 49% 25% 27% !important ;
  grid-column-gap: 1% !important ;
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
  font-size: 1.01vw !important ; /*16px !important ;*/
  line-height: 1.3194vw !important ; /*19px !important ;*/
  color: #000000 !important ;
  margin-right: 19px !important ;
  position: relative !important ;
}

.web_acc_box .visible .description .titles h2 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 1.42777vw !important ; /* 22px */
  line-height: 1.805vw !important ; /*26px !important ;*/
  color: #001239 !important ;
  margin-bottom: 12px !important ;
}

.web_acc_box .visible .description .titles__main {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 400 !important ;
  font-size: 1.01vw !important ; /*16px !important ;*/
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
  font-size: 1.01vw !important ; /*16px !important ;*/
  line-height: 1.3194vw !important ; /*19px !important ;*/
  color: #ff7f51 !important ;
  margin-bottom: 0 !important ;
  margin-right: 16px !important ;
}

.web_acc_box .visible .description .titles .additional button {
  width: 149px !important ;
  height: 40px !important ;
  border: 1px solid #ff7f51;
  background: #ff7f51;
  box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
  border-radius: 4px !important ;
  transition: 0.22s !important ;
  font-size: 0.71vw !important ; /*16px !important ;*/
  line-height: 1.3194vw !important ; /*19px !important ;*/
  color: #ffffff;
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
  background: #fff;
  color: #ff7f51;
}

.web_acc_box .visible .description .titles .additional button:hover svg path {
  fill: #ff7f51;
}

.web_acc_box .visible .description .price {
  text-align: center !important ;
  padding-top: 52px !important ;
}

.web_acc_box .visible .description .price h2 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 1.42777vw !important ; /* 22px */
  line-height: 1.8vw !important ; /*26px !important ;*/
  color: #001239 !important ;
  margin-bottom: 6px !important ;
}

.web_acc_box .visible .description .price p {
  font-size: 0.7333vw !important ; /*12px !important ;*/
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
  font-size: 0.91vw !important ; /*16px !important ;*/
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
  font-size: 1.32vw !important ; /*20px !important ;*/
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
  background: #ff7f51;
  font-size: 1.01vw !important ; /*16px !important ;*/
  line-height: 1.3194vw !important ; /*19px !important ;*/
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  color: #ffffff;
  box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1) !important ;
  border-radius: 4px !important ;
  transition: 0.22s !important ;
  border: 1px solid #ff7f51;
}

.web_acc_box .visible .description .actions button:hover {
  background: #fff;
  color: #ff7f51;
}

.web_acc_box .hidden {
  padding-top: 25px !important ;
  border-top: 1px solid #d7dddd !important ;
  margin-top: 24px !important ;
}

.web_acc_box .hidden h2 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 1.01vw !important ; /*16px !important ;*/
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
  font-size: 1.01vw !important ; /*16px !important ;*/
  line-height: 1.3194vw !important ; /*19px !important ;*/
  color: #021011 !important ;
  margin: 0 !important ;
}

.web_acc_box .hidden .additional_counter__single .people_age p:first-of-type {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 400 !important ;
  font-size: 1.01vw !important ; /*16px !important ;*/
  line-height: 1.3194vw !important ; /*19px !important ;*/
  color: #021011 !important ;
  margin-bottom: 6px !important ;
}

.web_acc_box .hidden .additional_counter__single .people_age h5 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 400 !important ;
  font-size: 0.733vw !important ; /*12px !important ;*/
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
  margin: 0 !important ;
  font-size: 0.87vw !important ; /*14px !important ;*/
  line-height: 1.11vw !important ; /*16px !important ;*/
  color: #021011 !important ;
}

.web_acc_box .hidden .additional_counter__single .actions img {
  cursor: pointer !important ;
}

.web_acc_box .activeBtn {
  background: #fff !important ;
  color: #ff7f51 !important ;
}

.web_acc_box .activeBtn svg path {
  fill: #ff7f51 !important ;
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
  background: #ff7f51 !important ;
  border-radius: 4px !important ;
  padding: 6px !important ;
}
.web_acc_box .room_left h3 {
  font-family: SFsemibold !important ;
  font-size: 10px !important ;
  line-height: 12px !important ;
  color: #ffffff !important ;
}

.web_acc_box {
  display: unset !important ;
}
.mobile_acc_box {
  display: none !important ;
}
@media all and (max-width: 768px) {
  .widget_form {
    width: 35vw !important ;
    transition: 0.5s all ease !important ;
    margin-left: 1vw !important ;
    background-color: white !important ;
    display: inline-block !important ;
    cursor: pointer !important ;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important ;
    border-radius: 3px !important ;
  }
  .widget_form img {
    margin-top: 14px;
  }
  .widget_form span {
    position: relative !important ;
    top: -3px !important ;
    font-weight: 400 !important ;
    font-size: 2.61vw !important ;
    line-height: 1.3194vw !important ; /*19px !important ;*/
    color: #001239 !important ;
  }

  .widget {
    margin: 5vw !important ;
    width: 85vw !important ;
  }
  .mobile_acc_box {
    display: unset !important ;
  }
  .web_acc_box {
    display: none !important ;
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
    font-size: 1.18vw !important ; /* 17px */
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
    font-size: 1.18vw !important ; /* 17px */
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
    color: #ff7f51 !important ;
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
    margin-bottom: 6px !important ;
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
    color: #ff7f51 !important ;
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
  border-bottom: 0px solid #ff7f51;
  padding-bottom: 6px !important ;
  color: #ff7f51;
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
  font-size: 1.01vw; /* 16px */
  line-height: 19px; /* 19px !important ; */
  text-align: center !important ;
  color: #001239;
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
  font-size: 0.802vw !important ; /* 13px */
  line-height: 1.11vw !important ; /* 16px !important ; */
  color: #bab8b8 !important ;
  margin: 0 !important ;
}

.single_service .price {
  padding-left: 8px !important ;
}
.single_service h3 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 1.08vw !important ; /* 17px */
  line-height: 1.388vw !important ; /* 20px !important ; */
  color: #ff7f51;
  margin-bottom: 2px !important ;
}
.single_service .price h1 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 1.08vw !important ; /* 17px */
  line-height: 1.388vw !important ; /* 20px !important ; */
  color: #ff7f51;
  margin-bottom: 2px !important ;
}

.single_service .title h2 {
  font-size: 0.941vw !important ; /* 15px */
  line-height: 1.25vw !important ; /* 18px !important ; */
  color: #001239;
  margin-bottom: 2px !important ;
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
  background: #ff7f51 !important ;
  border-radius: 4px !important ;
  padding: 6px !important ;
}

.mobile_acc_box .room_left h4 {
  font-family: SFsemibold !important ;
  font-weight: lighter !important ;
  font-size: 10px !important ;
  line-height: 12px !important ;
  color: #ffffff !important ;
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
  margin-bottom: 0 !important ;
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
  background-image: url("https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png");
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
.v-list-item__title {
  font-size: 1.01vw;
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
  border: 1px solid #ff7f51;
  background: #ff7f51;
  box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
  border-radius: 4px !important ;
  transition: 0.22s !important ;
  font-size: 16px !important ;
  line-height: 19px !important ;
  color: #ffffff;
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
  background: #fff;
  color: #ff7f51;
}

.mobile_acc_box .visible .description .additional button:hover svg path {
  fill: #ff7f51;
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
  background: #ff7f51;
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  color: #ffffff;
  box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
  border-radius: 4px !important ;
  transition: 0.22s !important ;
  border: 1px solid #ff7f51;
}

.mobile_acc_box .visible .description .price button:hover {
  background: #fff;
  color: #ff7f51;
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
  background: #ff7f51;
  font-size: 16px !important ;
  line-height: 19px !important ;
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  color: #ffffff;
  box-shadow: 0px 10px 30px rgba(255, 127, 81, 0.1);
  border-radius: 4px !important ;
  transition: 0.22s !important ;
  border: 1px solid #ff7f51;
}

.mobile_acc_box .visible .description .actions button:hover {
  background: #fff;
  color: #ff7f51;
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

.mobile_acc_box
  .hidden
  .additional_counter__single
  .people_age
  p:first-of-type {
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
  margin: 0 !important ;
  font-size: 14px !important ;
  line-height: 16px !important ;
  color: #021011 !important ;
}

.mobile_acc_box .hidden .additional_counter__single .actions img {
  cursor: pointer !important ;
}

.mobile_acc_box .activeBtn {
  background: #fff !important ;
  color: #ff7f51 !important ;
}

.mobile_acc_box .activeBtn svg path {
  fill: #ff7f51 !important ;
}

.mobile_acc_box .hidden-leave {
  position: absolute !important ;
  opacity: 0 !important ;
  display: none !important ;
}

@media all and (max-width: 768px) {
  .v-list-item__title {
    font-size: 3vw;
  }
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

  .single_service_p {
    font-family: "Roboto", sans-serif !important ;
    font-weight: 400 !important ;
    font-size: 13px !important ;
    line-height: 16px !important ;
    color: #bab8b8;
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
    margin-bottom: 6px !important ;
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
    color: #ff7f51 !important ;
  }

  .mobile_acc_box .hidden .additional_counter__single .people_age {
    width: 100px !important ;
  }

  .mobile_acc_box
    .hidden
    .additional_counter__single
    .people_age
    p:first-of-type {
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

.mobile_acc_box .swiper_container .slider_content {
  border-bottom: 0px solid #ff7f51 !important ;
  padding-bottom: 6px !important ;
  color: #ff7f51 !important ;
  font-size: 14px !important ;
  transition: 0.5s all ease !important ;
}
.slider_content_active {
  border-bottom: 1px solid #ff7f51 !important ;
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
  font-size: 16px;
  line-height: 19px;
  text-align: center !important ;
  color: #001239;
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
  color: #bab8b8 !important ;
  margin: 0 !important ;
}

.mobile_acc_box .single_service .price {
  padding-left: 8px !important ;
}

.mobile_services .single_service .price h1 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 17px !important ;
  line-height: 20px !important ;
  color: #ff7f51 !important ;
  margin-bottom: 2px !important ;
}

.mobile_services .single_service .title h2 {
  font-size: 15px !important ;
  line-height: 18px !important ;
  color: #001239 !important ;
  margin-bottom: 2px !important ;
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
  max-width: 47% !important ;
  display: inline-block !important ;
  vertical-align: top !important ;
  margin-top: 2vh !important ;
  margin-right: 3%;
}

.main_form h1 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 1.027vw !important ; /*22px !important ;*/
  line-height: 1.805vw !important ; /* 26px !important ; */
  text-transform: uppercase !important ;
  color: #001239 !important ;
  margin-bottom: 30px !important ;
}
.main_form_img {
  vertical-align: middle;
  width: 20px !important ;
  position: relative !important ;
  top: -1px !important ;
  margin-right: 10px !important ;
  background-color: lightgrey !important ;
  border-radius: 25px !important ;
  padding: 5px !important ;
  cursor: pointer !important ;
}

.main_form h5 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 400 !important ;
  font-size: 0.91vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  color: rgba(0, 18, 57, 0.5) !important ;
  margin-bottom: 30px !important ;
}

.main_form h2 {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 0.91vw !important ; /* 16px */
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
  font-size: 0.81vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  color: #001239 !important ;
  margin-bottom: 6px !important ;
}

label span {
  color: #ff7f51 !important ;
}

/* input {
  outline: none;
  border: 1px solid #bbc2d0;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 1.01vw;
  line-height: 1.31vw; 
  color: #001239;
} */

/* ::placeholder {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 400 !important ;
  font-size: 1.01vw !important ; 
  line-height: 1.31vw !important ; 
  color: #e9e9e9 !important ;
} */

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
    font-size: 3.5vw !important ; /* 1.180vw */
    line-height: 20px !important ; /* 1.388vw !important ; */
    margin-bottom: 18px !important ;
  }

  .main_form h5 {
    font-size: 10px !important ; /* 0.694vw */
    line-height: 12px !important ; /* 0.83vw !important ; */
    margin-bottom: 32px !important ;
  }

  .main_form h2 {
    font-size: 15px !important ; /* 1.041vw */
    line-height: 18px !important ; /* 1.25vw !important ; */
    margin-bottom: 12px !important ;
  }
  label {
    font-family: "Roboto", sans-serif !important ;
    font-weight: 400 !important ;
    font-size: 16px !important ; 
    line-height: 19px !important ; 
    color: #001239 !important ;
    margin-bottom: 6px !important ;
  }
  input {
    outline: none !important ;
    border: 0px solid #bbc2d0 !important ;
    box-sizing: border-box !important ;
    border-radius: 4px !important ;
    font-family: "Roboto", sans-serif !important ;
    font-weight: 400 !important ;
    font-size: 3.6vw !important ; 
    line-height: 19px !important ;
    color: #001239 !important ;
  }
  input[type="checkbox"] {
    appearance: auto !important;
    -webkit-appearance: auto !important;
  }
  ::placeholder {
    font-family: "Roboto", sans-serif !important ;
    font-weight: 400 !important ;
    font-size: 16px !important ; 
    line-height: 19px !important ; 
    color: #e9e9e9 !important ;
  }
}

.closeMobileCard {
  position: absolute !important ;
  z-index: 999 !important ;
  top: 24px !important ;
  right: 24px !important ;
  width: 16px !important ;
  height: 16px !important ;
}

/* sidebox часть для бронирования */

.main_card {
  background-color: white !important ;
  width: 100% !important ;
  position: relative !important ;
  left: -1% !important ;
  padding: 2% 5% !important ;
}

.disabled {
  opacity: 0.5 !important ;
  cursor: none !important ;
  pointer-events: none;
  touch-action: none;
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
.main_box_2 {
  width: 48% !important ;
  margin-left: 1% !important ;
  display: inline-block !important ;
  padding: 1.5% !important ;
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
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  text-transform: uppercase !important ;
  color: #001239 !important ;
  margin-bottom: 20px !important ;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  color: rgba(0, 18, 57, 0.5) !important ;
  margin-bottom: 6px !important ;
}

.box__header .descr__title {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  color: #001239 !important ;
  margin: 10px 0;
}

.box__header .descr__loc {
  display: flex !important ;
  align-items: center !important ;
  justify-content: flex-start !important ;
  font-family: "Roboto", sans-serif !important ;
  font-weight: 400 !important ;
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  color: #001239 !important ;
  margin: 7px 0
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
  font-size: 0.91vw !important ; /* 16px */
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
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  color: #001239 !important ;
  margin-bottom: 11px !important ;
  margin-top: 5px;
}

.dates p:last-of-type {
  margin-bottom: 0 !important ;
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
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  color: #ff7f51 !important ;
  margin-bottom: 12px !important ;
}

.time p:last-of-type {
  margin-bottom: 0 !important ;
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


.price div {
  display: block;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 2vw 0;
}

.price div p {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 400 !important ;
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  color: #001239;
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
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  text-transform: uppercase !important ;
  color: #ff7f51 !important ;
  margin: 0 !important ;
}

.sum_up__short {
  font-family: "Roboto", sans-serif !important ;
  font-weight: 400 !important ;
  font-size: 0.733vw !important ; /* 12px */
  line-height: 0.972vw !important ; /* 14px !important ; */
  color: rgba(0, 18, 57, 0.5) !important ;
  margin-bottom: 20px !important ;
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
  font-size: 1.01vw !important ; /* 16px */
  line-height: 1.31vw !important ; /* 19px !important ; */
  font-family: "Roboto", sans-serif !important ;
  font-weight: 500 !important ;
  color: #ffffff !important ;
  text-transform: none !important ;
  letter-spacing: normal !important ;
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

.box_links {
  color: #00b1bb !important ;
}

@media all and (max-width: 768px) {
  .sum_up button {
    display: flex !important ;
    align-items: center !important ;
    justify-content: center !important ;
    width: 100% !important ;
    height: 56px !important ;
    background: #ff7f51;
    border-radius: 4px !important ;
    font-size: 16px !important ; /* 16px */
    line-height: 1.31vw !important ; /* 19px !important ; */
    font-family: "Roboto", sans-serif !important ;
    font-weight: 500 !important ;
    color: #ffffff;
    text-transform: none !important ;
    letter-spacing: normal !important ;
  }
  .main_card {
    top: -15vh !important ;
  }
  .main_box_1 {
    padding-bottom: 120px !important ;
  }
  .main_box_2 {
    margin-left: 0vw !important ;
    width: 100vw !important ;
    padding: 2.5vw !important ;
    min-height: 100vh !important;
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
  .box__header .descr__name {
    font-size: 16px !important ;
    line-height: 19px !important ;
  }
  .dates p {
    font-size: 16px !important ;
    line-height: 19px !important ;
  }
  .time p {
    font-size: 16px !important ;
    line-height: 19px !important ;
  }
  .price div p {
    font-size: 16px !important ;
    line-height: 19px !important ;
  }
  .sum_up__value h4 {
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
  .sum_up__short {
    font-size: 12px !important ;
    line-height: 14px !important ;
  }
  .main_box_2 .price div {
    display: flex;
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
