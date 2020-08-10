import React from 'react'

import Button from '@material-ui/core/Button';

import * as STH from './styles/StylesTelaHome';

function TelaHome(props) {
	return <STH.Wrapper>
		<STH.LogoPrincipal src={require('../img/logo2.png')} alt='Logo'/>
		<STH.DivDosBotoes>
			<Button  variant='contained' color='primary' onClick={() => props.funcao('consumidor')}>
				Consumidor
			</Button>
			<Button variant='contained' color='primary' onClick={() => props.funcao('fornecedor')}>
				Fornecedor
			</Button>
		</STH.DivDosBotoes>
	</STH.Wrapper>
}

export default TelaHome;