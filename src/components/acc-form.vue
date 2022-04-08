<template>
  <div class="main_form">
    <h1 :style="pTextColor">
      <img
        class="main_form_img"
        @click="$emit('back')"
        src="https://img.icons8.com/ios/452/back--v1.png"
        :style="pTextColor"
      />Оформление бронирования
    </h1>
    <h5 :style="h5TextColor">
      Введите корректные контактные данные, на которые будет оформлен билет.
      После совершения оплаты на указанный email будет выслано письмо с
      подтверждением и номером брони.
    </h5>
    <h2 :style="pTextColor">Контактная информация</h2>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <label for="name" :style="pTextColor">Имя <span>*</span></label>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                autocomplete="off"
                placeholder="Имя"
                height="28"
                v-model="first_name"
                class="mt-2"
                v-bind="attrs"
                v-on="on"
                dense
                outlined
                :rules="[(v) => !!v]"
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

        <v-col cols="12" md="6">
          <label for="name" :style="pTextColor">Фамилия <span>*</span></label>
          <v-text-field
            class="mt-2"
            v-model="last_name"
            placeholder="Фамилия"
            outlined
            dense
            hide-details
            :rules="[(v) => !!v]"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <label for="name" :style="pTextColor"
            >Вид документа <span>*</span></label
          >
          <v-select
            v-model="document_type"
            item-text="name"
            item-value="id"
            class="mt-2"
            dense
            hide-details
            :items="items"
            :rules="[(v) => !!v]"
            outlined
            :style="pTextColor"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <label for="name" :style="pTextColor"
            >Номер документа <span>*</span></label
          >
          <v-text-field
            v-model="document_number"
            class="mt-2"
            dense
            placeholder="Номер документа"
            outlined
            :rules="[(v) => !!v]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <label for="name" :style="pTextColor"
            >Ваш номер телефона <span>*</span></label
          >
          <v-text-field
            class="mt-2"
            v-model="phone_number"
            placeholder="Тел"
            outlined
            :rules="[(v) => !!v]"
            dense
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <label for="name" :style="pTextColor"
            >Ваш e-mail <span>*</span></label
          >
          <v-text-field
            v-model="email"
            class="mt-2"
            placeholder="E-mail"
            dense
            outlined
            :rules="[(v) => !!v]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <label for="additional" :style="pTextColor"
            >Дополнительные пожелания</label
          >
          <v-textarea
            v-model="comment"
            class="mt-2"
            name="input-7-1"
            outlined
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn
        @click="showCardCheck = true"
        v-show="width < 768"
        color="primary"
        class="mb-8 showCardBtn"
        height="40"
        block
        :style="btnAccentColor"
        >Показать карточку</v-btn
      >
    </v-form>
    <v-dialog v-model="showCardCheck" fullscreen hide-overlay>
      <SideBox :orders="orders" @close="showCardCheck = false" />
    </v-dialog>
  </div>
</template>

<script>
import SideBox  from "@/components/side-box"
export default {
  name: "AccForm",
  props: {
    ordercard: Array,
    submitaccbtnloading: Object,
    orders: Array
  },
  components: {
    SideBox
  },
  data() {
    return {
      mobileCard: false,
      api_url: "",
      availableUsers: [],
      person: {},
      showCardCheck: false, 
      items: [
        {
          id: "IC",
          name: "Удостоверение личности",
        },
        {
          id: "P",
          name: "Паспорт",
        },
        {
          id: "BC",
          name: "Свидетельство о рождении",
        },
        {
          id: "R",
          name: "Вид на жительство",
        },
      ],
      context: false,
      width: window.innerWidth,
      text_color: localStorage.getItem("text"),
      text_button: localStorage.getItem("text_button"),
      accent_color: localStorage.getItem("accent"),
    };
  },
  mounted() {
    this.api_url = localStorage.getItem("api_url");
  },
  computed: {
    pTextColor: {
      get() {
        return {
          color: this.text_color + " !important",
        };
      },
      set(value) {
        this.$store.commit("updateFirstName", value);
      },
    },
    btnAccentColor: {
      get() {
        return {
          "background-color": this.accent_color + " !important",
          color: this.text_button + " !important",
          "border-color": this.accent_color,
        };
      },
      set(value) {
        this.$store.commit("updateFirstName", value);
      },
    },
    h5TextColor: {
      get() {
        return {
          color: this.text_color + " !important",
          opacity: "0.5",
        };
      },
      set(value) {
        this.$store.commit("updateFirstName", value);
      },
    },
    first_name: {
      get() {
        return this.$store.state.person.first_name;
      },
      set(value) {
        this.$store.commit("updateFirstName", value);
      },
    },
    last_name: {
      get() {
        return this.$store.state.person.last_name;
      },
      set(value) {
        this.$store.commit("updateLastName", value);
      },
    },
    document_type: {
      get() {
        return this.$store.state.person.document_type;
      },
      set(value) {
        this.$store.commit("updateDocumentType", value);
      },
    },
    document_number: {
      get() {
        return this.$store.state.person.document_number;
      },
      set(value) {
        this.$store.commit("updateDocumentNumber", value);
      },
    },
    phone_number: {
      get() {
        return this.$store.state.person.phone_number;
      },
      set(value) {
        this.$store.commit("updatePhoneNumber", value);
      },
    },
    email: {
      get() {
        return this.$store.state.person.email;
      },
      set(value) {
        this.$store.commit("updateEmail", value);
      },
    },
    comment: {
      get() {
        return this.$store.state.person.comment;
      },
      set(value) {
        this.$store.commit("updateComment", value);
      },
    },
  },
  created() {
    this.availableUsers = [];
    if (this.$refs.form) {
      this.$refs.form.resetValidation();
    }
  },
  methods: {
    showCard() {
      if (
        this.$store.state.person.first_name.length == 0 ||
        this.$store.state.person.last_name.length == 0 ||
        this.$store.state.person.document_type.length == 0 ||
        this.$store.state.person.document_number.length == 0 ||
        this.$store.state.person.email.length == 0
      ) {
        alert("Заполните данные");
      } else {
        this.mobileCard = true;
        this.$emit("change-detail");
      }
    },
    selectUserData(e) {
      let tmp = {};
      Object.assign(tmp, e);
      this.person = tmp;
    },
  },
};
</script>
