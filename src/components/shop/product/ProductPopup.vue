<template>
    <!-- Quick View Content Start -->
    <div class="main-product-thumbnail quick-thumb-content" v-show="popUpStatus">
        <div class="modal-backdrop fade show"></div>
        <div class="container">
            <!-- The Modal -->
            <div class="modal fade show" style="display: block;">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <button @click="disableProductPopup" class="close" data-dismiss="modal" type="button">
                                &times;
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body">
                            <div class="row">
                                <!-- Main Thumbnail Image Start -->
                                <div class="col-lg-5 col-md-6 col-sm-5">
                                    <!-- Thumbnail Image End -->
                                    <div class="product-thumbnail mt-20">
                                        <lingallery :width="400" :height="330" :items="product.images"/>
                                    </div>
                                    <!-- Thumbnail image end -->
                                </div>
                                <!-- Main Thumbnail Image End -->
                                <!-- Thumbnail Description Start -->
                                <div class="col-lg-7 col-md-6 col-sm-7">
                                    <div class="thubnail-desc fix mt-sm-40">
                                        <h3 class="product-header">{{product.name}}</h3>
                                        <div class="pro-price mtb-30">
                                            <p class="d-flex align-items-center">
                                                <span class="prev-price">{{product.originalPrice}}</span>
                                                <span class="price">${{product.sellingPrice}}</span>
                                                <span class="saving-price">save {{product.discountPercent}}%</span></p>
                                        </div>
                                        <p class="mb-20 pro-desc-details">{{product.description}}</p>
                                        <div :class="attr.class"
                                             class="mb-20 clearfix"
                                             v-for="attr in product.selectingAttributes">
                                            <label>{{attr.title}}</label>
                                            <SelectDropdown :items="attr.options"
                                                            v-if="attr.options.length > 5">
                                            </SelectDropdown>
                                            <ul class="color-list">
                                                <li v-for="option in attr.options">
                                                    <a :class="option.value"
                                                       :data-value="option.value"></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="box-quantity d-flex">
                                            <form action="#">
                                                <input class="quantity mr-40" min="1" type="number" value="1">
                                            </form>
                                            <a class="add-cart">add to cart</a>
                                        </div>
                                        <div class="pro-ref mt-15">
                                            <p>
												<span class="in-stock" v-if="product.stockQuantity > 0">
													<i class="ion-checkmark-round"></i> IN STOCK
												</span>
                                                <span class="out-stock" v-else>
													<i class="ion-close-round"></i> OUT STOCK
												</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- Thumbnail Description End -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Quick View Content End -->
</template>

<script>
    import SelectDropdown from "@/components/global/SelectDropdown";
	import Lingallery from "@/components/core/photo/Lingallery";

    export default {
        name: "ProductPopup",
        components: {SelectDropdown, Lingallery,},
        props: {
            showProductPopup: {
                type: Boolean,
                default: false,
            },
            closeProductPopup: {
                type: Function,
            },
            product: {
                type: Object,
                default: function () {
                    return {
                        title: 'Printed Summer Dress',
                        description: 'Long printed dress with thin adjustable straps.' +
                            '<br>V-neckline and wiring under the bust with ruffles at the bottom of the dress.',
                        previousPrice: 25.00,
                        currentPrice: 22.00,
                        savingPercent: 12,
                        availableQuantity: 0,
                        images: [
                            {src: '/img/products/11.jpg', thumbnail: '/img/products/thumb.jpg', caption: '11',},
                            {src: '/img/products/12.jpg', thumbnail: '/img/products/thumb.jpg', caption: '12',},
                            {src: '/img/products/13.jpg', thumbnail: '/img/products/thumb.jpg', caption: '13',},
                            {src: '/img/products/14.jpg', thumbnail: '/img/products/thumb.jpg', caption: '14',},
                            {src: '/img/products/15.jpg', thumbnail: '/img/products/thumb.jpg', caption: '15',},
                            {src: '/img/products/16.jpg', thumbnail: '/img/products/thumb.jpg', caption: '16',},
                            {src: '/img/products/17.jpg', thumbnail: '/img/products/thumb.jpg', caption: '17',},
                            {src: '/img/products/18.jpg', thumbnail: '/img/products/thumb.jpg', caption: '18',},
                        ],
                        index: null,
                        selectingAttributes: [
                            {
                                title: 'Size',
                                class: 'product-size',
                                options: [
                                    {text: 'C', value: 'children'},
                                    {text: 'S', value: 'small'},
                                    {text: 'M', value: 'medium'},
                                    {text: 'L', value: 'large'},
                                    {text: 'XL', value: 'xlarge'},
                                    {text: 'XXL', value: 'xxlarge'},
                                ]
                            },
                            {
                                title: 'Color',
                                class: 'color',
                                options: [
                                    {text: 'Orange', value: 'orange'},
                                    {text: 'Paste', value: 'paste'},
                                    {text: 'Red', value: 'red'},
                                    {text: 'Blue', value: 'blue'},
                                    {text: 'Green', value: 'green'},
                                ]
                            }
                        ]
                    }
                },
            },
        },
        computed: {
            popUpStatus: function () {
                return this.showProductPopup;
            }
        },
        watch: {
            popUpStatus: function (newValue, oldValue) {
                if (newValue) {
                    if (document && document.body) {
                        var orig = document.body.className;
                        document.body.className = orig + (orig ? ' ' : '') + 'modal-open';
                    }
                } else {
                    if (document && document.body) {
                        document.body.className = document.body.className.replace(/ ?modal-open/, '');
                    }
                }
            }
        },
        methods: {
            disableProductPopup: function () {
                this.closeProductPopup();
            },
        },
    }
</script>

<style scoped>

</style>