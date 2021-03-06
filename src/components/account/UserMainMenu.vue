<template>
	<div>
		<div class="header-bottom">
			<div class="container" style="padding: 0">
				<div class="row align-items-center" style="background: #e62e03;">
					<div class="col-xl-9 col-lg-8 col-md-12" style="padding: 0" >
						<nav class="d-none d-lg-block">
							<ul class="header-bottom-list d-flex">
								<li v-bind:key="item.key"
									v-for="item in mainMenu.menuData">
									<a :href="item.href" @click.stop="(e) => item.active=!item.active">
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
	</div>
</template>

<script>
    export default {
        name: "UserMainMenu",
        components: {},
        data: function () {
            return {
                mainMenu: {
                    menuData: [
                        {
                            name: 'Go to Shop',
                            href: '/application/#/shop/',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [],
                        },
                        {
                            name: 'My Products',
                            href: '#',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [
                                {
                                    name: 'Add Product',
									href: '/account/#/product/create/',
									active: false,
									key: this.$uuid.v4(),
									items: [],
								},
                                {
                                    name: 'Product List',
									href: '/account/#/product/list/',
									active: false,
									key: this.$uuid.v4(),
									items: [],
								},
                            ]
                        },
                        {
                            name: 'My Orders',
                            href: '#',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [
                                {
                                    name: 'All Orders',
									href: '/account/#/orders/list/',
                                    active: false,
                                    key: this.$uuid.v4(),
                                    items: [],
                                },
                                {
                                    name: 'All Reviews',
									href: '/account/#/orders/list/',
                                    active: false,
                                    key: this.$uuid.v4(),
                                    items: [],
                                },
                            ]
                        },
                        {
                            name: 'RFQ Settings',
                            href: '#',
                            active: false,
                            key: this.$uuid.v4(),
                            items: [
                                {
                                    name: 'Quote Management',
                                    href: '#',
                                    active: false,
                                    key: this.$uuid.v4(),
                                    items: [],
                                },
                                {
                                    name: 'Active Requests',
                                    href: '#',
                                    active: false,
                                    key: this.$uuid.v4(),
                                    items: [],
                                },
                                {
                                    name: 'My Buyers',
                                    href: '#',
                                    active: false,
                                    key: this.$uuid.v4(),
                                    items: [],
                                },
                            ]
                        },
                    ],
                    mainMenuOpened: false,
                },
            }
        },
        methods: {
            setMainMenu: function (isOpened) {
                this.mainMenu.mainMenuOpened = isOpened;
            },
            toggleItem: function (item) {
                item.active = !item.active;
            },
        },
    }
</script>

<style scoped>

</style>