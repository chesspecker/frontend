import Document, {Html, Head, Main, NextScript} from 'next/document.js';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		try {
			const initialProps = await Document.getInitialProps(ctx);
			return {...initialProps};
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Html>
				<Head>
					{/* Meta title */}
					<meta property='og:title' content='ChessPecker' />
					<meta
						property='og:description'
						content='An application to practice playing chess with the woodpecker method!'
					/>
					{/* Favicon */}
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='../public/favicon/apple-touch-icon.png'
					></link>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='../public/favicon/favicon-32x32.png'
					></link>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='../public/favicon/favicon-16x16.png'
					></link>
					<link rel='manifest' href='public/favicon/site.webmanifest'></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
