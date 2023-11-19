import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import { deleteAsync } from 'del';

export const otfToTtf = () => {
	deleteAsync(`${app.path.srcFolder}/scss/default/_fonts.scss`);
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error <%= error.message %>"
			})))
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
}

export const ttfToWoff = () => {
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error <%= error.message %>"
			})))
		.pipe(fonter({
			formats: ['woff']
		}))
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
	const fontsFile = `${app.path.srcFolder}/scss/default/_fonts.scss`;
	const { srcFolder, build: { fonts } } = app.path;

	fs.readdir(fonts, (err, files) => {
		if (err) {
			console.log(`Помилка зчитування файлів з каталогу: ${err}`);
			return;
		}

		if (!fs.existsSync(fontsFile)) {
			fs.writeFile(fontsFile, '', (err) => {
				if (err) {
					console.log(`Помилка створення файлу ${fontsFile}: ${err}`);
					return;
				}

				files.forEach((file) => {
					const fontName = file.split('.')[0];
					const fontWeight = fontName.split('-')[1] || 400;
					const fontName_f = file.split('-')[0];

					fs.appendFile(fontsFile, `@font-face {\n\tfont-family: '${fontName_f}';\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontName}.woff") format("woff"), url("../fonts/${fontName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\n`, (err) => {
						if (err) {
							console.log(`Помилка додавання шрифту ${fontName_f} до файлу ${fontsFile}: ${err}`);
							return;
						}
					});
				});
			});
		} else {
			console.log(`Файл ${fontsFile} вже існує. Для оновлення файлу потрібно його видалити!`);
		}
	});

	return app.gulp.src(srcFolder);
};