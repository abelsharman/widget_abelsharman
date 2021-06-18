<template>
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
          v-else
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
</template>





<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'SideBox',
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
    }
}
</script>