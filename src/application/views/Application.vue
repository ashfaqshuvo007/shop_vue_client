<template>
    <!-- Main Wrapper Start Here -->
    <div class="wrapper" style="background: #f6f6f6;">
        <TopBannerMenu></TopBannerMenu>
        <div>
            <HeaderMenu></HeaderMenu>
            <MainMenu></MainMenu>
            <BreadCrumb :linkList="linkDepth" v-if="linkDepth.length > 0"></BreadCrumb>
            <router-view id="router-view"></router-view>
        </div>
        <FooterMenu></FooterMenu>
    </div>
    <!-- Main Wrapper End Here -->
</template>

<script>
    import TopBannerMenu from '@/components/menu/TopBannerMenu.vue';
    import HeaderMenu from '@/components/menu/HeaderMenu.vue';
    import MainMenu from '@/components/menu/MainMenu.vue';
    import BreadCrumb from "@/components/global/BreadCrumb";
    import FooterMenu from "@/components/footer/FooterMenu";

    export default {
        name: 'PublicDashboard',
        components: {
            TopBannerMenu,
            HeaderMenu,
            MainMenu,
            BreadCrumb,
            FooterMenu,
        },
        props: {},
        data: function () {
            return {
                linkDepth: [
                    // {text: 'Home', url: '#', active: false,},
                    // {text: 'Shop', url: '#', active: true,},
                ],
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
