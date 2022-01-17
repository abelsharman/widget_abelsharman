<template>
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
                  backgroundImage: `url('https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png')`,
                },
          ]"
        >
          <div v-show="item.images.length > 0" class="avatar__count">
            <p :style="pTextColor">1/{{ item.images.length }}</p>
          </div>
          <div class="room_left" :style="divPrimary">
            <h4 :style="h4TextButton">{{ roomCounter(item.room_count) }}</h4>
          </div>
        </div>
        <div class="description">
          <div class="titles">
            <h2 :style="pTextColor">{{ item.name }}</h2>
            <p class="titles__main" :style="pTextColor">
              {{ item.description }}
            </p>
            <div class="tags_list">
              <p v-for="(tag, idx) in item.tags" :key="idx" :style="pTextColor">
                <svg height="5" width="5">
                  <circle
                    cx="2"
                    cy="2"
                    r="2"
                    stroke-width="3"
                    :style="svgPrimaryColor"
                  />
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
              <h4 :style="pAccentColor">
                Есть {{ item.adult_count + item.child_count }} доп. места
              </h4>
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
                <svg
                  :style="svgAccentColor"
                  @click="addBookCount(-1)"
                  style="cursor: pointer;"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"
                  />
                </svg>
                {{ bookCount }}
                <svg
                  :style="svgAccentColor"
                  @click="addBookCount(1)"
                  style="cursor: pointer;"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div class="price">
            <div>
              <h2 :style="pTextColor">
                {{
                  (
                    item.price * bookCount +
                    (additional_counts.reduce((a, b) => a + b) *
                      item.adult_price +
                      child_counts.reduce((a, b) => a + b) * item.child_price) -
                    item.additional_adult_count * item.adult_price -
                    item.additional_child_count * item.child_price
                  ).toLocaleString("ru-RU")
                }}
                KZT
              </h2>
              <p :style="pTextColor">Цена за всех</p>
            </div>
            <button @click="goBooking" :style="btnAccentColor">Выбрать</button>
          </div>
        </div>
      </div>
      <transition name="hidden">
        <div
          class="hidden"
          v-show="
            index == currentindex && item.adult_count + item.child_count > 0
          "
        >
          <div
            v-for="idx in bookCount"
            :key="idx"
            style="width100%;height:100%"
          >
            <h2 style="margin-left: 12px;" :style="pTextColor">
              Добавить доп. место
            </h2>
            <div class="additional_counter">
              <div class="additional_counter__single">
                <div class="people_age">
                  <p :style="pTextColor">Взрослый</p>
                  <h5 :style="h5TextColor">Старше {{ item.child_age }} лет</h5>
                </div>
                <h3 :style="pTextColor">
                  {{ item.adult_price.toLocaleString("ru-RU") }} KZT
                </h3>
                <div class="actions">
                  <v-btn
                    style="background-color: transparent !important; margin-right: 0px"
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
                    <svg
                      :style="svgAccentColor"
                      style="cursor: pointer;"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"
                      />
                    </svg>
                  </v-btn>

                  <p :style="pTextColor">{{ additional_counts[idx - 1] }}</p>
                  <v-btn
                    style="background-color: transparent !important; margin-right: 0px"
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
                    <svg
                      :style="svgAccentColor"
                      style="cursor: pointer;"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"
                      />
                    </svg>
                  </v-btn>
                </div>
              </div>
              <div class="additional_counter__single">
                <div class="people_age">
                  <p :style="pTextColor">Детский</p>
                  <h5 :style="h5TextColor">До {{ item.child_age }} лет</h5>
                </div>
                <h3 :style="pTextColor">
                  {{ item.child_price.toLocaleString("ru-RU") }} KZT
                </h3>
                <div class="actions">
                  <v-btn
                    style="background-color: transparent !important; margin-right: 0px"
                    icon
                    @click="
                      child_counts.splice(idx - 1, 1, child_counts[idx - 1] - 1)
                    "
                    :disabled="child_counts[idx - 1] === 0"
                  >
                    <svg
                      :style="svgAccentColor"
                      style="cursor: pointer;"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"
                      />
                    </svg>
                  </v-btn>
                  <p :style="pTextColor">{{ child_counts[idx - 1] }}</p>
                  <v-btn
                    style="background-color: transparent !important; margin-right: 0px"
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
                    <svg
                      :style="svgAccentColor"
                      style="cursor: pointer;"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"
                      />
                    </svg>
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
          <img
            @click="selectServices = false"
            src="https://marketbot.abelsharman.kz/widget_go2trip/assets/backmobile.svg"
          />
          <p :style="pTextColor">Выбрать номер</p>
        </div>

        <div class="swiper_container" ref="mySwiper">
          <div class="swiper_slide" v-for="(i, idx) in bookCount" :key="i">
            <div
              class="slider_content"
              @click="selectRoom(idx)"
              :style="pSliderTextColor"
              style="font-size: 14px;"
              v-bind:class="{ slider_content_active: currentSlide == idx }"
            >
              {{ i }} номер
            </div>
          </div>
        </div>

        <div class="service_wrapper" style="margin-top:8vw;">
          <div
            class="single_service"
            v-for="(service, index) in servicesList[currentSlide]"
            :key="service.id"
          >
            <div class="title">
              <h2 :style="pTextColor">{{ service.name }}</h2>
              <p :style="h5TextColor" class="single_service_p">
                {{
                  service.service_type == "once" ? "Единоразовая" : "Суточная"
                }}
              </p>
            </div>
            <div class="price">
              <h1 :style="pAccentColor">
                {{ service.price.toLocaleString("ru-RU") }} KZT
              </h1>
              <p :style="pTextColor">за 1 гостя</p>
            </div>
            <div class="actions" :key="updateKey" :style="pTextColor">
              <svg
                @click="serviceMath(-1, index)"
                :style="svgAccentColor"
                style="cursor: pointer;"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"
                />
              </svg>
              {{ service.quantity }}
              <svg
                @click="serviceMath(+1, index)"
                :style="svgAccentColor"
                style="cursor: pointer;"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="mobile_services__footer">
          <v-col cols="12">
            <v-row justify="center" align="center">
              <v-btn
                @click="addServices"
                color="primary"
                :style="btnAccentColor"
                >Добавить</v-btn
              >
              <v-btn
                @click="scipServices"
                class="ml-2"
                color="primary"
                :style="btnAccentColor2"
                outlined
                >Пропустить</v-btn
              >
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
</template>

<script>
import axios from "axios";
export default {
  name: "MobileAccBox",
  props: {
    currentindex: Number,
    index: Number,
    item: Object,
  },
  data() {
    return {
      currentSlide: 0,
      api_url: "",
      bookingsArray: [],
      updateKey: 1,
      order_id: 0,
      loading: false,
      servicesList: [],
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
    },
  },
  computed: {
    pSliderTextColor() {
      return {
        color: this.text_color + " !important",
        "border-color": this.text_color + " !important",
      };
    },
    pTextColor() {
      return {
        color: this.text_color + " !important",
      };
    },
    h4TextButton() {
      return {
        color: this.text_button + " !important",
      };
    },
    divPrimary() {
      return {
        "background-color": this.primary + " !important",
      };
    },
    h5TextColor() {
      return {
        color: this.text_color + " !important",
        opacity: "0.5",
      };
    },
    btnAccentColor() {
      return {
        "background-color": this.accent_color + " !important",
        color: this.text_button + " !important",
        "border-color": this.accent_color,
      };
    },
    btnAccentColor2() {
      return {
        "background-color": this.text_button + " !important",
        color: this.accent_color + " !important",
        "border-color": this.accent_color,
      };
    },
    pAccentColor() {
      return {
        color: this.accent_color + " !important",
      };
    },
    svgTextColor() {
      return {
        fill: this.text_button + " !important",
      };
    },
    svgAccentColor() {
      return {
        fill: this.accent_color + " !important",
      };
    },
    svgPrimaryColor() {
      return {
        fill: this.primary + " !important",
      };
    },
    pPrimaryColor() {
      return {
        color: this.primary + " !important",
      };
    },
  },
  mounted() {
    this.api_url = localStorage.getItem("api_url");
  },
  methods: {
    scipServices() {
      var size = localStorage.getItem("orders").length;
      var bookings_id = localStorage.getItem("orders").substring(1, size - 1);
      console.log(bookings_id.length, bookings_id);
      axios
        .get(this.api_url + "/api/booking-module/order/detail/", {
          params: {
            bookings_id: bookings_id,
          },
        })
        .then((res) => {
          if (res) {
            this.selectServices = false;
            this.$emit("toggle", res.data);
            this.$emit("change-form");
          } else {
            console.log("error on fetching order card");
          }
        });
    },
    addServices() {
      let selected_services = [...this.servicesList];
      selected_services.map((list) => {
        list.map((el, index) => {
          if (!el.quantity) {
            list.splice(index, 1);
          }
        });
      });
      console.log(selected_services, selected_services.length);
      let booking_service = {
        services: [],
      };
      for (let j = 0; j < this.servicesList.length; j++) {
        for (let i = 0; i < selected_services[j].length; i++) {
          if (selected_services[j][i].quantity > 0) {
            booking_service.services.push({
              quantity: selected_services[j][i].quantity,
              booking: this.bookingsArray[j],
              service: selected_services[j][i].id,
            });
          }
        }
      }

      console.log(selected_services);
      axios
        .post(
          `${this.api_url}/api/booking-module/bulk/add/services/`,
          booking_service
        )
        .then(() => {
          // this.$emit('toggle', res.data);
          this.selectServices = false;
          this.$emit("change-form");

          var size = localStorage.getItem("orders").length;
          var bookings_id = localStorage
            .getItem("orders")
            .substring(1, size - 1);
          axios
            .get(this.api_url + "/api/booking-module/order/detail/", {
              params: {
                bookings_id: bookings_id,
              },
            })
            .then((res) => {
              if (res) {
                console.log(res.data);
                this.$emit("toggle", res.data);
              } else {
                console.log("error on fetching order card");
              }
            });
        });
    },
    selectRoom(idx) {
      this.currentSlide = idx;
    },
    serviceMath(num, idx) {
      this.servicesList[this.currentSlide][idx].quantity += num;
      console.log(this.servicesList);
      this.updateKey++;
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
        this.item.images.map((el) => {
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
      this.loading = true;
      let id = localStorage.getItem("id_company");
      axios
        .get(`${this.api_url}/api/booking-module/service/list/${id}/`)
        .then((res) => {
          let arr = res.data;
          this.servicesList = [];
          arr.map((el) => {
            el.quantity = 0;
          });
          for (let i = 0; i < this.bookCount; i++) {
            this.servicesList.push(JSON.parse(JSON.stringify(arr)));
          }
          console.log(this.servicesList);
          this.loading = false;
        });
    },
    goBooking() {
      if (window.innerWidth < 768) {
        let check_in = `${localStorage.getItem(
          "date_form"
        )} ${this.item.check_in_time.substring(0, 5)}`;
        let check_out = `${localStorage.getItem(
          "date_to"
        )} ${this.item.check_out_time.substring(0, 5)}`;
        let reserve = {
          category: this.item.id,
          room_count: this.bookCount,
          check_in,
          check_out,
          child_counts: this.child_counts,
          additional_counts: this.additional_counts,
          // tour_operator: this.item.tour_operator
        };
        axios
          .post(this.api_url + "/api/booking-module/reserve/", reserve)
          .then((res) => {
            console.log(res);
            if (res.status > 399) {
              alert("В выбранной категории не достаточно номеров");
            } else {
              this.order_id = res.data.bookings[0];

              for (let i = 0; i < res.data.bookings.length; i++) {
                let stored_datas = JSON.parse(localStorage["orders"]);
                stored_datas.push(res.data.bookings[i]);
                localStorage.setItem("orders", JSON.stringify(stored_datas));
                this.bookingsArray.push(res.data.bookings[i]);
              }

              var size = localStorage.getItem("orders").length;
              var bookings_id = localStorage
                .getItem("orders")
                .substring(1, size - 1);
              console.log(bookings_id.length, bookings_id);
              axios
                .get(this.api_url + "/api/booking-module/order/detail/", {
                  params: {
                    bookings_id: bookings_id,
                  },
                })
                .then((res) => {
                  if (res) {
                    this.selectServices = false;
                    this.$emit("toggle", res.data);
                    this.$emit("change-form");
                  } else {
                    console.log("error on fetching order card");
                  }
                });
            }
          })
          .catch((error) => {
            console.log(error);
            alert("В выбранной категории не достаточно номеров");
          });
        return;
      }
    },
  },
};
</script>
