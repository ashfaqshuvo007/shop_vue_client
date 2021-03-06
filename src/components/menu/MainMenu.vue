<template>
    <div>
        <div class="header-bottom">
            <div class="container">
                <div class="row align-items-center" style="background: #e62e03;">
                    <div class="col-xl-2 col-lg-2 col-md-2 vertical-menu d-none d-lg-block p-0">
                        <span @click="toggleCategoryMenu"
                              class="categorie-title">
                            Shop by Categories
                        </span>
                    </div>
                    <div class="col-xl-9 col-lg-8 col-md-8 pt-0 pb-0">
                        <nav class="d-none d-lg-block">
                            <ul class="header-bottom-list d-flex">
                                <li v-bind:key="item.key"
                                    v-for="item in mainMenu.menuData">
                                    <a @click.stop="(e) => item.active=!item.active" :href="item.href">
                                        {{item.name}}&nbsp;
                                        <i class="fa fa-angle-down" v-if="item.items.length > 0"></i>
                                    </a>
                                    <!-- Home Version Dropdown Start -->
                                    <ul class="ht-dropdown dropdown-style-two" v-if="item.items.length > 0">
                                        <li v-bind:key="nested.key"
                                            v-for="nested in item.items">
                                            <a :href="nested.href">{{nested.name}}</a>
                                        </li>
                                    </ul>
                                    <!-- Home Version Dropdown End -->
                                </li>
                            </ul>
                        </nav>
                        <div class="mobile-menu d-lg-none mean-container">
                            <div @click="setMainMenu(!mainMenu.mainMenuOpened)" class="mean-bar">
                                <a @click.stop="setMainMenu(true)"
                                   class="meanmenu-reveal"
                                   v-show="!mainMenu.mainMenuOpened">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </a>
                                <a @click.stop="setMainMenu(false)"
                                   class="meanmenu-reveal meanclose" v-show="mainMenu.mainMenuOpened">X</a>
                                <nav class="mean-nav"
                                     v-show="mainMenu.mainMenuOpened">
                                    <ul>
                                        <li v-for="item in mainMenu.menuData">
                                            <a @click.stop="toggleItem(item)">{{item.name}}</a>
                                            <a @click.stop="toggleItem(item)"
                                               class="mean-expand">{{ item.active ? '-':'+' }}</a>
                                            <!-- Home Version Dropdown Start -->
                                            <ul v-show="item.active">
                                                <li v-for="nested in item.items">
                                                    <a :href="nested.href">{{nested.name}}</a>
                                                </li>
                                            </ul>
                                            <!-- Home Version Dropdown End -->
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Row End -->
            </div>
            <!-- Container End -->
        </div>
        <CategoryMenu :openCategoryMenu="openCategoryMenu"
                      :setCategoryMenuStatus="setCategoryMenuStatus">
        </CategoryMenu>
    </div>
</template>

<script>
    import CategoryMenu from './CategoryMenu.vue'

    export default {
        name: "MainMenu",
        components: {
            CategoryMenu,
        },
        data: function () {
            return {
                mainMenu: {
                    menuData: [
                        {
                            name: 'Go Shopping',
                            href: '/application/#/shop/',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [],
                        },
                        {
                            name: 'Services',
                            href: '#',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [
                                {name: 'Submit RFQ', href: '#', active: false, key: this.$uuid.v4(), items: [],},
                                {name: 'Logistic Services', href: '#', active: false, key: this.$uuid.v4(), items: [],},
                                {
                                    name: 'Supplier by Regions',
                                    href: '#',
                                    active: false,
                                    key: this.$uuid.v4(),
                                    items: [],
                                },
                            ]
                        },
                        {
                            name: 'Membership',
                            href: '#',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [
                                {
                                    name: 'Supplier Membership',
                                    href: '#',
                                    active: false,
                                    key: this.$uuid.v4(),
                                    items: [],
                                },
                                {
                                    name: 'Buyer Business Identity',
                                    href: '#',
                                    active: false,
                                    key: this.$uuid.v4(),
                                    items: [],
                                },
                            ]
                        },
                        {
                            name: 'About Us',
                            href: '#',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [],
                        },
                        {
                            name: 'Contact Us',
                            href: '#',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [],
                        },
                    ],
                    mainMenuOpened: false,
                },
                openCategoryMenu: false,
            }
        },
        methods: {
            setMainMenu: function (isOpened) {
                this.mainMenu.mainMenuOpened = isOpened;
            },
            toggleItem: function (item) {
                item.active = !item.active;
            },
            toggleCategoryMenu: function () {
                this.openCategoryMenu = !this.openCategoryMenu;
            },
            setCategoryMenuStatus: function (status) {
                if (this.openCategoryMenu !== status)
                    this.openCategoryMenu = status;
            },
        },
    }
</script>

<style scoped>

</style>