<template>
  <div class="main_box main_box_2">
    <div class="box" v-for="(item, idx) in updatedordercard" :key="idx">
      <h2 @click="xxx(item)" class="box__title" :style="pTextColor">
        {{ item.room_name }}
      </h2>
      <div class="box__header">
        <div
          class="avatar"
          :style="[
            getMainimage(item)
              ? { backgroundImage: 'url(' + getMainimage(item) + ')' }
              : {
                  backgroundImage: `url('https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png')`,
                },
          ]"
        />
        <div class="descr widget_descr">
          <div>
            <h5 :style="h5TextColor" class="descr__type">
              {{ formatZoneType(item.hotel.accommodation_type) }}
            </h5>
            <p :style="pTextColor" class="descr__title">
              {{ item.hotel_name }}
            </p>
            <p :style="pTextColor" class="descr__loc">
              <img
                src="https://marketbot.abelsharman.kz/widget_go2trip/assets/loc.png"
              />
              {{ item.place.name }}
            </p>
            <p :style="pTextColor" class="descr__name">{{ item.room.name }}</p>
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
          <strong style="font-size: 14px;" :style="pTextColor">{{
            item.hotel.check_in_time.substring(0, 5)
          }}</strong>
        </p>
        <p :style="pPrimaryColor">
          Время выезда:
          <strong style="font-size: 14px;" :style="pTextColor">{{
            item.hotel.check_out_time.substring(0, 5)
          }}</strong>
        </p>
      </div>

      <div class="price">
        <div style="display: flex;">
          <p :style="pTextColor">{{ item.nights }} ночей</p>
          <p :style="pTextColor">
            {{ item.price.toLocaleString("ru-RU") }} KZT
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
        Купить
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
        Купить
      </v-btn>
    </div>

    <form
      style="display: none;"
      ref="paymentForm"
      class="payment__passenger__form"
      name="SendOrder"
      method="post"
      action="https://epay.kkb.kz/jsp/process/logon.jsp"
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
        :value="api_url + '/api/booking-module/complete_order/' + comp_id + '/'"
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
    ordercard: Array,
    accomodationsubmit: Function,
    submitaccbtnloading: Object,
  },
  mounted() {
    this.domain = document.URL;
    this.api_url = localStorage.getItem("api_url");
    this.comp_id = localStorage.getItem("id_company");
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
  }),
  methods: {
    bookRooms() {
      let clients = [
        {
          first_name: this.$store.state.person.first_name,
          last_name: this.$store.state.person.last_name,
          patronymic: null,
          phone_number: this.$store.state.person.phone_number,
          email: this.$store.state.person.email,
          birth_date: null,
          id_card: this.$store.state.person.document_number,
          gender: null,
          comment: this.$store.state.person.comment,
          is_child: false,
        },
      ];
      let bookings_id = JSON.parse(localStorage.getItem("orders"));
      let data = { clients: clients, bookings_id: bookings_id };

      if (
        this.$store.state.person.first_name.length > 0 &&
        this.$store.state.person.last_name.length > 0 &&
        this.$store.state.person.email.length > 0
      ) {
        axios
          .post(this.api_url + "/api/booking-module/book/", data)
          .then((res) => {
            if (res.data.context != null) {
              localStorage.setItem("orders", []);
              this.context = res.data.context;
              setTimeout(() => {
                if (this.context) this.$refs.paymentForm.submit();
              }, 1000);
            } else {
              localStorage.setItem("orders", []);
              alert("Вы успешно забронировали номер. С вами свяжется менеджер");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Заполните данные");
      }
    },
    peopleRead(item) {
      let adult = item.additional_count;
      let child = item.child_count;
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
    formatZoneType(name) {
      let label = "";
      if (name == "rest_zone") label = "Зона отдыха";
      else if (name == "hotel") label = "Отель";
      else if (name == "guest_house") label = "Гостевой дом";
      else label = "Санаторий";
      return label;
    },
    formatDate(date) {
      return moment.unix(date).format("DD - MMM YYYY");
    },
    totalPrice() {
      let price = 0;
      this.ordercard.map((el) => {
        price += Number(el.price);
      });
      return price;
    },
    getMainimage(item) {
      let mainImg = "";
      item.room.images.map((el) => {
        if (el.is_main) {
          mainImg = el.image;
        }
      });
      return mainImg;
    },
  },
  computed: {
    email() {
      return this.$store.state.person.email;
    },
    updatedordercard() {
      return this.ordercard;
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
};
</script>
