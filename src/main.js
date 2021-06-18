import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element'
const axios = require('axios')
const moment = require('moment')
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
export default new Vuetify()

Vue.use(Vuetify)
Vue.use(vueCustomElement)
App.store = store
App.router = router
Vue.customElement('vue-widget', App)




Vue.component('acc-box', {
    props: {
      currentindex: Number,
      index: Number,
      item: Object
    },
    data: function () {
      return {
        currentSlide: 0,
        bookingsArray: {},
        updateKey: 1,
        loading: false,
        servicesList: [],
        selectServices: false,
        dialog: false,
        bookCount: 1,
        additional_counts: [this.item.additional_adult_count], // [this.item.adult_count],
        child_counts: [this.item.additional_child_count], // [this.item.adult_count + this.item.child_count]
        order_id: 0,
        text_button: localStorage.getItem("text_button"),
        accent_color: localStorage.getItem("accent"),
        primary: localStorage.getItem("primary"),
        text_color: localStorage.getItem("text")
      }
    },
    watch: {
      bookCount() {
        this.additional_counts = [];
        this.child_counts = [];
  
        for (let i = 0; i < this.bookCount; i++) {
          this.additional_counts.push(this.item.additional_adult_count);
          this.child_counts.push(this.item.additional_child_count);
        }
      }
    },
    computed:{
      pTextColor(){
        return {
          "color": this.text_color + " !important",
        }
      },
      btnAccentColor(){
        return {
          "background-color": this.accent_color + " !important",
          "color": this.text_button + " !important",
          "border": this.accent_color + " 1px solid"
        }
      },
      pAccentColor(){
        return {
          "color": this.accent_color + " !important",
        }
      },
      svgTextColor(){
        return {
          "fill": this.text_button + " !important",
        }
      },
      svgAccentColor(){
        return {
          "fill": this.accent_color + " !important",
        }
      },
      svgPrimaryColor(){
        return {
          "fill": this.primary + " !important",
        }
      },  
      pPrimaryColor(){
        return {
          "color": this.primary + " !important",
        }
      },
      h5TextColor(){
        return {
          "color": this.text_color + " !important",
          "opacity": "0.5"
        }
      },
  
  
    },
    methods: {
      scipServices() {
        // this.$router.push({
        //   path: "/Search/details/card",
        //   query: { ...this.$route.query, id: this.bookingsArray.order_id }
        // });
        alert("We are gonna to card!")
      },
      addServices() {
        let selected_services = [...this.servicesList]
        selected_services.map(list => {
          list.map((el, index) => {
            if (!el.quantity) {
              list.splice(index, 1)
            }
          })
        })
        let booking_service = {}
        this.bookingsArray.bookings.map((elem, index) => {
          booking_service[elem.id] = selected_services[index]
        })
        for (const [key, value] of Object.entries(booking_service)) {
          value.map(el => {
            el.booking = Number(key)
            el.service = el.id
            el.order_id = this.bookingsArray.order_id
          })
        }
        axios.post(`http://185.121.81.239/api/booking-module/add/services/`, booking_service).then(() => {
          alert("We are gonna to card")
        })
      },
      slideChanged(e) { // swiper для картинок
        this.currentSlide = e.activeIndex
      },
      selectRoom(idx) { // swiper для картинок
        this.currentSlide = idx
      },
      serviceMath(num, idx) { // для swipera
        this.servicesList[this.currentSlide][idx].quantity+=num
        this.updateKey++
      },
      addBookCount(num) { // для увел/уменьшения кол-ва номеров для брони
        let check = this.bookCount + num;
        if (check > 0 && check <= this.item.room_count) {
          this.bookCount += num;
        }
      },
      getMainimage() { // главная картинка в список каждого
        let image = "";
        if (this.item.images.length) {
          this.item.images.map(el => {
            if (el.is_main) {
              image = el.image;
              return;
            }
          });
        }
        return image;
      },
      roomCounter(room) { // окончания слова
        if (room == 1) return `остался ${room} номер`;
        if ((room >= 21 && room <= 24) || (room >= 2 && room <= 4))
          return `осталось ${room} номера`;
        return `осталось ${room} номеров`;
      },
      showAdditional() { // проверка на блок с дополнительной инфой
        if (this.currentindex == this.index) {
          this.$emit("set-active", null);
          return;
        }
        this.$emit("set-active", this.index);
      },
      getServices() {
        this.loading = true
        let id = localStorage.getItem("id_company")
        axios.get(`http://185.121.81.239/api/booking-module/service/list/${id}/`).then(res => {
          let arr = res
          this.servicesList = []
          arr.map(el => {
            el.quantity = 0
          })
          for (let i=0;i<this.bookCount;i++){
            this.servicesList.push(JSON.parse(JSON.stringify(arr)))
          }
          this.loading = false
        })
      },
      goBooking() {
        let check_in = `${
          localStorage.getItem("date_form")
        } ${this.item.check_in_time.substring(0, 5)}`;
        let check_out = `${
          localStorage.getItem("date_to")
        } ${this.item.check_out_time.substring(0, 5)}`;
  
        let reserve = {
          category: this.item.id,
          room_count: this.bookCount,
          check_in,
          check_out,
          child_counts: this.child_counts,
          additional_counts: this.additional_counts,
          // tour_operator: this.item.tour_operator
        };
        axios.post("http://185.121.81.239/api/booking-module/reserve/", reserve)
        .then(res => {
          this.order_id = res.data.bookings[0]
          for(let i = 0; i < res.data.bookings.length; i++){
            this.order_id = res.data.bookings[i]
            let stored_datas = JSON.parse(localStorage["orders"]);
            stored_datas.push(this.order_id)
            localStorage.setItem("orders", JSON.stringify(stored_datas))
          }
  
  
          var size = localStorage.getItem("orders").length
          var bookings_id = localStorage.getItem("orders").substring(1, size-1)
          console.log(bookings_id.length, bookings_id)
          axios.get("http://185.121.81.239/api/booking-module/order/detail/", { 
            params: 
              { 
                bookings_id: bookings_id 
              },
          })
          .then(res => {
            if(res){
              this.$emit('toggle', res.data);
              this.$emit('change-form')
            }
            else{
              console.log("error on fetching order card")
            }
          });
  
        })
        .catch(error=>{
            console.log(error)
          alert("В выбранной категории не достаточно номеров")
        });
  
  
  
      }
    },
    mounted(){
      let text_p = document.querySelectorAll("#app p, h1, h2, h3, strong")
      let text = localStorage.getItem("text")
      for (let i = 0; i < text_p.length; i++) {
        text_p[i].setAttribute( 'style', 'color:'+ text+'  !important' );
      }
    },
    template: `
  <div>
    <div class="main_box" :class="{ mainActive: index == currentindex }">
      <div class="visible">
        <div
          @click="dialog = true"
          class="avatar"
          :style="[
            getMainimage()
              ? { backgroundImage: 'url(' + getMainimage() + ')' }
              : {
                  backgroundImage: url('https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png')
                }
          ]"
        >
          <div v-show="item.images.length > 0" class="avatar__count">
            <p>1/{{ item.images.length }}</p>
          </div>
        </div>
        <div class="description">
          <div class="titles">
            <h2>{{ item.name }}</h2>
            <p class="titles__main">
              {{ item.description }}
            </p>
            <div class="tags_list">
              <p v-for="(tag, idx) in item.tags" :key="idx">
                <svg height="5" width="5">
                  <circle cx="2" cy="2" r="2" stroke-width="3" :style="svgPrimaryColor" />
                </svg> 
                {{ tag }}
              </p>
            </div>
            <div
              v-show="item.adult_count + item.child_count > 0"
              class="additional"
            >
              <h4 :style="pAccentColor">Есть {{ item.adult_count + item.child_count }} доп. места</h4>
              <button
                :style="btnAccentColor"
                class="widget_button_accent_color_2"
                @click="showAdditional()"
                :class="{ activeBtn: index == currentindex }"
              >
                <svg
                  width="16"
                  height="11"
                  viewBox="0 0 16 11"
                  :fill="text_button"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                  :style="svgTextColor"
                    d="M1.82154 3.31989C1.82154 2.41659 2.5009 1.68166 3.33598 1.68166H6.73554C7.26342 1.68166 7.72885 1.97555 8 2.41978C8.27118 1.97551 8.73658 1.68166 9.26447 1.68166H12.6641C13.4991 1.68166 14.1785 2.41659 14.1785 3.31989V3.39533H14.5576V1.79782C14.5576 0.806498 13.812 0 12.8956 0H3.10436C2.18794 0 1.44238 0.806498 1.44238 1.79782V3.39533H1.82151V3.31989H1.82154Z"
                    :fill="text_button"
                  />
                  <path
                  :style="svgTextColor"
                    d="M15.3635 4.1604H0.636489C0.285527 4.1604 0 4.46927 0 4.84891V8.84589C0 9.22553 0.285527 9.5344 0.636489 9.5344H0.901442L0.588382 10.4902C0.523147 10.6893 0.619526 10.9079 0.803572 10.9784C0.842634 10.9934 0.882491 11.0005 0.921685 11.0005C1.06723 11.0005 1.2036 10.9025 1.25499 10.7456L1.65174 9.53436H14.3483L14.745 10.7456C14.7964 10.9025 14.9327 11.0005 15.0783 11.0005C15.1175 11.0005 15.1574 10.9934 15.1964 10.9784C15.3805 10.9079 15.4769 10.6893 15.4116 10.4902L15.0986 9.5344H15.3635C15.7145 9.5344 16 9.22553 16 8.84589V4.84891C16 4.46927 15.7145 4.1604 15.3635 4.1604Z"
                    :fill="text_button"
                  />
                  <path
                  :style="svgTextColor"
                    d="M9.26425 2.44531C8.81916 2.44531 8.45703 2.837 8.45703 3.31847V3.39391H13.471V3.31847C13.471 2.837 13.1089 2.44531 12.6638 2.44531H9.26425Z"
                    :fill="text_button"
                  />
                  <path
                    :style="svgTextColor"
                    d="M3.33602 2.44531C2.8909 2.44531 2.52881 2.83704 2.52881 3.31851V3.39391H7.5428V3.31847C7.5428 2.837 7.1807 2.44531 6.73558 2.44531H3.33602Z"
                    :fill="text_button"
                  />
                </svg>
                Доп. место
              </button>
            </div>
          </div>
          <div class="price">
            <h2>
              {{
                (item.price * bookCount +
                  (additional_counts.reduce((a, b) => a + b) * item.adult_price +
                    child_counts.reduce((a, b) => a + b) * item.child_price) -
                  item.additional_adult_count * item.adult_price -
                  item.additional_child_count * item.child_price).toLocaleString('ru-RU')
              }}
              KZT
            </h2>
            <p>Цена за всех</p>
          </div>
          <div class="actions">
            <h4 :style="pPrimaryColor">
              {{ roomCounter(item.room_count) }}
            </h4>
            <p>
            <svg :style="svgAccentColor" @click="addBookCount(-1)" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
              {{ bookCount }}
            <svg :style="svgAccentColor" @click="addBookCount(1)" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
  
            </p>
            <button class="widget_button_accent_color" :style="btnAccentColor" @click="goBooking">Выбрать</button>
          </div>
        </div>
      </div>
      <transition name="hidden">
        <div
          class="hidden"
          v-show="index == currentindex && item.adult_count + item.child_count > 0"
        >
          <div v-for="idx in bookCount" :key="idx" style="width100%;height:100%">
            <h2 :style="pTextColor">Добавить доп. место</h2>
            <div class="additional_counter">
              <div class="additional_counter__single">
                <h3 :style="pTextColor">{{ item.adult_price.toLocaleString('ru-RU') }} KZT</h3>
                <div class="people_age">
                  <p :style="pTextColor">Взрослый</p>
                  <h5 :style="h5TextColor">Старше {{ item.child_age }} лет</h5>
                </div>
                <div class="actions" :style="pTextColor">
                  <v-btn
                    icon
                    @click="
                      additional_counts.splice(
                        idx - 1,
                        1,
                        additional_counts[idx - 1] - 1
                      )
                    "
                    :disabled="additional_counts[idx - 1] === 0"
                  >
                  <svg :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
                  </v-btn>
  
                  <p :style="pTextColor">{{ additional_counts[idx - 1] }}</p> 
  
                  <v-btn
                    icon
                    @click="
                      additional_counts.splice(
                        idx - 1,
                        1,
                        additional_counts[idx - 1] + 1
                      )
                    "
                    :disabled="
                      item.child_count - child_counts[idx - 1] >= 0
                        ? additional_counts[idx - 1] === item.adult_count
                        : additional_counts[idx - 1] ===
                          item.adult_count -
                            (child_counts[idx - 1] - item.child_count)
                    "
                  >
                  <svg :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
  
                  </v-btn>
                </div>
              </div>
              <div class="additional_counter__single">
                <h3 :style="pTextColor">{{ item.child_price.toLocaleString('ru-RU') }} KZT</h3>
                <div class="people_age">
                  <p :style="pTextColor">Детский</p>
                  <h5 :style="h5TextColor">До {{ item.child_age }} лет</h5>
                </div>
                <div class="actions" :style="pTextColor">
                  <v-btn
                    icon
                    @click="
                      child_counts.splice(idx - 1, 1, child_counts[idx - 1] - 1)
                    "
                    :disabled="child_counts[idx - 1] === 0"
                  >
                    <svg :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
  
                  </v-btn>
  
                  <p :style="pTextColor">{{ child_counts[idx - 1] }}</p> 
  
                  <v-btn
                    icon
                    @click="
                      child_counts.splice(idx - 1, 1, child_counts[idx - 1] + 1)
                    "
                    :disabled="
                      child_counts[idx - 1] ===
                        item.child_count +
                          (item.adult_count - additional_counts[idx - 1])
                    "
                  >
                  <svg :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
  
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <v-dialog width="700" v-model="dialog">
        <v-carousel>
          <v-carousel-item
            v-for="(image, idx) in item.images"
            :key="idx"
            :src="image.image"
          ></v-carousel-item>
        </v-carousel>
      </v-dialog>
    </div>
    <v-dialog v-model="selectServices" fullscreen hide-overlay>
      <div class="mobile_services">
        <div class="mobile_header">
          <img @click="selectServices = false" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/backmobile.svg">
          <p>Выбрать номер</p>
        </div>
        <client-only>
          <div
            class="swiper-container swiper_container"
            ref="mySwiper"
            :options="swiperOptions"
            @slideChange="slideChanged($event)"
          >
            <div class="swiper-slide" v-for="(i, idx) in bookCount" :key="i"  >
              <div class="slider_content" @click="selectRoom(idx)">
                {{i}} номер
              </div>
            </div>
          </div>
        </client-only>
        <div class="service_wrapper">
          <div class="single_service" v-for="(service, index) in servicesList[currentSlide]" :key="service.id">
            <div class="title">
              <h2>{{service.name}}</h2>
              <p>{{service.service_type == 'once' ? 'Единоразовая' : 'Суточная'}}</p>
            </div>
            <div class="price">
              <h1>{{service.price.toLocaleString('ru-RU')}} KZT</h1>
              <p>за 1 гостя</p>
            </div>
            <div class="actions" :key="updateKey">
              <img @click="serviceMath(-1, index)" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/details/minus.png"/>
              {{service.quantity}}
              <img @click="serviceMath(+1, index)" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/details/plus.png"/>
            </div>
          </div>
        </div>
        <div class="mobile_services__footer">
          <v-col cols="12">
            <v-row justify="center" align="center">
              <v-btn @click="addServices" color="primary">Добавить</v-btn>
              <v-btn @click="scipServices" class="ml-2" color="primary" outlined>Пропустить</v-btn>
            </v-row>
          </v-col>
        </div>
      </div>
      <v-overlay :value="loading">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#FF7F51"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-dialog>
  </div>
    `,
  
  })
  
  
  
  Vue.component('acc-form', {
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
    mounted(){
      let text_p = document.querySelectorAll("#app p, h1, h2, h3, strong")
      let text = localStorage.getItem("text")
      for (let i = 0; i < text_p.length; i++) {
        text_p[i].setAttribute( 'style', 'color:'+ text+'  !important' );
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
  
        axios.post("http://185.121.81.239/api/go2trip/v2/accommodation/book/", data)
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
    },
    template: 
    `
    <div class="main_form">
    <h1><img class="main_form_img" @click="back" src="https://img.icons8.com/ios/452/back--v1.png">Оформление бронирования</h1>
    <h5 :style="h5TextColor">
      Введите корректные контактные данные, на которые будет оформлен билет.
      После совершения оплаты на указанный email будет выслано письмо с
      подтверждением и номером брони.
    </h5>
    <h2>Контактная информация</h2>
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
          <label for="name":style="pTextColor">Вид документа <span>*</span></label>
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
        value="http://185.121.81.239/go2trip/#/"
      >
      <input
        type="hidden"
        name="PostLink"
        value="http://185.121.81.239/api/go2trip/v2/booking-complete/"
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
    `
  });
  
  
  
  Vue.component('side-box', {
    props: {
      ordercard: Array,
      accomodationsubmit: Function,
      submitaccbtnloading: Object
    },
    data: () => ({
      test: 0,
      currentItem: {},
      serviceData: {},
      servicesList: [],
      selectedServicesList: [],
      openServicesLoading: false,
      servicePostLoading: false,
      dialog: false,
      isTime: false,
      checked: false,
      services: [],
      width: window.innerWidth,
      primary: localStorage.getItem("primary"),
      accent: localStorage.getItem("accent"),
      text_button: localStorage.getItem("text_button"),
      text_color: localStorage.getItem("text"),
    }),
    watch: {
      tabModel() {
        if(this.checked || !this.checked){
          let buttons = document.querySelectorAll(".widget_button_primary_color")
          let primary = localStorage.getItem("primary") 
          console.log(primary)
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute( 'style', 'background-color:'+ primary+'  !important' );
          }
        }
        if(this.width > 768 || this.width <= 768){
          let buttons = document.querySelectorAll(".widget_descr button")
          let primary = localStorage.getItem("primary") 
          console.log(primary)
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute( 'style', 'background-color:'+ primary+'  !important' );
          }
        }
      },
      dialog() {
        if (!this.dialog) {
          this.currentItem = {};
        }
      },
      my_quantity(idx) {
        return this.servicesList[idx].quantity;
      }
    },
    methods: {
      bookRooms(){
        let clients = [{
          first_name: this.$store.state.person.first_name,
          last_name: this.$store.state.person.last_name,
          patronymic: null,
          phone_number: this.$store.state.person.phone_number,
          email: this.$store.state.person.email,
          birth_date: null, 
          id_card: this.$store.state.person.document_number,
          gender: null, 
          comment: this.$store.state.person.comment,
          is_child: false
        }]
        console.log(localStorage.getItem("orders"))
        let bookings_id = JSON.parse(localStorage.getItem("orders"))
        let data = {clients: clients, bookings_id: bookings_id}
  
  
        console.log(this.$store.state.person.first_name.length, this.$store.state.person.last_name.length, this.$store.state.person.email.length)
        if(this.$store.state.person.first_name.length > 0 && this.$store.state.person.last_name.length > 0 && this.$store.state.person.email.length > 0){
            axios.post("http://185.121.81.239/api/booking-module/book/", data)
            .then(res => {
              if(res.status == 200){
                alert("Вы успешно забронировали номер")
                localStorage.setItem("orders", [])
              }
              else{
                console.log(res)
              }
            })
            .catch(error => {
                console.log(error)
              alert("Что-то пошло не так")
            });
        }
        else{
          alert("Заполните данные")
        }
        
      },
      peopleRead() {
        let adult = localStorage.getItem("adult_count");
        let child = localStorage.getItem("children_count");
        let a = "";
        let b = "";
  
        if (adult == 1) a = adult + " взрослый ";
        else a = adult + " взрослых ";
  
        if (child == 0) b = "";
        else if (child == 1) b = child + " ребенок";
        else b = child + " ребенка";
  
        return a + b;
      },
      refreshPage() {
        this.$emit("refresh-page");
      },
      serviceMath(num, service, idx) {
        this.test += num;
        let check = service.quantity + num;
        if (check >= 0) {
          this.servicesList[idx].quantity += num;
        }
      },
      addService(service, idx) {
        this.servicePostLoading = true;
        let data = {
          service: service.id,
          quantity: this.servicesList[idx].quantity,
          booking: this.currentItem.id
        };
        let dataWithPrice = {
          service: service.id,
          quantity: this.servicesList[idx].quantity,
          booking: this.currentItem.id,
          price: service.price,
          name: service.name
        }
        axios.post("http://185.121.81.239/api/booking-module/add/services/", data).then(resp => {
            console.log(resp)
          this.selectedServicesList.push(dataWithPrice)
          this.servicePostLoading = false;
  
  
          axios.get("http://185.121.81.239/api/booking-module/order/detail/", { 
          params: 
            { 
              bookings_id: bookings_id 
            },
          })
          .then(res => {
            if(res){
              this.$emit('toggle', res.data);
            }
            else{
              console.log("error on fetching order card")
            }
          });
  
  
  
        });
        var size = localStorage.getItem("orders").length
        var bookings_id = localStorage.getItem("orders").substring(1, size-1)
  
        
  
  
      },
      openServices(item) {
        this.currentItem = item;
        this.openServicesLoading = true;
        let id = localStorage.getItem("id_company")
        axios.get(`http://185.121.81.239/api/booking-module/service/list/${id}/`)
          .then(res => {
            this.servicesList = res.data;
            [...this.servicesList].forEach(item => {
              item.quantity = 0;
              this.currentItem.services.forEach(serv => {
                if (item.id == serv.id) {
                  item.quantity = serv.quantity;
                }
              });
            });
            this.openServicesLoading = false;
            this.dialog = true;
          });
      },
      formatZoneType(name) {
        let label = "";
        if (name == "rest_zone") {
          label = "Зона отдыха";
        } else if (name == "hotel") {
          label = "Отель";
        } else if (name == "guest_house") {
          label = "Гостевой дом";
        } else {
          label = "Санаторий";
        }
        return label;
      },
      formatDate(date) {
        return moment.unix(date).format("DD - MMM YYYY");
      },
      totalPrice() {
        let price = 0;
        this.ordercard.map(el => {
          price += Number(el.price);
        });
        this.selectedServicesList.map(el => {
          price += Number(el.price)
        })
        return price;
      },
      getmainImage(item) {
        let mainImg = "";
        item.room.images.map(el => {
          if (el.is_main) {
            mainImg = el.image;
          }
        });
        return mainImg;
      }
    },
    computed:{
      updatedordercard(){
        return this.ordercard
      },
      pTextColor(){
        return {
          "color": this.text_color + " !important",
        }
      },
      h5TextColor(){
        return {
          "color": this.text_color + " !important",
          "opacity": "0.5"
        }
      },
      btnPrimaryStyles(){
        return {
          "background-color": this.primary + " !important",
          "color": this.text_button + " !important",
        }
      },
      pPrimaryColor(){
        return {
          "color": this.primary + " !important",
        }
      },
      divPrimaryColor(){
        return {
          "background": this.primary + " !important",
        }
      },
      pAccentColor(){
        return {
          "color": this.accent + " !important",
        }
      },
      svgAccentColor(){
        return {
          "fill": this.accent + " !important",
        }
      }
  
    },
    mounted(){
      let primary = localStorage.getItem("primary") 
      
      Array.from(document.querySelectorAll('.widget_descr button')).map(function(button) {
        button.setAttribute( 'style', 'background-color:'+ primary+'  !important' );
      })
  
      let text_p = document.querySelectorAll("#app p, h1, h2, h3, strong")
      let text = localStorage.getItem("text")
      for (let i = 0; i < text_p.length; i++) {
        text_p[i].setAttribute( 'style', 'color:'+ text+'  !important' );
      }
    },
    template:
    `
    <div class="main_box main_box_2">
      <div class="box" v-for="(item, idx) in updatedordercard" :key="idx">
        <!-- <img class="garbage" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/garbage.png" /> -->
        <h2 @click="xxx(item)" class="box__title" :style="pTextColor">{{ item.room_name }}</h2>
        <div class="box__header">
          <div
            class="avatar"
            :style="{ backgroundImage: 'url(' + getmainImage(item) + ')' }"
          />
          <div class="descr widget_descr">
            <div>
              <h5 :style="h5TextColor" class="descr__type">
                {{ formatZoneType(item.hotel.accommodation_type) }}
              </h5>
              <p :style="pTextColor" class="descr__title">{{ item.hotel_name }}</p>
              <p :style="pTextColor" class="descr__loc">
                <img src="https://marketbot.abelsharman.kz/widget_go2trip/assets/loc.png" />
                {{ item.place.name }}
              </p>
              <p :style="pTextColor" class="descr__name">{{ item.room.name }}</p>
              <v-btn
                v-if="width > 768"
                color="primary"
                :style="btnPrimaryStyles"
                @click="openServices(item)"
                :loading="openServicesLoading"
                >Дополнительная услуга +</v-btn
              >
            </div>
          </div>
        </div>
        <div class="dates">
          <p :style="pTextColor">
            <img src="https://marketbot.abelsharman.kz/widget_go2trip/assets/calendar.png" />{{
              formatDate(item.check_in)
            }}
            - {{ formatDate(item.check_out) }}
          </p>
          <p :style="pTextColor">
            <img src="https://marketbot.abelsharman.kz/widget_go2trip/assets/user_1.png" />
            {{ peopleRead() }}
          </p>
        </div>
        <div class="time">
          <p :style="pPrimaryColor">
            Время заезда:
            <strong :style="pTextColor">{{ item.hotel.check_in_time.substring(0, 5) }}</strong>
            <!-- <img
              @click="isTime = true"
              src="https://marketbot.abelsharman.kz/widget_go2trip/assets/edit.png"
            /> -->
          </p>
          <p :style="pPrimaryColor">
            Время выезда:
            <strong :style="pTextColor">{{ item.hotel.check_out_time.substring(0, 5) }}</strong>
          </p>
        </div>
  
  
  
        <div v-show="item.services.length && width > 768" class="additional_service">
          <h2 :style="pTextColor">дополнительные услуги</h2>
          <v-row
            v-for="(elem, idx) in item.services"
            :key="idx"
            class="px-3"
            align="center"
          >
            <p :style="pTextColor"> {{ elem.name }} х {{ elem.quantity }}</p>
            <v-spacer />
            <p :style="pTextColor">{{ elem.price.toLocaleString('ru-RU') }} KZT</p>
          </v-row>
        </div>
  
  
  
        <div v-show="item.services.length && width <= 768" class="additional_service">
          <h2 :style="pTextColor">дополнительные услуги</h2>
          <v-row
            v-for="(elem, idx) in item.services"
            :key="idx"
            class="px-3"
            align="center"
          >
            <p :style="pTextColor">{{ elem.name }} х {{ elem.quantity }}</p>
            <v-spacer />
            <p :style="pTextColor">{{ elem.price.toLocaleString('ru-RU') }} KZT</p>
          </v-row>
        </div>
  
  
        <div class="price">
          <div style="display: flex;">
            <p :style="pTextColor">{{ item.nights }} ночей</p>
            <p :style="pTextColor">{{ item.price.toLocaleString('ru-RU') }} KZT</p>
          </div>
        </div>
        <div :style="divPrimaryColor" class="custom_border" />
      </div>
      <div class="sum_up">
        <div class="sum_up__value">
          <h4 :style="pPrimaryColor">Итого</h4>
          <h4 :style="pPrimaryColor">{{ totalPrice().toLocaleString('ru-RU') }} KZT</h4>
        </div>
        <!-- <p class="sum_up__short">
          Нажимая на кнопку вы соглашаетесь на обработку персональных данных,
          согласно
          <span>
            <a class="box_links" target="_blank" to="/policy">политике конфиденциальности</a>
          </span
          >, а также подтверждаете свое согласие с <span>правилами сервиса</span>
          <input class="ml-2" type="checkbox" id="checkbox" v-model="checked" >
        </p> -->
  
        
  
        <h5 :style="h5TextColor" class="sum_up__short">
          Ознакомьтесь с
          <a class="box_links" target="_blank" to="/offer">договором оферты</a>
          и
          <a class="box_links" target="_blank" to="/policy">политикой конфиденциальности</a>
          <input class="ml-2" type="checkbox" id="checkbox" v-model="checked" >
        </h5>
        <v-btn
          v-if="!checked"
          :loading="submitaccbtnloading.ready"
          color="primary disabled"
          class="widget_button_primary_color"
          :style="btnPrimaryStyles"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6.36719V5.3125C20 4.10438 19.0206 3.125 17.8125 3.125H2.1875C0.979375 3.125 0 4.10438 0 5.3125V6.36719C0 6.47504 0.0874609 6.5625 0.195312 6.5625H19.8047C19.9125 6.5625 20 6.47504 20 6.36719Z"
              fill="white"
            />
            <path
              d="M0 8.00781V14.6875C0 15.8956 0.979375 16.875 2.1875 16.875H17.8125C19.0206 16.875 20 15.8956 20 14.6875V8.00781C20 7.89996 19.9125 7.8125 19.8047 7.8125H0.195312C0.0874609 7.8125 0 7.89996 0 8.00781ZM5 13.125C5 13.4702 4.72016 13.75 4.375 13.75H3.75C3.40484 13.75 3.125 13.4702 3.125 13.125V12.5C3.125 12.1548 3.40484 11.875 3.75 11.875H4.375C4.72016 11.875 5 12.1548 5 12.5V13.125Z"
              fill="white"
            />
          </svg>
          Забронировать
        </v-btn>
        <v-btn
          v-else="checked"
          @click="bookRooms()"
          :loading="submitaccbtnloading.ready"
          color="primary"
          class="widget_button_primary_color"
          :style="btnPrimaryStyles"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6.36719V5.3125C20 4.10438 19.0206 3.125 17.8125 3.125H2.1875C0.979375 3.125 0 4.10438 0 5.3125V6.36719C0 6.47504 0.0874609 6.5625 0.195312 6.5625H19.8047C19.9125 6.5625 20 6.47504 20 6.36719Z"
              fill="white"
            />
            <path
              d="M0 8.00781V14.6875C0 15.8956 0.979375 16.875 2.1875 16.875H17.8125C19.0206 16.875 20 15.8956 20 14.6875V8.00781C20 7.89996 19.9125 7.8125 19.8047 7.8125H0.195312C0.0874609 7.8125 0 7.89996 0 8.00781ZM5 13.125C5 13.4702 4.72016 13.75 4.375 13.75H3.75C3.40484 13.75 3.125 13.4702 3.125 13.125V12.5C3.125 12.1548 3.40484 11.875 3.75 11.875H4.375C4.72016 11.875 5 12.1548 5 12.5V13.125Z"
              fill="white"
            />
          </svg>
          Забронировать
        </v-btn>
      </div>
      <v-dialog v-model="dialog" width="789">
        <v-card class="services_pop">
          <img
            @click="dialog = false"
            class="close"
            src="https://marketbot.abelsharman.kz/widget_go2trip/assets/close.png"
          />
          <h2 :style="pTextColor">
            {{ servicesList.length ? "Дополнительные услуги" : "Услуг нет" }}
          </h2>
          <div
            class="single_service"
            v-for="(service, idx) in servicesList"
            :key="idx"
          >
            <div class="single_service__title">
              <h3 :style="pTextColor">{{ service.name }}</h3>
              <h5 :style="h5TextColor">
                {{
                  service.service_type == "once" ? "Единоразовая" : "Посуточно"
                }}
              </h5>
            </div>
            <div class="actions">
              <div class="actions__price">
                <h1 :style="pAccentColor">{{ service.price.toLocaleString('ru-RU') }} KZT</h1>
                <h5 :style="h5TextColor">за 1 гостя</h5>
              </div>
              <div class="actions__count">
                <svg :style="svgAccentColor" style="cursor: pointer;" @click="serviceMath(-1, service, idx)" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
                  <p :style="pTextColor" :key="test">{{ service.quantity }}</p>
                <svg :style="svgAccentColor" style="cursor: pointer;" @click="serviceMath(+1, service, idx)" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
              </div>
              <v-btn
                color="primary"
                class="text--white"
                :style="btnPrimaryStyles"
                @click="addService(service, idx)"
                >Добавить</v-btn
              >
            </div>
          </div>
          <v-overlay :value="servicePostLoading">
            <v-progress-circular
              :size="70"
              :width="7"
              color="#FF7F51"
              indeterminate
            ></v-progress-circular>
          </v-overlay>
        </v-card>
      </v-dialog>
    </div>
    `
  })
  
  
  
  Vue.component('mobile-acc-box', {
    props: {
      currentindex: Number,
      index: Number,
      item: Object
    },
    data() {
      return {
        currentSlide: 0,
        bookingsArray: [],
        updateKey: 1,
        order_id: 0,
        loading: false,
        servicesList: [],
        swiperOptions: {
          slidesPerView: 'auto',
          centeredSlides: true
        },
        selectServices: false,
        dialog: false,
        bookCount: 1,
        additional_counts: [this.item.additional_adult_count],
        child_counts: [this.item.additional_child_count],
        text_color: localStorage.getItem("text"),
        primary: localStorage.getItem("primary"),
        text_button: localStorage.getItem("text_button"),
        accent_color: localStorage.getItem("accent"),
      };
    },
    watch: {
      bookCount() {
        this.additional_counts = [];
        this.child_counts = [];
        for (let i = 0; i < this.bookCount; i++) {
          this.additional_counts.push(this.item.additional_adult_count);
          this.child_counts.push(this.item.additional_child_count);
        }
      }
    },
    computed:{
      pSliderTextColor(){
        return {
          "color": this.text_color + " !important",
          "border-color": this.text_color + " !important",
        }
      },
      pTextColor(){
        return {
          "color": this.text_color + " !important",
        }
      },
      h4TextButton(){
        return {
          "color": this.text_button + " !important",
        }
      },
      divPrimary(){
        return {
          "background-color": this.primary + " !important",
        }
      },
      h5TextColor(){
        return {
          "color": this.text_color + " !important",
          "opacity": "0.5"
        }
      },
      btnAccentColor(){
        return {
          "background-color": this.accent_color + " !important",
          "color": this.text_button + " !important",
          "border-color": this.accent_color
        }
      },
      btnAccentColor2(){
        return {
          "background-color": this.text_button + " !important",
          "color": this.accent_color + " !important",
          "border-color": this.accent_color
        }
      },
      pAccentColor(){
        return {
          "color": this.accent_color + " !important",
        }
      },
      svgTextColor(){
        return {
          "fill": this.text_button + " !important",
        }
      },
      svgAccentColor(){
        return {
          "fill": this.accent_color + " !important",
        }
      },
      svgPrimaryColor(){
        return {
          "fill": this.primary + " !important",
        }
      },  
      pPrimaryColor(){
        return {
          "color": this.primary + " !important",
        }
      },
    },
    mounted(){
      let text_p = document.querySelectorAll("#app p, h1, h2, h3, strong")
      let text = localStorage.getItem("text")
      for (let i = 0; i < text_p.length; i++) {
        text_p[i].setAttribute( 'style', 'color:'+ text+'  !important' );
      }
    },
    methods: {
      scipServices() {
        var size = localStorage.getItem("orders").length
        var bookings_id = localStorage.getItem("orders").substring(1, size-1)
        console.log(bookings_id.length, bookings_id)
        axios.get("http://185.121.81.239/api/booking-module/order/detail/", { 
          params: 
            { 
              bookings_id: bookings_id 
            },
        })
        .then(res => {
          if(res){
            this.selectServices = false
            this.$emit('toggle', res.data);
            this.$emit('change-form')
          }
          else{
            console.log("error on fetching order card")
          }
        });
      },
      addServices() {
        let selected_services = [...this.servicesList]
        selected_services.map(list => {
          list.map((el, index) => {
            if (!el.quantity) {
              list.splice(index, 1)
            }
          })
        })
        console.log(selected_services, selected_services.length)
        let booking_service = {
          services: []
        }
        // this.bookingsArray.bookings.map((elem, index) => {
        //   booking_service[elem.id] = selected_services[index]
        // })
        // for (const [key, value] of Object.entries(booking_service)) {
        //   value.map(el => {
        //     el.booking = Number(key)
        //     el.service = el.id
        //     el.order_id = this.bookingsArray.order_id
        //   })
        // }
        for(let j = 0; j < this.servicesList.length; j++){
          for(let i = 0; i < selected_services[j].length; i++){
            if(selected_services[j][i].quantity > 0){
              booking_service.services.push({
                quantity: selected_services[j][i].quantity,
                booking: this.bookingsArray[j],
                service: selected_services[j][i].id
              })
            }
          }
        }
      
        console.log(selected_services)
        axios.post(`http://185.121.81.239/api/booking-module/bulk/add/services/`, booking_service).then(() => {
          // this.$emit('toggle', res.data);
          this.selectServices = false
          this.$emit("change-form")
  
          var size = localStorage.getItem("orders").length
          var bookings_id = localStorage.getItem("orders").substring(1, size-1)
          axios.get("http://185.121.81.239/api/booking-module/order/detail/", { 
            params: 
              { 
                bookings_id: bookings_id 
              },
          })
          .then(res => {
            if(res){
              console.log(res.data)
              this.$emit('toggle', res.data);
            }
            else{
              console.log("error on fetching order card")
            }
          });
        })
  
  
  
        
  
      },
      slideChanged(e) {
        this.currentSlide = e.activeIndex
      },
      selectRoom(idx) {
        this.currentSlide = idx
      },
      serviceMath(num, idx) {
        this.servicesList[this.currentSlide][idx].quantity+=num
        console.log(this.servicesList)
        this.updateKey++
      },
      addBookCount(num) {
        let check = this.bookCount + num;
        if (check > 0 && check <= this.item.room_count) {
          this.bookCount += num;
        }
      },
      getMainimage() {
        let image = "";
        if (this.item.images.length) {
          this.item.images.map(el => {
            if (el.is_main) {
              image = el.image;
              return;
            }
          });
        }
        return image;
      },
      roomCounter(room) {
        if (room == 1) return `остался ${room} номер`;
        if ((room >= 21 && room <= 24) || (room >= 2 && room <= 4))
          return `осталось ${room} номера`;
        return `осталось ${room} номеров`;
      },
      showAdditional() {
        if (this.currentindex == this.index) {
          this.$emit("set-active", null);
          return;
        }
        this.$emit("set-active", this.index);
      },
      getServices() {
        this.loading = true
        let id = localStorage.getItem("id_company")
        axios.get(`http://185.121.81.239/api/booking-module/service/list/${id}/`).then(res => {
          let arr = res.data
          this.servicesList = []
          arr.map(el => {
            el.quantity = 0
          })
          for (let i=0;i<this.bookCount;i++){
            this.servicesList.push(JSON.parse(JSON.stringify(arr)))
          }
          console.log(this.servicesList)
          this.loading = false
        })
      },
      goBooking() {
          if (window.innerWidth < 768) {
            let check_in = `${
              localStorage.getItem("date_form")
            } ${this.item.check_in_time.substring(0, 5)}`;
            let check_out = `${
              localStorage.getItem("date_to")
            } ${this.item.check_out_time.substring(0, 5)}`;
            let reserve = {
              category: this.item.id,
              room_count: this.bookCount,
              check_in,
              check_out,
              child_counts: this.child_counts,
              additional_counts: this.additional_counts,
              // tour_operator: this.item.tour_operator
            };
            axios.post("http://185.121.81.239/api/booking-module/reserve/", reserve).then(res => {
                console.log(res)
                if(res.status > 399){
                  alert("В выбранной категории не достаточно номеров")
                }
                else{
                  this.order_id = res.data.bookings[0]
                  this.getServices()
                  this.selectServices = true
  
                  for(let i = 0; i < res.data.bookings.length; i++){
                    let stored_datas = JSON.parse(localStorage["orders"]);
                    stored_datas.push(res.data.bookings[i])
                    localStorage.setItem("orders", JSON.stringify(stored_datas))
                    this.bookingsArray.push(res.data.bookings[i])
                  }
  
                }    
              })
              .catch(error => {
                  console.log(error)
                alert("В выбранной категории не достаточно номеров")
              });
            return
          }
      }
    },
    template: 
    `
    <div>
      <div class="main_box" :class="{ mainActive: index == currentindex }">
        <div class="visible">
          <div
            @click="dialog = true"
            class="avatar"
            :style="[
              getMainimage()
                ? { backgroundImage: 'url(' + getMainimage() + ')' }
                : {
                    backgroundImage: url('https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png')
                  }
            ]"
          >
            <div v-show="item.images.length > 0" class="avatar__count">
              <p>1/{{ item.images.length }}</p>
            </div>
            <div class="room_left" :style="divPrimary">
              <h4 :style="h4TextButton">{{ roomCounter(item.room_count) }}</h4>
            </div>
          </div>
          <div class="description">
            <div class="titles">
              <h2>{{ item.name }}</h2>
              <p class="titles__main">
                {{ item.description }}
              </p>
              <div class="tags_list">
                <p v-for="(tag, idx) in item.tags" :key="idx">
                  <svg height="5" width="5">
                    <circle cx="2" cy="2" r="2" stroke-width="3" :style="svgPrimaryColor" />
                  </svg> 
                  {{ tag }}
                </p>
              </div>
            </div>
            <div
              v-show="item.adult_count + item.child_count > 0"
              class="additional"
            >
              <div>
                <h4 :style="pAccentColor">Есть {{ item.adult_count + item.child_count }} доп. места</h4>
                <button
                  @click="showAdditional()"
                  :class="{ activeBtn: index == currentindex }"
                  :style="btnAccentColor"
                >
                  <svg
                    width="16"
                    height="11"
                    viewBox="0 0 16 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.82154 3.31989C1.82154 2.41659 2.5009 1.68166 3.33598 1.68166H6.73554C7.26342 1.68166 7.72885 1.97555 8 2.41978C8.27118 1.97551 8.73658 1.68166 9.26447 1.68166H12.6641C13.4991 1.68166 14.1785 2.41659 14.1785 3.31989V3.39533H14.5576V1.79782C14.5576 0.806498 13.812 0 12.8956 0H3.10436C2.18794 0 1.44238 0.806498 1.44238 1.79782V3.39533H1.82151V3.31989H1.82154Z"
                      fill="white"
                      :style="svgTextColor"
                    />
                    <path
                      d="M15.3635 4.1604H0.636489C0.285527 4.1604 0 4.46927 0 4.84891V8.84589C0 9.22553 0.285527 9.5344 0.636489 9.5344H0.901442L0.588382 10.4902C0.523147 10.6893 0.619526 10.9079 0.803572 10.9784C0.842634 10.9934 0.882491 11.0005 0.921685 11.0005C1.06723 11.0005 1.2036 10.9025 1.25499 10.7456L1.65174 9.53436H14.3483L14.745 10.7456C14.7964 10.9025 14.9327 11.0005 15.0783 11.0005C15.1175 11.0005 15.1574 10.9934 15.1964 10.9784C15.3805 10.9079 15.4769 10.6893 15.4116 10.4902L15.0986 9.5344H15.3635C15.7145 9.5344 16 9.22553 16 8.84589V4.84891C16 4.46927 15.7145 4.1604 15.3635 4.1604Z"
                      fill="white"
                      :style="svgTextColor"
                    />
                    <path
                      d="M9.26425 2.44531C8.81916 2.44531 8.45703 2.837 8.45703 3.31847V3.39391H13.471V3.31847C13.471 2.837 13.1089 2.44531 12.6638 2.44531H9.26425Z"
                      fill="white"
                      :style="svgTextColor"
                    />
                    <path
                      d="M3.33602 2.44531C2.8909 2.44531 2.52881 2.83704 2.52881 3.31851V3.39391H7.5428V3.31847C7.5428 2.837 7.1807 2.44531 6.73558 2.44531H3.33602Z"
                      fill="white"
                      :style="svgTextColor"
                    />
                  </svg>
                  Доп. место
                </button>
              </div>
              <div class="actions">
                <p>
                  <svg :style="svgAccentColor" @click="addBookCount(-1)" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
                  {{ bookCount }}
                  <svg :style="svgAccentColor" @click="addBookCount(1)" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
  
                </p>
              </div>
            </div>
            <div class="price">
              <div>
                <h2>
                  {{
                    (item.price * bookCount +
                      (additional_counts.reduce((a, b) => a + b) * item.adult_price +
                        child_counts.reduce((a, b) => a + b) * item.child_price) -
                      item.additional_adult_count * item.adult_price -
                      item.additional_child_count * item.child_price).toLocaleString('ru-RU')
                  }}
                  KZT
                </h2>
                <p>Цена за всех</p>
              </div>
              <button @click="goBooking" :style="btnAccentColor">Выбрать</button>
            </div>
          </div>
        </div>
        <transition name="hidden">
          <div
            class="hidden"
            v-show="index == currentindex && item.adult_count + item.child_count > 0"
          >
            <div v-for="idx in bookCount" :key="idx" style="width100%;height:100%">
              <h2 style="margin-left: 12px;"  :style="pTextColor">Добавить доп. место</h2>
              <div class="additional_counter">
                <div class="additional_counter__single">
                  <div class="people_age">
                    <p :style="pTextColor">Взрослый</p>
                    <h5 :style="h5TextColor">Старше {{ item.child_age }} лет</h5>
                  </div>
                  <h3 :style="pTextColor">{{ item.adult_price.toLocaleString('ru-RU') }} KZT</h3>
                  <div class="actions">
                    <v-btn
                      icon
                      @click="
                        additional_counts.splice(
                          idx - 1,
                          1,
                          additional_counts[idx - 1] - 1
                        )
                      "
                      :disabled="additional_counts[idx - 1] === 0"
                    >
                    <svg :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
                    </v-btn>
  
                    <p :style="pTextColor">{{ additional_counts[idx - 1] }}</p>
                    <v-btn
                      icon
                      @click="
                        additional_counts.splice(
                          idx - 1,
                          1,
                          additional_counts[idx - 1] + 1
                        )
                      "
                      :disabled="
                        item.child_count - child_counts[idx - 1] >= 0
                          ? additional_counts[idx - 1] === item.adult_count
                          : additional_counts[idx - 1] ===
                            item.adult_count -
                              (child_counts[idx - 1] - item.child_count)
                      "
                    >
                    <svg :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
  
                    </v-btn>
                  </div>
                </div>
                <div class="additional_counter__single">
                  <div class="people_age">
                    <p :style="pTextColor">Детский</p>
                    <h5 :style="h5TextColor">До {{ item.child_age }} лет</h5>
                  </div>
                  <h3 :style="pTextColor">{{ item.child_price.toLocaleString('ru-RU') }} KZT</h3>
                  <div class="actions">
                    <v-btn
                      icon
                      @click="
                        child_counts.splice(idx - 1, 1, child_counts[idx - 1] - 1)
                      "
                      :disabled="child_counts[idx - 1] === 0"
                    >
                    <svg :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
  
                    </v-btn>
                    <p :style="pTextColor">{{ child_counts[idx - 1] }}</p>
                    <v-btn
                      icon
                      @click="
                        child_counts.splice(idx - 1, 1, child_counts[idx - 1] + 1)
                      "
                      :disabled="
                        child_counts[idx - 1] ===
                          item.child_count +
                            (item.adult_count - additional_counts[idx - 1])
                      "
                    >
                    <svg :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <v-dialog width="700" v-model="dialog">
          <v-carousel>
            <v-carousel-item
              v-for="(image, idx) in item.images"
              :key="idx"
              :src="image.image"
            ></v-carousel-item>
          </v-carousel>
        </v-dialog>
      </div>
      <v-dialog v-model="selectServices" fullscreen hide-overlay>
        <div class="mobile_services">
          <div class="mobile_header">
            <img @click="selectServices = false" src="https://marketbot.abelsharman.kz/widget_go2trip/assets/backmobile.svg">
            <p :style="pTextColor">Выбрать номер</p>
          </div>
  
  
  
  
          
          <div 
            class="swiper_container"
            ref="mySwiper"
          >
              <div class="swiper_slide" v-for="(i, idx) in bookCount" :key="i">
                <div class="slider_content" @click="selectRoom(idx)" :style="pSliderTextColor" style="font-size: 14px;" v-bind:class="{ slider_content_active: currentSlide == idx  }">
                  {{i}} номер
                </div>
            </div>
          </div>
  
  
  
  
  
  
  
          <div class="service_wrapper" style="margin-top:8vw;">
            <div class="single_service" v-for="(service, index) in servicesList[currentSlide]" :key="service.id">
              <div class="title">
                <h2 :style="pTextColor">{{service.name}}</h2>
                <p :style="h5TextColor" class="single_service_p">{{service.service_type == 'once' ? 'Единоразовая' : 'Суточная'}}</p>
              </div>
              <div class="price">
                <h1 :style="pAccentColor">{{service.price.toLocaleString('ru-RU')}} KZT</h1>
                <p :style="pTextColor">за 1 гостя</p>
              </div>
              <div class="actions" :key="updateKey" :style="pTextColor">
              <svg @click="serviceMath(-1, index)" :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
                {{service.quantity}}
                <svg @click="serviceMath(+1, index)" :style="svgAccentColor" style="cursor: pointer;" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
                </div>
            </div>
          </div>
          <div class="mobile_services__footer">
            <v-col cols="12">
              <v-row justify="center" align="center">
                <v-btn @click="addServices" color="primary" :style="btnAccentColor">Добавить</v-btn>
                <v-btn @click="scipServices" class="ml-2" color="primary" :style="btnAccentColor2" outlined>Пропустить</v-btn>
              </v-row>
            </v-col>
          </div>
        </div>
        <v-overlay :value="loading">
          <v-progress-circular
            :size="70"
            :width="7"
            color="#FF7F51"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
      </v-dialog>
    </div>
    `
  })
  