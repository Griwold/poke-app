import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@/styles/global.css'
import { wrapper } from '../src/store/index'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>PokeApp</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default wrapper.withRedux(MyApp)