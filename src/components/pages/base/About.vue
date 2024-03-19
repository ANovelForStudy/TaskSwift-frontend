<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card
					max-width="500"
					class="mx-auto text-center"
					elevation="24"
				>
					<v-card-subtitle class="text-center my-5">О разработчике</v-card-subtitle>
					<div class="my-5">
						<v-img
							aspect-ratio="1/1"
							cover
							class="mx-auto rounded-circle photo"
							:src="require(`@/assets/img/developer.jpg`)"
						></v-img>
					</div>
					<v-card-title>Лихачёв Роман</v-card-title>
					<v-card-subtitle>Студент IV курса<br />группы "МКИС41"<br />ДГТУ</v-card-subtitle>
					<v-card-text class="text-mono text-justify px-10">
						Мультидисциплинарный разработчик, вдохновленный творчеством и постоянным обучением.
						<br />
						Мои знания охватывают широкий спектр языков программирования, таких как С, С++, Rust, Dart, Python, JavaScript, C#, SQL а
						также множество технологий, включая Vue.js, Vuetify, Bulma, Django, FastAPI, Flask, Docker, LXC, Flet, СУБД PostgreSQL,
						MongoDB, Redis и другие.

						<br />
						<br />
						Мои увлечения выходят за рамки программирования — я обожаю фото- и видеомонтаж, создание векторной графики, 3D моделирование с
						использованием программ Blender 3D и Cinema4D. Я также хорошо владею программами Krita, Adobe Photoshop, Illustrator,
						Audition, Lightroom, Premiere Pro, After Effect, Corel Draw, FL Studio, Audacity. Умею играть на нескольких музыкальных
						инструментах. Мое стремление к постоянному самосовершенствованию привело меня к изучению нескольких иностранных языков, таких
						как английский, немецкий, и японский.

						<br />
						<br />
						Я обожаю творчество и постоянно стремлюсь расширить свои горизонты. Осваиваю новые инструменты и технологии, и люблю применять
						свои знания и навыки на практике, создавая удивительные вещи на грани искусства и технологий.
					</v-card-text>
					<v-card-actions class="justify-center py-7">
						<v-btn icon=""><v-icon class="fa-brands fa-discord"></v-icon></v-btn>

						<v-btn icon="">
							<v-icon class="fa-brands fa-telegram"></v-icon>
						</v-btn>

						<v-btn icon=""><v-icon class="fa-brands fa-google"></v-icon></v-btn>

						<v-btn icon=""><v-icon class="fa-brands fa-github"></v-icon></v-btn>

						<v-btn icon="">
							<v-icon class="fa-brands fa-youtube"></v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col>
				<v-card
					max-width="900"
					class="mx-auto text-center pb-10"
					elevation="24"
				>
					<v-card-subtitle class="text-center my-5">О технологическом стеке сайта</v-card-subtitle>

					<v-card-subtitle>Frontend</v-card-subtitle>
					<v-card-text class="text-mono text-justify px-10">
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
					</v-card-text>
					<v-card-subtitle>Backend</v-card-subtitle>
					<v-card-text class="text-mono text-justify px-10">
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
					</v-card-text>
					<v-card-subtitle>Прочие технологии</v-card-subtitle>
					<v-card-text class="text-mono text-justify px-10">
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
						<br />
						Текст текст текст
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.photo {
	$photo-size: 250px;

	width: $photo-size;
	height: $photo-size;
}
</style>
