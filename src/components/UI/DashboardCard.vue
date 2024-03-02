<template>
	<div class="wrapper">
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">{{ title }}</p>
				<button
					class="card-header-icon"
					aria-label="more options"
					@click="isCardBodyVisible = !isCardBodyVisible"
				>
					<span class="material-icons" v-if="!isCardBodyVisible"
						>expand_more</span
					>
					<span class="material-icons" v-else>expand_less</span>
				</button>
			</header>
			<transition name="slide-fade">
				<div
					v-if="isCardBodyVisible"
					class="card-content"
					:style="{ height: contentHeight + 'px' }"
				>
					<div class="content">
						<h2 class="subtitle">{{ total_number }}</h2>
						<p>Общее количество <slot></slot></p>
					</div>
				</div>
			</transition>
			<transition name="slide-fade">
				<footer
					v-if="isCardBodyVisible"
					class="card-footer"
					:style="{ height: footerHeight + 'px' }"
				>
					<a href="#" class="card-footer-item">Подробнее</a>
				</footer>
			</transition>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isCardBodyVisible: true,
			contentHeight: null,
			footerHeight: null,
		};
	},
	props: { title: String, total_number: Number },
	mounted() {
		this.contentHeight =
			this.$el.querySelector(".card-content").offsetHeight;
		this.footerHeight = this.$el.querySelector(".card-footer").offsetHeight;
	},
	methods: {
		hideCardBody() {
			const cardBody = document.querySelector(".card-content");
			cardBody.style.visibility = "hidden";
		},
	},
};
</script>
<style lang="scss" scoped>
.wrapper {
	.card {
		overflow: hidden;
	}
}
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(-10px);
	opacity: 0;
}
</style>
