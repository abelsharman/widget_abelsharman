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
</template>
  
  


<script>
import axios from 'axios'
export default {
    name: 'AccBox',
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
    }
}
</script>