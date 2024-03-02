<template>
	<footer class="footer">
		<div class="content has-text-centered">
			<p>
				<strong>TaskSwift</strong> by <a href="#">Roman Likhachev</a>.
				The source code is licensed
				<a href="http://opensource.org/licenses/mit-license.php">MIT</a
				>.
			</p>
			<p>&copy; 2023 TaskSwift. All rights reserved.</p>
		</div>
	</footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
	background-color: var(--light-alt);
	color: var(--dark-alt);
	padding: 0.5rem;
	text-align: center;
	border-top: 1px solid var(--grey-light);

	a {
		color: var(--primary);
		text-decoration: none;

		&:hover {
			color: var(--primary-dark);
		}
	}
}
</style>
