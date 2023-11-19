import { deleteAsync } from 'del'

export const docs = () => {
	return deleteAsync(['docs']).then(() => {
		return app.gulp.src('dist/**/*')
			.pipe(app.gulp.dest('docs'));
	});
};