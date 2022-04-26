<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :value="countText()"
                prepend-inner-icon="mdi-account"
                height="44"
                readonly
                v-bind="attrs"
                v-on="on"
                hide-details
                outlined
                dense
                background-color="#fff"
            ></v-text-field>
        </template>
        <div class="count_card" :key="refreshKey">
            <div class="card_content">
                <div class="action_item">
                    <div>
                        <p>Взрослые</p>
                        <p>Старше 12 лет</p>
                    </div>
                    <div>
                        <v-btn 
                            icon
                            @click="onClick(-1, 'adult')"
                        >
                            <svg
                                :style="svgAccentColor"
                                id="widget_people_1"
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
                            <p>{{model.adult}}</p>
                        <v-btn 
                            icon
                            @click="onClick(1, 'adult')"
                        >
                            <svg
                                :style="svgAccentColor"
                                id="widget_people_2"
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
                <div class="action_item">
                    <div>
                        <p>Дети</p>
                        <p>До 12 лет</p>
                    </div>
                    <div>
                        <v-btn 
                            icon
                            @click="onClick(-1, 'child')"
                        >
                            <svg
                                :style="svgAccentColor"
                                id="widget_people_1"
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
                            <p>{{model.child}}</p>
                        <v-btn 
                            icon
                            @click="onClick(1, 'child')"
                        >
                             <svg
                                :style="svgAccentColor"
                                id="widget_people_2"
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
    </v-menu>
</template>

<script>
export default {
    props: {
        model: Object
    },
    data: () => ({
        adult: 1,
        child: 0,
        refreshKey: 0,
        menu: false
    }),
    computed: {
         svgAccentColor() {
            return {
                fill: localStorage.getItem("accent") + " !important",
            };
        },
    },
    methods: {
        countText() {
            return `${this.model.adult} взрослых ${this.model.child} детей`
        },
        onClick(num, type) {
            if (this.model[`${type}`]+num < 0) {
                return
            }
            this.model[`${type}`]+=num
            this.refreshKey++
        }
    }
}
</script>

<style lang="scss" scoped>
.count_card {
    width: 264px;
    padding: 20px 0px;
    background: #FFFFFF;
    box-shadow: 0px 10px 20px rgba(138, 149, 146, 0.1);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    .action_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:first-of-type {
            margin-bottom: 12px;
        }
        div {
            &:first-of-type {
                p {
                    margin-bottom: 0;
                    &:first-of-type {
                        font-family: 'Gilroy', sans-serif;
                        font-size: 16px;
                        line-height: 19px;
                        color: #021011;
                        margin-bottom: 6px;
                    }
                    &:last-of-type {
                        font-family: 'Gilroy', sans-serif;
                        font-size: 10px;
                        line-height: 12px;
                        color: #CFD7E3;
                    }
                }
            }
            &:last-of-type {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 18px;
                p {
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 16px;
                    text-align: center;
                    color: #021011;
                    margin: 0 3px;
                }
            }
        }
    }
}
</style>