<template>
  <div class="main_box main_box_2">
    <div class="box" v-for="(item, idx) in updatedordercard" :key="idx">
      <h2 class="box__title" :style="pTextColor">
        {{ item.room_name }}
        <v-btn v-if="width < 550" icon style="float:right" @click="$emit('close')"><v-icon class="">mdi-close</v-icon></v-btn>
      </h2>
      <div class="box__header">
        <div
          class="avatar"
          :style="[
            item.main_image
              ? { backgroundImage: 'url(' + item.main_image + ')' }
              : {
                  backgroundImage: `url('https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png')`,
                },
          ]"
        />
        <div class="descr widget_descr">
          <div>
            <h5 :style="h5TextColor" class="descr__type">
              {{ formatZoneType(item.accommodation_type) }}
            </h5>
            <p :style="pTextColor" class="descr__title">
              {{ item.hotel }}
            </p>
            <p :style="pTextColor" class="descr__loc">
              <img
                src="https://marketbot.abelsharman.kz/widget_go2trip/assets/loc.png"
              />
              {{ item.location }}
            </p>
            <p :style="pTextColor" class="descr__name">{{ item.room_name }}</p>
          </div>
        </div>
      </div>
      <div class="dates">
        <p :style="pTextColor">
          <img
            src="https://marketbot.abelsharman.kz/widget_go2trip/assets/calendar.png"
          />{{ formatDate(item.check_in) }} - {{ formatDate(item.check_out) }}
        </p>
        <p :style="pTextColor">
          <img
            src="https://marketbot.abelsharman.kz/widget_go2trip/assets/user_1.png"
          />
          {{ peopleRead(item) }}
        </p>
      </div>
      <div class="time">
        <p :style="pPrimaryColor">
          Время заезда:
          <strong style="font-size: 14px;" :style="pTextColor" v-text="getFormattedDate(item.check_in)"></strong>
        </p>
        <p :style="pPrimaryColor">
          Время выезда:
          <strong style="font-size: 14px;" :style="pTextColor" v-text="getFormattedDate(item.check_out)"></strong>
        </p>
      </div>

      <div class="price">
        <div style="display: flex;">
          <p :style="pTextColor" v-text="formatDays(item.calculated_by.days)"></p>
          <p :style="pTextColor">
            {{ item.calculated_by.price.toLocaleString("ru-RU") }} KZT
          </p>
        </div>
      </div>
      <div :style="divPrimaryColor" class="custom_border" />
    </div>
    <div class="sum_up">
      <div class="sum_up__value">
        <h4 :style="pPrimaryColor">Итого</h4>
        <h4 :style="pPrimaryColor">
          {{ totalPrice().toLocaleString("ru-RU") }} KZT
        </h4>
      </div>
      <h5 :style="h5TextColor" class="sum_up__short">
        Ознакомьтесь с
        <a class="box_links" target="_blank" to="/offer">договором оферты</a>
        и
        <a class="box_links" target="_blank" to="/policy"
          >политикой конфиденциальности</a
        >
        <input
          class="ml-2"
          type="checkbox"
          id="checkbox"
          style="width:10px !important"
          v-model="checked"
        />
      </h5>
      <v-btn
        :loading="ready"
        :color="'primary ' + disabledClass"
        class="widget_button_primary_color"
        :style="btnPrimaryStyles"
        @click="bookRooms()"
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
        Купить
      </v-btn>
    </div>

    <form
      style="display: none;"
      ref="paymentForm"
      class="payment__passenger__form"
      name="SendOrder"
      method="post"
      action="https://testpay.kkb.kz/jsp/process/logon.jsp"
    >
      <input
        type="hidden"
        name="Signed_Order_B64"
        id="Signed_Order_B64"
        :value="context"
      />

      <input
        class="v-payment__passenger__form__group--input mgt-12px"
        type="text"
        placeholder="email@email.com"
        id="formSurname"
        name="email"
        :value="email"
        required
      />

      <input type="hidden" name="Language" value="rus" />
      <input type="hidden" name="BackLink" :value="domain" />
      <input
        type="hidden"
        name="PostLink"
        :value="`${this.api_url}/api/v2/widget/complete_order/${comp_id}/`"
      />

      <div class="agrrement d-flex align-center mt-4">
        <label class="m-0" for="checkbox">Со счетом согласен (-а) </label>
        <input
          class="ml-2"
          type="checkbox"
          id="checkbox"
          v-model="checked_for_pay"
        />
      </div>
      <button
        v-if="checked_for_pay"
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
import axios from "axios";
import moment from "moment";

export default {
  name: "SideBox",
  props: {
    orders: Array,
  },
  data: () => ({
    api_url: "",
    comp_id: "",
    context: null,
    checked: false,
    checked_for_pay: true,
    domain: "",
    width: window.innerWidth,
    primary: localStorage.getItem("primary"),
    accent: localStorage.getItem("accent"),
    text_button: localStorage.getItem("text_button"),
    text_color: localStorage.getItem("text"),
    ready: false, 
  }),
  computed: {
    disabledClass(){
      return this.checked ? '' : 'disabled'
    },
    email() {
      return this.$store.state.person.email;
    },
    updatedordercard() {
      console.log(this.orders);
      return this.orders;
    },
    pTextColor() {
      return {
        color: this.text_color + " !important",
      };
    },
    h5TextColor() {
      return {
        color: this.text_color + " !important",
        opacity: "0.5",
      };
    },
    btnPrimaryStyles() {
      if (this.width > 768) {
        return {
          "background-color": this.primary + " !important",
          color: this.text_button + " !important",
        };
      } else {
        return {
          "background-color": this.primary + " !important",
          color: this.text_button + " !important",
          "font-size": "15px",
        };
      }
    },
    pPrimaryColor() {
      return {
        color: this.primary + " !important",
      };
    },
    divPrimaryColor() {
      return {
        background: this.primary + " !important",
      };
    },
    pAccentColor() {
      return {
        color: this.accent + " !important",
      };
    },
    svgAccentColor() {
      return {
        fill: this.accent + " !important",
      };
    },
  },
  mounted() {
    this.domain = document.URL;
    this.api_url = localStorage.getItem("api_url");
    this.comp_id = localStorage.getItem("id_company");
  },
  methods: {
    getFormattedDate(value){
      return moment(new Date(value * 1000)).format('HH:mm')
    },
    formatDays(value){
      let last_number = +value.toString()[value.toString().length - 1]
      if(last_number == 1) return `${value} ночь`
      else if(last_number > 1 && last_number < 5) return `${value} ночи`
      else return `${value} ночей`
    },
    async bookRooms() {
      console.log(this.$store.state.person);
      let person = { ...this.$store.state.person }
      if(!person.first_name || !person.last_name || !person.phone_number || !person.email || !person.comment) {
        this.$store.commit("SET_NOTIFICATION", {
          show: true,
          message: "Заполните все данные!",
          color: "#c54949",
        });
        return
      }
      let body = {
        bookings: this.orders.map(e => e.booking_id),
        comment: this.$store.state.person.comment, 
        auto_complete: true, 
        client: { ...this.$store.state.person }
      }
      let res = (await axios.post(`${this.api_url}/api/v2/widget/clients/`, body)).data 
      console.log(res);
      if(res.context) {
        this.context = res.context;
        setTimeout(() => {
          if (this.context) this.$refs.paymentForm.submit();
          this.$store.commit("SET_PERSON", {})
        }, 1000);
      }
      else {
        this.$store.commit("SET_NOTIFICATION", {
          show: true,
          message: "Вы успешно забронировали номер. С вами свяжется менеджер!",
          color: "#22bb33",
        });
      }
    },
    peopleRead(item) {
      let adult = item.adult_count;
      let child = item.child_count;
      let a = "", b = ""
      if (adult == 1) a = adult + " взрослый";
      else a = adult + " взрослых";
      if(child == 1) b = '1 ребенок'
      else if(child > 1 && child < 5) b = child + ' ребенка'
      else b = child + ' ребенков'
      return `${a}, ${b}`;
    },
    formatZoneType(name) {
      let label = "";
      if (name == "rest_zone") label = "Зона отдыха";
      else if (name == "hotel") label = "Отель";
      else if (name == "guest_house") label = "Гостевой дом";
      else label = "Санаторий";
      return label;
    },
    formatDate(date) {
      moment.locale('ru')
      return moment.unix(date).format("DD - MMM YYYY");
    },
    totalPrice() {
      let price = 0;
      this.orders.forEach((el) => {
        price += el.calculated_by.total + el.calculated_by.advance_booking
      });
      return price;
    },
  },
};
</script>
