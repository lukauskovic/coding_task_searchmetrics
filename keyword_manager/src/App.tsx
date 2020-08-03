import React from 'react'
import 'assets/styles/app.scss'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { AppFrame } from 'UI/pages/AppFrame/AppFrame'
import { ApolloProvider } from '@apollo/client'
import {client} from './utils/networking'

const App = () => {

	return(
		<ApolloProvider client={client}>
			<div className='App'>
				<Router>
					<Route path='/' exact={true}>
						<AppFrame/>
					</Route>
				</Router>
			</div>
		</ApolloProvider>
	)

}

export { App }