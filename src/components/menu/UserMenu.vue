<template>
    <!-- Cart Box Start Here -->
    <div class="col-lg-3 col-md-3">
        <div class="cart-box">
            <ul class="d-flex justify-content-lg-end justify-content-center align-items-center">
                <li>
                    <a>
                        <i class="lnr lnr-heart"></i>
                        <span class="my-cart">
                            <span>Wish</span>
                            <span>list ({{wishListItemCount}})</span>
                        </span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="lnr lnr-user"></i>
                        <span class="my-cart" v-if="authenticated">
                            <span>Welcome<br><strong>{{userInfo.first_name}}</strong></span>
                        </span>
                        <span class="my-cart" v-else>
                            <a  href="/authentication/#/login/"><strong>Sign in</strong><br>
                                Or <strong> Join</strong></a>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <!-- Cart Box End Here -->
</template>

<script>
    export default {
        name: "UserMenu",
        data: function () {
            return {
                wishListItemCount: 0,
                authenticated: false,
                userInfo: null,
            }
        },
        mounted() {
            let userInfo = this.$store.getters['authStore/userInfo'];
            if (userInfo.token !== null) {
                this.authenticated = true;
                this.userInfo = userInfo;
            }
        },
    }
</script>

<style scoped>

</style>