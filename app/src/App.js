import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { MuiThemeProvider, createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppContainer from './components/AppContainer'

const generateClassName = createGenerateClassName()
const jss = create({
	...jssPreset(),
	// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
	insertionPoint: document.getElementById('jss-insertion-point'),
})

const theme = createMuiTheme(
	{
		"palette":
		{
			"common": {
				"black": "#000",
				"white": "#fff"
			},

			"background": {
				"paper": "#fff",
				"default": "rgba(255, 252, 239, 1)"
			},

			"primary": {
				"light": "rgba(104, 196, 189, 1)",
				"main": "rgba(67, 173, 165, 1)",
				"dark": "rgba(54, 138, 132, 1)",
				"contrastText": "rgba(255, 255, 255, 1)"
			},

			"secondary": {
				"light": "rgba(254, 232, 186, 1)",
				"main": "rgba(252, 202, 100, 1)",
				"dark": "rgba(251, 178, 31, 1)",
				"contrastText": "rgba(255, 255, 255, 1)"
			},

			// "secondary": {
			// 	"light": "#E7847C",
			// 	"main": "#DC4C40",
			// 	"dark": "#C02F23",
			// 	"contrastText": "rgba(255, 255, 255, 1)"
			// },

			"error": {
				"light": "#e57373",
				"main": "#f44336",
				"dark": "#d32f2f",
				"contrastText": "#fff"
			},

			"text": {
				"primary": "rgba(0, 0, 0, 0.87)",
				"secondary": "rgba(0, 0, 0, 0.54)",
				"disabled": "rgba(0, 0, 0, 0.38)",
				"hint": "rgba(0, 0, 0, 0.38)"
			}
		}
	}
)

function App() {
	return (
		<JssProvider jss={jss} generateClassName={generateClassName}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<AppContainer />
			</MuiThemeProvider>
		</JssProvider>
	)
}

export default App
