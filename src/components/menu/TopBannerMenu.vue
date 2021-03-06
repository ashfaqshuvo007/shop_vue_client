<template>
	<!-- Main Header Area Start Here -->
	<header>
		<!-- Header Top Start Here -->
		<div class="header-top-area">
			<div class="container">
				<!-- Header Top Start -->
				<div class="header-top">
					<ul>
						<li><a href="/">Sol Factory BD</a></li>
					</ul>
					<ul>
						<li v-if="authenticated">
							<a @click="$toasted.show('Not enabled yet. Coming Soon!')">My Buyer Profile</a>&nbsp;&nbsp;|&nbsp;&nbsp;
							<a href="/account/">My Seller Profile</a>
						</li>
						<li><a>My Account<i class="lnr lnr-chevron-down"></i></a>
							<!-- Dropdown Start -->
							<ul class="ht-dropdown" v-if="authenticated">
								<li><a href="/account/">Profile Setting</a></li>
								<li><a @click="$toasted.show('Not enabled yet. Coming Soon!')">Security Setting</a></li>
								<li><a @click="logoutUser">Logout</a></li>
							</ul>
							<ul class="ht-dropdown" v-else>
								<li><a href="/authentication/#/login/">Login</a></li>
								<li><a href="/authentication/#/signup/">Register</a></li>
							</ul>
							<!-- Dropdown End -->
						</li>
					</ul>
				</div>
				<!-- Header Top End -->
			</div>
			<!-- Container End -->
		</div>
		<!-- Header Top End Here -->
	</header>
	<!-- Main Header Area End Here -->
</template>

<script>

    export default {
        name: "TopBannerMenu",
        components: {},
        data: function () {
            return {
                authenticated: false,
            }
        },
        mounted() {
            let userInfo = this.$store.getters['authStore/userInfo'];
            if (userInfo.token !== null) {
                this.authenticated = true;
            }
        },
        methods: {
            logoutUser: function () {
                this.$store.dispatch('authStore/logoutUser');
            }
        },
    }
</script>

<style scoped>

</style>