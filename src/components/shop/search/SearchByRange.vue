<template>
    <!-- Price Filter Options Start -->
    <div class="search-filter mb-40">
        <h3 class="sidebar-title">filter by price</h3>
        <form action="#" class="sidbar-style mt-5">
            <vue-slider :enable-cross="false"
                        :interval="100"
                        :max="5000"
                        :min="1000"
                        :process-style="{ backgroundColor: 'orange' }"
                        :tooltip="'none'"
                        :tooltip-style="{ backgroundColor: 'orange', borderColor: 'orange' }"
                        :use-keyboard="true"
                        v-model="value">
                <template v-slot:process="{ start, end, style }">
                    <div :style="style" class="vue-slider-process">
                        <div :class="[
                              'merge-tooltip',
                              'vue-slider-dot-tooltip-inner',
                              'vue-slider-dot-tooltip-inner-top',
                            ]">
                            {{ value[0] }} - {{ value[1] }}
                        </div>
                    </div>
                </template>
                <template v-slot:dot="{ value, focus }">
                    <div :class="['custom-dot', { focus }]"></div>
                </template>
            </vue-slider>
        </form>
    </div>
    <!-- Price Filter Options End -->
</template>

<script>
    export default {
        name: "SearchByRange",
        data: function () {
            return {
                value: [2500, 3550],
            }
        },
    }
</script>

<style scoped>
    .merge-tooltip {
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translate(-50%, -15px);
        background-color: orange;
    }
    .merge-tooltip:after {
        border-top-color: orange;
    }
    .custom-dot {
        width: 100%;
        height: 100%;
        border-radius: 0;
        background-color: orange;
        transition: all .3s;
    }

    .custom-dot:hover {
        transform: rotateZ(45deg);
    }

    .custom-dot.focus {
        border-radius: 50%;
    }
</style>