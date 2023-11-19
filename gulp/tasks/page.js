import yargs from 'yargs';
import file from 'gulp-file';
import { hideBin } from 'yargs/helpers'
import merge from 'merge-stream'
import insert from 'gulp-insert'
import fs from 'fs'
import path from 'path'

const pageContent = `<!DOCTYPE html>
		<html lang="uk-UA">

		@@include('html/head.html', {
		"title": "{name}"
		})

		<body>
			<div class="wrapper">
				@@include("html/header.html", {})
				@@include("html/{filename}.html", {})
				@@include("html/footer.html", {})
			</div>
			@@include("html/scripts.html", {})
		</body>

		</html>`
const sectionContent = `<section class="{filename}">

</section>`
export const page = () => {
	const argv = yargs(hideBin(process.argv)).argv
	const fileName = argv.page || 'page'
	const name = argv.name || 'Головна сторінка'
	const content = pageContent.replace('{filename}', fileName).replace('{name}', name);
	const section = sectionContent.replace('{filename}', fileName)
	const importStatement = "@import \"" + fileName + "\";\n"
	const settingsPath = './gulp/config/settings.json';
	console.log(settingsPath)
	const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
	settingsData.menuItems.push({
		label: name,
		url: '/' + fileName + '.html'
	});
	fs.writeFileSync(settingsPath, JSON.stringify(settingsData, null, 2));
	const htmlStream = file(fileName + '.html', section, { src: true })
		.pipe(app.gulp.dest('./src/html'));

	const scssStream = merge(
		file('_' + fileName + '.scss', '', { src: true })
			.pipe(app.gulp.dest('./src/scss')),

		app.gulp.src('./src/scss/style.scss')
			.pipe(insert.append(importStatement))
			.pipe(app.gulp.dest('./src/scss'))
	);

	const emptyHtmlStream = file(fileName + '.html', content, { src: true })
		.pipe(app.gulp.dest('./src'));

	console.log("Crated new page and sass file: " + argv.page)

	return merge(htmlStream, scssStream, emptyHtmlStream);
}