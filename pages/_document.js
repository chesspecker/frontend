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
						content='Application to practice chess with the woodpecker method!'
					/>
					<meta
						name='description'
						content='Application to practice chess with the woodpecker method!'
					/>
					{/* Favicon */}
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/favicon/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon/favicon-16x16.png'
					/>
					<link rel='manifest' href='/favicon/site.webmanifest' />
					{/* Plausible */}
					<script
						defer
						data-domain='chesspecker.com'
						src='https://plausible.io/js/plausible.js'
					></script>
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
