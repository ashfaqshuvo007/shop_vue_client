<template>
	<!-- Breadcrumb Start -->
	<div class="breadcrumb-area">
		<div class="container"  style="padding: 0;">
			<div class="breadcrumb">
				<ul class="d-flex align-items-center">
					<li v-for="(crumb, index) in crumbs">
						<router-link :to="{name: crumb.name}">{{crumb.text}}</router-link>
					</li>
				</ul>
			</div>
		</div>
		<!-- Container End -->
	</div>
	<!-- Breadcrumb End -->
</template>

<script>
	export default {
		name: "BreadCrumb",
		props: {
			linkList: {
				type: Array,
				default: [],
			}
		},
		computed: {
			crumbs: function () {
				let _vm = this;
				let pathArray = _vm.$route.path.split("/");
				pathArray.shift();
				return pathArray.reduce((breadcrumbArray, path, idx) => {
					if (path !== '' && idx < _vm.$route.matched.length) {
						breadcrumbArray.push({
							name: _vm.$route.matched[idx].name,
							text: _vm.$route.matched[idx].meta.breadCrumb || path,
						});
					}
					return breadcrumbArray;
				}, []);
			}
		}
	}
</script>

<style scoped>

</style>