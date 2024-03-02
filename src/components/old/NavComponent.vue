<template>
	<nav :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
			<h2>TaskSwift</h2>
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Общее</h3>
		<div class="my-menu">
			<router-link to="/" class="my-button">
				<span class="material-icons">home</span>
				<span class="text">Главная</span>
			</router-link>
			<router-link to="/about" class="my-button">
				<span class="material-icons">description</span>
				<span class="text">О сайте</span>
			</router-link>
			<router-link to="/1" class="my-button">
				<span class="material-icons">email</span>
				<span class="text">Обратная связь</span>
			</router-link>
		</div>
		<h3>Задачи</h3>
		<div class="my-menu">
			<router-link to="/tasks" class="my-button">
				<span class="material-icons">timeline</span>
				<span class="text">Управление</span>
			</router-link>
		</div>

		<h3>Заметки</h3>
		<div class="my-menu">
			<router-link to="/5" class="my-button">
				<span class="material-icons">timeline</span>
				<span class="text">Управление</span>
			</router-link>
		</div>

		<h3>Работники</h3>
		<div class="my-menu">
			<router-link to="/6" class="my-button">
				<span class="material-icons">person_add</span>
				<span class="text">Добавить</span>
			</router-link>
			<router-link to="/7" class="my-button">
				<span class="material-icons">manage_accounts</span>
				<span class="text">Управление</span>
			</router-link>
		</div>

		<h3>Группы работников</h3>
		<div class="my-menu">
			<router-link to="/8" class="my-button">
				<span class="material-icons">group_add</span>
				<span class="text">Добавить</span>
			</router-link>
			<router-link to="/9" class="my-button">
				<span class="material-icons">groups</span>
				<span class="text">Управление</span>
			</router-link>
		</div>

		<div class="flex"></div>

		<div class="my-menu">
			<router-link to="/settings" class="my-button">
				<span class="material-icons">settings</span>
				<span class="text">Настройки</span>
			</router-link>
			<router-link to="/logout" class="my-button">
				<span class="material-icons">logout</span>
				<span class="text">Выйти из аккаунта</span>
			</router-link>
		</div>
	</nav>
</template>

<script setup>
import { ref } from "vue";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value;
	localStorage.setItem("is_expanded", is_expanded.value);
};
</script>

<style lang="scss">
nav {
	display: flex;
	flex-direction: column;

	background-color: var(--dark);
	color: var(--light);

	width: calc(2rem + 32px);
	min-width: calc(2rem + 32px);
	overflow: hidden;

	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 1rem;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}

			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h4,
	h3,
	h2,
	.my-button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-top: 0.5rem;
		margin-bottom: 0.8rem;
		text-transform: uppercase;
	}

	h4 {
		color: var(--second-grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		margin-left: 1rem;
		text-transform: uppercase;
	}

	.logo > h2 {
		color: var(--light);
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.my-menu {
		margin: 0 -1rem;

		.my-button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 1rem 1rem;

			.material-icons {
				font-size: 1.7rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: var(--dark-alt);

				.material-icons,
				.text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons,
				.text {
					color: var(--primary);
				}
			}
		}
	}

	// &.footer {
	// 	opacity: 0;
	// 	transition: opacity 0.3s ease-in-out;

	// 	p {
	// 		font-size: 0.875rem;
	// 		color: var(--grey);
	// 	}
	// }

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: 0;

			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h4,
		h3,
		h2,
		.my-button .text {
			opacity: 1;
		}

		.my-button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		// .footer {
		// 	opacity: 0;
		// }
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>
