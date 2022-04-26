<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel class="mb-5" readonly>
      <v-expansion-panel-header class="panel_header" hide-actions style="padding: 20px !important">
        <div
          class="avatar"
          @click="openImagesDialog"
          :style="{ backgroundImage: `url(${item.main_image || 'https://marketbot.abelsharman.kz/widget_go2trip/assets/placeholder.png'})` }"
        >
          <div v-if="item.images.length > 0" class="avatar__count">
              <p>1/{{ item.images.length }}</p>
          </div>
        </div>
        <div class="description">
          <div class="description__text">
            <p class="description__text__title" :style="pTextColor" v-text="item.name"></p>
            <p class="description__text__descr" :style="[ checkHeight && limitDesc ? {'-webkit-line-clamp': 30, ...pTextColor} : {'-webkit-line-clamp': 3, ...pTextColor} ]" v-text="item.description"></p>
            <strong class="desctiprion_button" 
              v-if="checkHeight" :style="pTextColor"
              @click="limitDesc = !limitDesc">{{ limitDesc ? 'Развернуть' : 'Свернуть' }}
              <v-icon small color="#0071c2">{{ limitDesc ? 'mdi-arrow-down' : 'mdi-arrow-up' }}</v-icon>
            </strong>
            <div class="tags">
              <p
                v-for="(tag, index) in item.tags"
                :key="index"
                :style="pTextColor"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="2"
                  stroke-width="3"
                  :style="svgPrimaryColor"
                />
                {{ tag.text }}
              </p>
            </div>
            <div class="extra">
              <p :style="pAccentColor">Есть {{ item.adult_count + item.child_count }} доп. места</p>
              <v-btn
                color="primary"
                outlined
                width="150"
                height="40"
                @click="onToggle"
                :style="btnAccentColor"
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
              </v-btn>
            </div>
          </div>
          <div class="description__actions">
            <p class="description__actions__price" :style="pTextColor">{{ getPrice }} KZT</p>
            <p class="description__actions__count" :style="pPrimaryColor">
              {{ roomCounter(item.room_count) }}
            </p>
            <div>
              <svg
                :style="[ item.count == 1 || !item.room_count ? {svgAccentColor, pointerEvents: 'none'} : { svgAccentColor } ]"
                @click="changeCount(-1)"
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
              <p v-text="item.count" :style="pTextColor"></p>
              <svg
                :style="[ item.count == item.room_count || !item.room_count ? {svgAccentColor, pointerEvents: 'none'} : { svgAccentColor } ]"
                @click="changeCount(1)"
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
            <div style="flex-direction:column">
              <v-btn
                color="primary"
                class="mt-3"
                outlined
                :style="btnAccentColor"
                width="180"
                height="44"
                @click="onClick"
              >
                Выбрать
              </v-btn>
            </div>
          </div>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="panel_content">
        <div
          class="people_count"
          v-for="(itemCount, index) in item.counts"
          :key="index"
        >
          <p class="people_count__title" :style="pTextColor">Добавить доп. место</p>
          <div class="people_count__wrapper">
            <div class="people_count__wrapper__single">
              <p class="people_count__wrapper__single__title" :style="pTextColor">
                {{ item.adult_price.toLocaleString("KZ-kz") }} KZT
              </p>
              <div>
                <p :style="pTextColor">Взрослый</p>
                <p :style="h5TextColor">Старше {{ item.child_age }} лет</p>
              </div>
              <div>
                <v-btn
                  :disabled="itemCount.adult == 0"
                  @click="changeAdditional(-1, 'adult', index)"
                  icon
                  style="background-color: transparent !important; margin-right: 0px"
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
                <p v-text="itemCount.adult" :style="pTextColor"></p>
                <v-btn @click="changeAdditional(1, 'adult', index)" icon style="background-color: transparent !important; margin-right: 0px">
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
              </div>
            </div>
            <div class="people_count__wrapper__single">
              <p class="people_count__wrapper__single__title" :style="pTextColor">
                {{ item.child_price.toLocaleString("KZ-kz") }} KZT
              </p>
              <div>
                <p :style="pTextColor">Детский</p>
                <p :style="h5TextColor">До {{ item.child_age }} лет</p>
              </div>
              <div>
                <v-btn
                  :disabled="itemCount.child == 0"
                  style="background-color: transparent !important; margin-right: 0px"
                  @click="changeAdditional(-1, 'child', index)"
                  icon
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
                <p v-text="itemCount.child" :style="pTextColor"></p>
                <v-btn @click="changeAdditional(1, 'child', index)" icon style="background-color: transparent !important; margin-right: 0px">
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
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-dialog width="700" v-model="dialog">
        <v-carousel>
          <v-carousel-item
            v-for="(image, idx) in item.images"
            :key="idx"
            :src="image.image"
          ></v-carousel-item>
        </v-carousel>
      </v-dialog>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "AccBox",
  props: {
    item: Object,
  },
  data: function() {
    return {
      panel: 0,
      limitDesc: false, 

      api_url: "",
      loading: false,
      dialog: false,
      bookCount: 1,
      additional_counts: [this.item.additional_adult_count || 1], // [this.item.adult_count],
      child_counts: [this.item.additional_child_count || 1], // [this.item.adult_count + this.item.child_count]
      text_button: localStorage.getItem("text_button"),
      accent_color: localStorage.getItem("accent"),
      primary: localStorage.getItem("primary"),
      text_color: localStorage.getItem("text"),
    };
  },
  mounted() {
    this.api_url = localStorage.getItem("api_url");
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
    getPrice() {
      let price = this.item.accommodation_price * this.item.count;
      this.item.counts.forEach((element) => {
        price += element.adult * this.item.adult_price;
        price += element.child * this.item.child_price;
      });
      return price.toLocaleString("KZ-kz");
    },
    checkHeight(){
      if(this.item.description) { 
        return this.item.description.length > 170
      }
      return false
    },
    pTextColor() {
      return {
        color: this.text_color + " !important",
      };
    },
    btnAccentColor() {
      return {
        "background-color": this.accent_color + " !important",
        color: this.text_button + " !important",
        border: this.accent_color + " 1px solid",
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
    h5TextColor() {
      return {
        color: this.text_color + " !important",
        opacity: "0.5",
      };
    },
  },
  methods: {
    changeAdditional(numb, type, index) {
      if (!this.item.room_count) return;
      if (numb < 0) {
        this.$set(
          this.item.counts[index],
          type,
          this.item.counts[index][type] + numb
        );
      } else {
        if (type == "adult") {
          if (
            this.item.counts[index].child + this.item.counts[index].adult ==
              this.item.adult_count + this.item.child_count ||
            this.item.counts[index].adult == this.item.adult_count
          )
            return;
          else {
            this.$set(
              this.item.counts[index],
              "adult",
              this.item.counts[index].adult + numb
            );
          }
        } else {
          if (
            this.item.counts[index].child < this.item.child_count ||
            (this.item.counts[index].adult != this.item.adult_count &&
              this.item.counts[index].child + this.item.counts[index].adult <
                this.item.adult_count + this.item.child_count)
          ) {
            this.$set(
              this.item.counts[index],
              "child",
              this.item.counts[index].child + numb
            );
          }
        }
      }
    },
    changeCount(numb) {
      if (!this.item.room_count) return;
      if (numb > 0) {
        this.item.counts.push({
          adult: 0,
          child: 0,
        });
      } else {
        this.item.counts.pop();
      }
      this.item.count += numb;
    },
    onToggle() {
      if (this.panel) {
        this.panel = 0;
        return;
      }
      this.panel = 1;
    },
    roomCounter(room) {
      if (!room) return `Не осталось номеров`;
      if (room == 1) return `остался ${room} номер`;
      if ((room >= 21 && room <= 24) || (room >= 2 && room <= 4))
        return `осталось ${room} номера`;
      return `осталось ${room} номеров`;
    },
    async onClick() {
      console.log(this.item);
      if (this.item.room_count < 1) {
        this.$store.commit("SET_NOTIFICATION", {
          show: true,
          message: "Нельзя зарезвировать!",
          color: "#c54949",
        });
        return;
      }
      if (!this.item.room_count) return;
      this.item.is_added = true;
      this.$store.commit("SET_NOTIFICATION", {
        show: true,
        message: "Добавлено!",
        color: "#22bb33",
      });
    },
    openImagesDialog(){
      if (this.item.images.length > 0) this.dialog = true;
      else this.$store.commit("SET_NOTIFICATION", {
          show: true,
          message: "Нет картинок!",
          color: "#c54949",
        });
    },
  },
};
</script>


<style scoped lang="scss">
#app_widget .desctiprion_button{
  background: white;
  color: #0071c2;
  display: block;
  margin-bottom: 2vw;
  padding-bottom: 1vw;
  font-size: .9375rem !important;
  cursor: pointer;
}
#app_widget .panel_header {
  display: grid;
  grid-template-columns: 175px 1fr;
  grid-column-gap: 30px;
  align-items: start;
  width: 95%;
  cursor: default;
  p {
    margin-bottom: 0;
  }
  .avatar {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 193px;
    border-radius: 5px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 10px;
    cursor: pointer;
    &__count {
      padding: 4px 7px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
        margin: 0;
      }
    }
  }
  .description {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    &__text {
      &__title {
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #001239;
      }
      &__descr {
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        margin-top: 12px;
        max-width: 85%;
        display: block; /* Fallback for non-webkit */
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tags,
      .extra {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
      .tags {
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        margin-top: 12px;
        margin-bottom: 30px;
        p {
          position: relative;
          margin-right: 30px;
          &:first-of-type {
            &::before {
              display: none;
            }
          }
          &::before {
            content: "";
            position: absolute;
            top: 6px;
            left: -17px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #ff8413;
          }
        }
      }
      .extra {
        p {
          font-weight: 500;
          font-size: 16px;
          line-height: 19px;
          color: #ff8413;
          margin-right: 20px;
        }
      }
    }
    &__actions {
      text-align: center;
      &__price {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #001239;
      }
      &__count {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #ff8413;
        margin-top: 10px;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 6px;
        margin-bottom: 10px;
        p {
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          color: #000000;
          margin: 0 6px;
        }
      }
    }
  }
}
#app_widget .people_count {
  border-top: 1px solid #e9e9e9;
  padding: 30px 14px 20px;
  margin: 0 10px;
  p {
    margin-bottom: 0;
  }
  &__title {
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
    color: #021011;
  }
  &__wrapper {
    margin-top: 26px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
    &__single {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &__title {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #021011;
      }
      div {
        margin-left: 20px;
        &:first-of-type {
          p {
            &:first-of-type {
              font-size: 16px;
              line-height: 19px;
              color: #021011;
              margin-bottom: 6px;
            }
            &:last-of-type {
              font-size: 10px;
              line-height: 12px;
              color: #cfd7e3;
            }
          }
        }
        &:last-of-type {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-left: 20px;
          p {
            margin: 0 6px;
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            text-align: center;
            color: #021011;
          }
        }
      }
    }
  }
}
</style>