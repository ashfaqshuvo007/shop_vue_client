<template>
	<!-- Main Wrapper Start Here -->
	<div class="wrapper" style="background: #f6f6f6;">
		<TopBannerMenu></TopBannerMenu>
		<div>
			<UserMainMenu></UserMainMenu>
			<BreadCrumb :linkList="linkDepth"
						v-if="linkDepth.length > 0"></BreadCrumb>
			<router-view class="mb-2" id="router-view"></router-view>
		</div>
		<FooterMenu></FooterMenu>
	</div>
	<!-- Main Wrapper End Here -->
</template>

<script>
    import TopBannerMenu from '@/components/menu/TopBannerMenu.vue';
    import UserMainMenu from '@/components/account/UserMainMenu.vue';
    import BreadCrumb from "@/components/global/BreadCrumb";
    import FooterMenu from "@/components/footer/FooterMenu";

    export default {
        name: 'PublicDashboard',
        components: {
            TopBannerMenu,
            UserMainMenu,
            BreadCrumb,
            FooterMenu,
        },
        props: {},
        data: function () {
            return {
                linkDepth: [
                    {text: 'Account', url: '#', active: false,},
                ],
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
