<template>
	<div class="sss">
		<div>2321112</div>
		<p>
			<router-link to="/c">Go to c</router-link>
			<router-link to="/h">Go to h</router-link>
		</p>
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				hg: require('~images/112.png')
			}
		},
		created() {
			setTimeout(_ => {
				console.log(111)
			}, 2000)
		},
		components: {}
	}
</script>
<style lang="sass" scoped="scoped">
	.sss
		width: 200px
		height: 200px
</style>
