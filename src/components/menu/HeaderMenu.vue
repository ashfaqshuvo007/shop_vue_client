<template>
	<!-- Header Middle Start Here -->
	<div class="header-middle ptb-15" style="position: sticky; z-index:199; top:0; left: 0;">
		<div class="container">
			<div class="row align-items-center no-gutters">
				<div class="col-lg-2 col-md-2">
					<div class="logo">
						<a href="/application/"><img :src="logoUrl" alt="logo-image"></a>
					</div>
				</div>
				<CategoryDropdown></CategoryDropdown>
				<UserMenu></UserMenu>
			</div>
			<!-- Row End -->
		</div>
		<!-- Container End -->
	</div>
	<!-- Header Middle End Here -->
</template>

<script>
    import UserMenu from "./UserMenu";
    import CategoryDropdown from "./CategoryDropdown";
    import Affix from 'easy-affix';

    export default {
        name: "HeaderMenu",
        components: {
            CategoryDropdown,
            UserMenu,
            Affix,
        },
        data: function () {
            return {
                logoUrl: '/img/logo/logo.png',
                userInfo: null,
            }
        },
        mounted() {
            let userInfo = this.$store.getters['authStore/userInfo'];
            if (userInfo.token !== null) {
                this.userInfo = userInfo;
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