import React from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ConteudoCartao from './ConteudoCartao';

import * as STC from './styles/StylesTelaConsumidor';

const baseURL = `https://us-central1-future-apis.cloudfunctions.net/fourUsed`

class TelaConsumidor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listaDeProdutosState: [],
			categoriaAtualState: '',
			idCardAtivo: '',
			filtroMin: '',
			filtroMax: '',
			ordem: '',
		}
	}

	componentDidMount() {
		this.pegarProdutos()
	}

	componentWillUnmount(){
		this.props.pesquisa()
	}

	pegarProdutos = async () => {
		try {
			const response = await axios.get(`${baseURL}/products`)
			const listaDeProdutosVar = response.data.products
			this.setState({ listaDeProdutosState: listaDeProdutosVar })
		}
		catch (error) {
			console.log(error)
			alert("Houve um erro na busca dos produtos.")
		}
	}

	atulizaCardAtivo = (id) => {
		this.setState({ idCardAtivo: id })
	}

	escolherCategoria = (categoria) => {
		this.setState({ categoriaAtualState: categoria })
	}

	mudouFiltroMinimo = (event) => {
		this.setState({ filtroMin: event.target.value })
	}

	mudouFiltroMaximo = (event) => {
		this.setState({ filtroMax: event.target.value })
	}

	mudaOrdenacao = (event) => {
		this.setState({ ordem: event.target.value })
	}

	adicionaProdutoCarrinho = (produtoAdicionado) => {
		const copiaCarrinho = [...this.props.carrinho]
		const produtoEstaNoCarrinho = this.props.carrinho.findIndex(cadaProduto =>
			cadaProduto.produtoAdicionado.id === produtoAdicionado.id)
		if (produtoEstaNoCarrinho > -1) {
			copiaCarrinho[produtoEstaNoCarrinho].quantidade += 1
		} else {
			copiaCarrinho.push({
				produtoAdicionado: produtoAdicionado,
				quantidade: 1
			})
		}
		this.props.mudaCarrinho(copiaCarrinho)
	}

	render() {
		let filtrarMinimo = this.state.listaDeProdutosState.filter(elemento => (
			this.state.filtroMin ? elemento.price >= this.state.filtroMin : true
		))
		let filtrarMaximo = filtrarMinimo.filter(elemento => (
			this.state.filtroMax ? elemento.price <= this.state.filtroMax : true
		))
		let filtrarPesquisa = filtrarMaximo.filter(elemento => (
			this.props.inputPesquisa ? elemento.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes((this.props.inputPesquisa).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) : true
		))
		let filtrarCategoria = filtrarPesquisa.filter(elemento => (
			this.state.categoriaAtualState ? elemento.category.includes(this.state.categoriaAtualState) : true
		))

		let listaOrdenada = []
		switch (this.state.ordem) {
			case 'crescente':
				listaOrdenada = filtrarCategoria.sort(function (a, b) {
					return a.price < b.price ? -1 : a.price > b.price ? 1 : 0
				})
				break;
			case 'decrescente':
				listaOrdenada = filtrarCategoria.sort(function (a, b) {
					return a.price < b.price ? 1 : a.price > b.price ? -1 : 0
				})
				break;
			case 'nomeZA':
				listaOrdenada = filtrarCategoria.sort(function (a, b) {
					return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 0
				})
				break;
			case 'nomeAZ':
				listaOrdenada = filtrarCategoria.sort(function (a, b) {
					return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
				})
				break;
			case 'categoriaZA':
				listaOrdenada = filtrarCategoria.sort(function (a, b) {
					return a.category < b.category ? 1 : a.category > b.category ? -1 : 0
				})
				break;
			case 'categoriaAZ':
				listaOrdenada = filtrarCategoria.sort(function (a, b) {
					return a.category < b.category ? -1 : a.category > b.category ? 1 : 0
				})
				break;
			default:
				listaOrdenada = filtrarCategoria
				break;
		}

		let produtosMostrados = listaOrdenada.map((produto, index) => (
			<ConteudoCartao
				cadaProduto={produto}
				key={index}
				id={produto.id}
				category={produto.category}
				price={produto.price}
				description={produto.description}
				paymentMethod={produto.paymentMethod}
				imagem={produto.photos[0]}
				nomeDoProduto={produto.name}
				installments={produto.installments}
				cardAtivo={this.state.idCardAtivo}
				funcaoCardAtivo={this.atulizaCardAtivo}
				adicionaProduto={this.adicionaProdutoCarrinho}
			/>
		))

		return (
			<STC.Wrapper>
				<STC.CategoryFilterDiv>
					<Button onClick={()=> this.escolherCategoria("roupas")} variant="contained" color="secondary" size="large">Roupas</Button>
					<Button onClick={()=> this.escolherCategoria("artigosDeDecoracao")} variant="contained" color="secondary" size="large">Artigos de decoração</Button>
					<Button onClick={()=> this.escolherCategoria("calcados")} variant="contained" color="secondary" size="large">Calçados</Button>
					<Button onClick={()=> this.escolherCategoria("eletronicos")} variant="contained" color="secondary" size="large">Eletrônicos</Button>
					<Button onClick={()=> this.escolherCategoria("moveis")} variant="contained" color="secondary" size="large">Móveis</Button>
					<Button onClick={()=> this.escolherCategoria("")} variant="contained" color="secondary" size="large">Todas as Categorias</Button>
				</STC.CategoryFilterDiv>

				<STC.MainDiv>
					<STC.ValuesContainer>
						<TextField
							type="number"
							label="Valor Mínimo:"
							value={this.state.filtroMin}
							onChange={this.mudouFiltroMinimo}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							type="number"
							label="Valor Máximo:"
							value={this.state.filtroMax}
							onChange={this.mudouFiltroMaximo}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							select
							label="Ordenar por"
							name='ordem'
							value={this.state.ordem}
							onChange={this.mudaOrdenacao}
							SelectProps={{
								native: true,
							}}
							margin="normal"
							variant="outlined"
						>
							<option hidden value=''></option>
							<option value=''>Sem filtro</option>
							<option value={'crescente'}>Menor Preço</option>
							<option value={'decrescente'}>Maior Preço</option>
							<option value={'nomeAZ'}>Nome (A -Z)</option>
							<option value={'nomeZA'}>Nome (Z - A)</option>
							<option value={'categoriaAZ'}>Categoria (A -Z)</option>
							<option value={'categoriaZA'}>Categoria (Z - A)</option>
           				</TextField>
					
					</STC.ValuesContainer>

					<STC.CardsContainer>
						{produtosMostrados}
					</STC.CardsContainer>
				</STC.MainDiv>
			</STC.Wrapper>
		)
	}
}

export default TelaConsumidor;