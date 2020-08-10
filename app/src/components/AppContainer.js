import React from 'react'
import * as S from './styles/StylesAppContainer'

import { withStyles } from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import TelaHome from './TelaHome';
import TelaConsumidor from './TelaConsumidor';
import TelaFornecedor from './TelaFornecedor';
import Carrinho from './Carrinho';


const styles = theme => ({
	grow: {
		flexGrow: 1
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200,
			},
		},
	},
	btnTelaConsumidor: {
		marginRight: '2vw'
	}
});

class AppContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			botaoAtual: '',
			pesquisa: '',
			novoCarrinho: []
		}
	}

	componentDidUpdate(){     
		localStorage.setItem('carrinho', JSON.stringify(this.state.novoCarrinho))   
	}

	componentDidMount(){      
		const estadoRecuperado = JSON.parse(localStorage.getItem('carrinho'))     
		if (estadoRecuperado){       
			this.setState({novoCarrinho:estadoRecuperado})     
		}   
	}	

	mudaBotao = (pagina) => {
		this.setState({ botaoAtual: pagina })
	}

	mudaPesquisa = (event) => {
		const digitado = event.target.value
		this.setState({ pesquisa: digitado })
	}

	limpaPesquisa =()=>{
		this.setState({pesquisa:''})
	}

	atualizaCarrinho = (par) => {
		this.setState({ novoCarrinho: par})
	}

	render() {

		const { classes } = this.props;

		const botoesConsumidor = (
			<>
				<div className={classes.grow} />
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Pesquisar..."
						value={this.state.pesquisa}
						onChange={this.mudaPesquisa}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
					/>
				</div>
				<div className={classes.grow} />
				<div>
					<Button variant="outlined" color='secondary' onClick={() => this.mudaBotao('carrinho')} className={classes.btnTelaConsumidor}>Carrinho</Button>
					<Button variant="outlined" color='secondary' onClick={() => this.mudaBotao('fornecedor')}>	QUERO VENDER </Button>
				</div>
			</>
		)

		const botoesFornecedor = (
			<>
				<div className={classes.grow} />
				<Button variant="outlined" color='secondary' onClick={() => this.mudaBotao('consumidor')}>QUERO COMPRAR </Button>
			</>
		)

		const botoesCarrinho = (
			<>
				<div className={classes.grow} />
				<Button variant="outlined" color='secondary' onClick={() => this.mudaBotao('consumidor')}>VOLTAR</Button>
			</>
		)

		let botoes
		let telaAtual
		switch (this.state.botaoAtual) {
			case 'home':
				telaAtual = <TelaHome funcao={this.mudaBotao} />
				break;
				case 'consumidor':
					botoes = botoesConsumidor
					telaAtual = <TelaConsumidor 
						inputPesquisa={this.state.pesquisa}
						mudaCarrinho={this.atualizaCarrinho}
						carrinho={this.state.novoCarrinho}
						pesquisa={this.limpaPesquisa}
					/>
					break;
				case 'fornecedor':
					botoes = botoesFornecedor
					telaAtual = <TelaFornecedor />
					break
				case 'carrinho':
					botoes = botoesCarrinho
					telaAtual = <Carrinho 
						conteudoCarrinho={this.state.novoCarrinho}
						mudaCarrinho={this.atualizaCarrinho}
					/>
					break
			default:
				telaAtual = <TelaHome funcao={this.mudaBotao} />
				break;
		}

		return <div>
			<AppBar position='static' color='primary'>
				<Toolbar>
						<S.Img
							src={require('../img/logo.png')} 
							alt='logo'
							onClick={this.mudaBotao}
						/>
					{botoes}
				</Toolbar>
			</AppBar>
			{telaAtual}
		</div>
	}
}

export default withStyles(styles)(AppContainer);
