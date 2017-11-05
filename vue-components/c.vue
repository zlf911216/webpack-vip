<template>
	<div class="sss">
		<p>sss1111ssssss1111</p>
		<p>223232323</p>
		<p>5s5s55s5sss</p>
		<img :src="ismg">
	</div>
</template>
<script>
	export default {
		data() {
			return {
				ismg: require('~images/112.png')
			}
		},
		created() {
			console.log(22323)
		},
		components: {}
	}
</script>
<style lang="sass" scoped="scoped">
	.sss
		width: 200px
		height: 200px
		img
			display: block
			width: 50px
			height: 50px
</style>
