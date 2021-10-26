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
					<link rel='icon' href='/favicon.ico' />
					<meta property='og:title' content='ChessPecker' />
					<meta
						property='og:description'
						content='An application to practice playing chess with the famous woodpecker method!'
					/>
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
