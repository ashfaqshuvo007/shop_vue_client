<template>
	<!-- Footer Area Start Here -->
	<footer class="off-white-bg2 pt-20 bdr-top pt-sm-55">
		<!-- Footer Top Start -->
		<div class="footer-top pb-0">
			<div class="container pt-5">
				<!-- Sign up Newsletter Start -->
				<div class="row mb-60">
					<div class="col-xl-7 col-lg-7 ml-auto mr-auto col-md-8">
						<div class="news-desc text-center mb-30">
							<h3>Sign Up For Newsletters</h3>
							<p>Be the First to Know. Sign up for newsletter today</p>
						</div>
						<div class="newsletter-box">
							<form action="#">
								<input class="subscribe" id="subscribe"
									   name="email"
									   placeholder="your email address"
									   type="text">
								<button class="submit" type="submit">subscribe!</button>
							</form>
						</div>
					</div>
				</div>
				<!-- Signup-Newsletter End -->
				<div class="row">
					<!-- Single Footer Start -->
					<div class="col-lg-2 col-md-4 col-sm-6" v-for="group in menuGroups">
						<div class="single-footer mb-sm-40">
							<h3 class="footer-title">{{group.title}}</h3>
							<div class="footer-content">
								<ul class="footer-list">
									<li><a :href="item.url" v-for="item in group.items">{{item.title}}</a></li>
								</ul>
							</div>
						</div>
					</div>
					<!-- Single Footer Start -->
					<div class="col-lg-4 col-md-6 col-sm-6">
						<div class="single-footer mb-sm-40">
							<h3 class="footer-title">My Account</h3>
							<div class="footer-content">
								<ul class="footer-list address-content">
									<li><i class="lnr lnr-map-marker"></i> Address: 169-C, Technohub, Dubai Silicon
										Oasis.
									</li>
									<li><i class="lnr lnr-envelope"></i><a href="#"> mail Us: Support@truemart.com </a>
									</li>
									<li>
										<i class="lnr lnr-phone-handset"></i> Phone: (+800) 123 456 789)
									</li>
								</ul>
								<div class="payment mt-25 bdr-top pt-30">
									<a href="#"><img alt="payment-image" class="img" src="img/payment/1.png"></a>
								</div>
							</div>
						</div>
					</div>
					<!-- Single Footer Start -->
				</div>
				<!-- Row End -->
			</div>
			<!-- Container End -->
		</div>
		<!-- Footer Top End -->
		<!-- Footer Bottom Start -->
		<div class="footer-bottom pb-20">
			<div class="container pb-20">
				<div class="copyright-text text-center">
					<p>Copyright © 2019 <a href="#" target="_blank">Sol-Factory</a> All Rights Reserved.</p>
				</div>
			</div>
			<!-- Container End -->
		</div>
		<!-- Footer Bottom End -->
	</footer>
	<!-- Footer Area End Here -->
</template>

<script>
    export default {
        name: "FooterMenu",
        data: function () {
            return {
                menuGroups: [
                    {
                        title: 'Information',
                        items: [
                            {title: 'About Us', url: '',},
                            {title: 'Privacy Policy', url: '',},
                            {title: 'Terms & Conditions', url: '',},
                            {title: 'FAQs', url: '',},
                        ],
                    },
                    {
                        title: 'Customer Service',
                        items: [
                            {title: 'Contact Us', url: '',},
                            {title: 'Order History', url: '',},
                            {title: 'Wish List', url: '',},
                            {title: 'Site Map', url: '',},
                        ],
                    },
                    {
                        title: 'Extras',
                        items: [
                            {title: 'Newsletter', url: '',},
                            {title: 'Brands', url: '',},
                            {title: 'Affiliate', url: '',},
                            {title: 'Specials', url: '',},
                        ],
                    },
                    {
                        title: 'Account',
                        items: [
                            {title: 'Payment Methods', url: '',},
                            {title: 'Security', url: '',},
                            {title: 'Business', url: '',},
                            {title: 'Messages', url: '',},
                        ],
                    },
                ]
            }
        },
    }
</script>

<style scoped>

</style>