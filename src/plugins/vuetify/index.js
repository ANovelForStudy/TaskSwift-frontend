import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/util/colors";
import { aliases, md } from "vuetify/iconsets/md";

const vuetify = createVuetify({
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
			lightBlue: {
				dark: false,
				colors: {
					primary: colors.blue.lighten3,
					secondary: colors.blue.lighten2,
					sidebar: colors.blue.accent2,
					topbar: colors.blue.accent1,
					footer: colors.blue.accent1,
				},
			},
			darkBlue: {
				dark: true,
				colors: {
					primary: colors.blue.darken2,
					secondary: colors.blue.darken3,
					sidebar: colors.blue.darken3,
					topbar: colors.blue.darken2,
					footer: colors.blue.darken2,
				},
			},
			darkGreyBlue: {
				dark: true,
				colors: {
					primary: colors.grey.darken2,
					secondary: colors.grey.darken3,
					sidebar: colors.grey.darken4,
					topbar: colors.grey.darken4,
					footer: colors.grey.darken4,
					background: "#1A1A1A",
					accent: colors.green.accent3,
				},
			},
			lightGreyBlue: {
				dark: false,
				colors: {
					primary: colors.grey.lighten2,
					secondary: colors.grey.lighten3,
					sidebar: colors.grey.lighten4,
					topbar: colors.grey.lighten4,
					footer: colors.grey.lighten4,
					background: colors.grey.lighten3,
					accent: colors.blue.accent1,
				},
			},
		},
	},
});

export default vuetify;
