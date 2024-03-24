import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/util/colors";
import { aliases, md } from "vuetify/iconsets/md";
import { ru } from "vuetify/locale";

const vuetify = createVuetify({
	locale: {
		locale: "ru",
		messages: { ru },
	},
	components,
	directives,
	icons: {
		defaultSet: "md",
		aliases,
		sets: {
			md,
		},
	},
	theme: {
		themes: {
			darkGreyGreen: {
				dark: true,
				colors: {
					primary: colors.grey.darken2,
					secondary: colors.grey.darken3,

					sidebar: colors.grey.darken4,
					topbar: colors.grey.darken4,
					footer: colors.grey.darken4,

					background: "#1A1A1A",
					accent: colors.green.accent3,

					card_main: colors.grey.darken4,
					card_secondary: colors.grey.darken3,

					card_header: "#303030",
					card_body: "#282828",
					card_footer: "#212121",
				},
			},
			lightGreyGreen: {
				dark: false,
				colors: {
					primary: colors.grey.lighten2,
					secondary: colors.grey.lighten3,

					sidebar: colors.grey.lighten4,
					topbar: colors.grey.lighten4,
					footer: colors.grey.lighten4,

					background: colors.grey.lighten3,
					// accent: colors.green.accent4,
					accent: "#00af49",

					card_main: colors.grey.lighten3,
					card_secondary: colors.grey.lighten2,

					card_header: "#eeeeee",
					card_body: "#dadada",
					card_footer: "#d1d1d1",
				},
			},
		},
	},
});

export default vuetify;
