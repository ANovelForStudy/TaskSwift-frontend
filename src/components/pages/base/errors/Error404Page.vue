<template>
	<div class="error-page">
		<h1>Ошибка 404</h1>
		<p>К сожалению, запрашиваемая страница не найдена.</p>
		<router-link to="/">Вернуться на главную страницу</router-link>
	</div>
</template>

<style scoped>
.error-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 20px;
}

h1 {
	font-size: 36px;
	margin-bottom: 20px;
}

p {
	font-size: 20px;
	margin-bottom: 20px;
}

a {
	font-size: 18px;
	color: #007bff;
	text-decoration: none;
}
</style>
