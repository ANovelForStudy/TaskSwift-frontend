<template>
	<v-container>
		<h1>Профиль пользователя</h1>

		<div
			v-if="isUserInfoLoading"
			class="text-center my-auto"
		>
			<v-progress-linear
				:size="64"
				indeterminate
				class="my-10"
			></v-progress-linear>
		</div>

		<v-row v-if="!isUserInfoLoading">
			<v-col
				cols="12"
				md="4"
			>
				<v-card>
					<v-card-text>
						<v-img
							class="ma-2 bg-white rounded-xl mx-auto"
							:src="user.profile_picture || 'https://robohash.org/{{ user.first_name }}{{ user.last_name }}'"
							alt="Аватар"
							:width="400"
						></v-img>
						<v-divider class="my-3"></v-divider>
						<v-file-input
							v-model="user.profile_picture"
							label="Фотография профиля"
							variant="outlined"
							color="accent"
						/>
					</v-card-text>
				</v-card>
				<div class="my-5"></div>
				<v-card>
					<v-card-title>Контакты</v-card-title>
					<v-card-text class="my-3"
						><v-text-field
							v-model="user.phone"
							label="Номер телефона"
							prepend-icon="phone"
							variant="outlined"
							color="accent" />
						<v-text-field
							v-model="user.email"
							label="Электронная почта"
							disabled
							prepend-icon="email"
							variant="outlined"
							color="accent" />
						<v-text-field
							v-model="user.social_links"
							label="Ссылка на социальные сети"
							prepend-icon="link"
							variant="outlined"
							color="accent"
					/></v-card-text>
				</v-card>
				<div class="my-5"></div>
				<v-card>
					<v-card-title>Контакты для экстренных случаев</v-card-title>
					<v-card-text class="my-3"
						><v-text-field
							v-model="user.emergency_contact_name"
							label="Имя контактного лица для экстренных случаев"
							prepend-icon="person"
							variant="outlined"
							color="accent"
						/><v-text-field
							v-model="user.emergency_contact_phone"
							label="Телефон для экстренных случаев"
							prepend-icon="phone"
							variant="outlined"
							color="accent"
						/>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				md="8"
			>
				<v-card>
					<v-card-title class="my-3">Общая информация</v-card-title>
					<v-card-text>
						<v-form
							ref="form"
							v-model="valid"
							lazy-validation
						>
							<v-text-field
								v-model="user.first_name"
								label="Имя"
								required
								variant="outlined"
								color="accent"
							/>
							<v-text-field
								v-model="user.last_name"
								label="Фамилия"
								required
								variant="outlined"
								color="accent"
							/>

							<v-select
								v-model="user.gender"
								:items="genderItems"
								label="Пол"
								variant="outlined"
								color="accent"
							/>
							<v-text-field
								v-model="user.address"
								label="Адрес"
								variant="outlined"
								color="accent"
							/>

							<v-text-field
								v-model="user.date_of_birth"
								label="Дата рождения"
								variant="outlined"
								color="accent"
							/>
							<v-text-field
								v-model="user.date_joined"
								label="Дата устройства на работу"
								variant="outlined"
								color="accent"
							/>
							<v-textarea
								v-model="user.skills"
								label="Навыки и компетенции"
								variant="outlined"
								color="accent"
							/>
							<v-textarea
								v-model="user.bio"
								label="Краткая биография"
								variant="outlined"
								color="accent"
							/>

							<ActionButton
								icon="update"
								@click="updateProfile"
								:disabled="!valid"
								:loading="loading"
								>Обновить профиль</ActionButton
							>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-snackbar v-model="snackbar">
			{{ snackbar_text }}

			<template v-slot:actions>
				<v-btn
					color="accent"
					variant="text"
					@click="snackbar = false"
					>Закрыть сообщение</v-btn
				>
			</template>
		</v-snackbar>
	</v-container>
</template>

<script>
// Сторонние библиотеки
import axios from "axios";

// Получение данных о пользователе
import getUserInfo from "@/hooks/common/users/getUserInfo";

// Компоненты
import ActionButton from "@/components/ui/ActionButton";

export default {
	data: () => ({
		// Уведомление снизу об успешном создании задачи
		snackbar: false,
		snackbar_text: "",

		loading: false,

		valid: true,
		genderItems: [
			{ title: "Мужской", value: "M" },
			{ title: "Женский", value: "F" },
		],
	}),
	components: {
		ActionButton,
	},
	setup() {
		// Получение данных о пользователе
		const { user, isUserInfoLoading } = getUserInfo();

		return {
			// Объект пользователя
			user,

			// Индикатор загрузки данных (нужен для отображения индикатора загрузки данных)
			isUserInfoLoading,
		};
	},
	methods: {
		updateProfile() {
			// TODO: Добавить глубокую проверку на идентичность значений полей формы и
			// значений полей объекта, чтобы лишний раз не дёргать сервер

			axios
				.put("/api/v1/auth/users/me/", this.user)
				.then((response) => {
					// Отобразить уведомление об успешном обновлении
					snackbar_text: "Данные профиля успешно обновлены";
					snackbar: true;

					// Перезаписать объект пользователя
					this.user = response.data;
				})
				.catch((error) => {
					// Отобразить ошибку, если она возникла при обновлении
					console.error(error);
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
};
</script>

<style lang="scss" scoped></style>
