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
            <div class="price" >
              <div>
                <h2 :style="pTextColor">
                  {{
                    (item.price * bookCount +
                      (additional_counts.reduce((a, b) => a + b) * item.adult_price +
                        child_counts.reduce((a, b) => a + b) * item.child_price) -
                      item.additional_adult_count * item.adult_price -
                      item.additional_child_count * item.child_price).toLocaleString('ru-RU')
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
</template>
  


<script>
import axios from 'axios'
export default {
    name: 'MobileAccBox',
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
    }
}
</script>



<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");
#app .v-application .primary {
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





#app .v-application p{
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

