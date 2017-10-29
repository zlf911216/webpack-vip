<template>
	<div class="sss">
		<p>2321112</p>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
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
		background: blue
</style>
