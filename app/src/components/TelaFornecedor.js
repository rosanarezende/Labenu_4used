import React from 'react'
import axios from 'axios'
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as STF from './styles/StylesTelaFornecedor';

class TelaFornecedor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputNome: '',
			inputFotoUrl: '',
			inputPreco: '',
			inputQtdParcelas: '',
			inputCategoria: '',
			inputDescricao: '',
			metodoPgArray: [],

			inputNomeOK: false,
			inputFotoUrlOK: false,
			inputPrecoOK: false,
			inputQtdParcelasOK: false,
			inputCategoriaOK: false,
			inputDescricaoOK: false,

			metodoPg: {
				boleto: false,
				transferencia: false,
				payPal: false,
				dinheiro: false,
				cartaoCredito: false,
			},
			metodoPgOk: false,
			dadosOk: false
		}
	}

	atualizaValorEntrada = event => {
		if (event.target.name === 'inputPreco') {
			if (isNaN(parseFloat(event.target.value)) || parseFloat(event.target.value) <= 0 || event.target.value ==='') {
				console.log('passei if')
				event.target.value ===''||window.alert('Este campo aceita somente valores NUMERICOS e POSITIVOS')
				this.setState({
					[event.target.name]: ''
				})
			}
			else {
				if (event.target.value.indexOf('.') !== -1) {
					if (event.target.value.indexOf('.') === (event.target.value.length - 1)) {
						this.setState({
							[event.target.name]: `${parseFloat(event.target.value)}.`
						})
					}
					else if ((event.target.value.indexOf('.') === (event.target.value.length - 2)) && (event.target.value.indexOf('0')=== (event.target.value.length - 1))) {
						this.setState({
							[event.target.name]: `${parseFloat(event.target.value)}.0`
						})
					}
					else if (event.target.value.indexOf('0') === (event.target.value.length - 1) && (event.target.value.length - event.target.value.indexOf('.')) <= 3) {
						this.setState({
							[event.target.name]: event.target.value
						})
					}
					else if (event.target.value.indexOf('00') === (event.target.value.length - 2) && (event.target.value.length - event.target.value.indexOf('.')) <= 3) {
						this.setState({
							[event.target.name]: `${event.target.value}`
						})
					}
					else if ((event.target.value.length - event.target.value.indexOf('.')) <= 3) {
						this.setState({
							[event.target.name]: parseFloat(event.target.value)
						})
					}
				}
				else {
					console.log('passei else')
					this.setState({
						[event.target.name]: parseFloat(event.target.value)
					})
				}
			}
		}
		else if (event.target.name === 'inputQtdParcelas') {
			if (parseInt(event.target.value) <= 0 || parseInt(event.target.value) > 24 || isNaN(parseInt(event.target.value))) {
				window.alert('Por favor insira valores entre 1 e 24')
				this.setState({
					[event.target.name]: ''
				})
			} else {
				this.setState({
					[event.target.name]: parseInt(event.target.value, 10)
				})
			}
		}
		else {
			this.setState({
				[event.target.name]: event.target.value
			})
		}
	}

	atualizaCheckBox = nomeInput => event => {
		let metodoPgcp = this.state.metodoPg
		Object.keys(metodoPgcp).forEach(elemento => {
			if (elemento === event.target.name) {
				metodoPgcp[elemento] = event.target.checked
			}
		})
		this.setState({
			metodoPg: metodoPgcp
		})
		this.geraArrayPagamentos(nomeInput, event.target.checked)
	}

	geraArrayPagamentos = (stringPagamento, estadoChecked) => {
		let arrayPagamentos = this.state.metodoPgArray
		if (estadoChecked === true) {
			arrayPagamentos.push(stringPagamento)
		}
		else {
			arrayPagamentos.splice(arrayPagamentos.indexOf(stringPagamento), 1)
		}
		this.setState({
			metodoPgArray: arrayPagamentos
		})
	}

	verificaDados = () => {
		let dadosOk = true
		Object.keys(this.state).forEach(elemento => {
			if ((elemento.indexOf('input') !== -1) && (elemento.indexOf('OK') === -1)) {
				if (this.state[elemento] === '') {
					dadosOk = false
					this.setState({
						[`${elemento}OK`]: true
					})
				} else {
					this.setState({
						[`${elemento}OK`]: false
					})
				}
			}
		})
		let erroCheckBox = true
		Object.keys(this.state.metodoPg).forEach(elemento => {
			if (this.state.metodoPg[elemento] === true) {
				erroCheckBox = false
			}
		})
		dadosOk = (dadosOk && !erroCheckBox) ? true : false
		this.setState({
			metodoPgOk: erroCheckBox,
			dadosOk: dadosOk
		})
		
		if (dadosOk) {
			this.criaRegistroProduto()
		} else {
			window.alert('Preencha todos os dados')
		}
	}

	criaRegistroProduto = () => {
		let dataToSend = {
			name: this.state.inputNome,
			description: this.state.inputDescricao,
			price: Number(this.state.inputPreco),
			paymentMethod: this.state.metodoPgArray,
			category: this.state.inputCategoria,
			photos: [this.state.inputFotoUrl],
			installments: Number(this.state.inputQtdParcelas)
		}

		const request = axios.post('https://us-central1-future-apis.cloudfunctions.net/fourUsed/products', dataToSend)
		request.then(response => {
			console.log(response.status)
			console.log(response.statusText)
			window.alert('Produto cadastrado com sucesso!')
		}).catch(error => {
			console.log(error.response.status)
			console.log(error.response.data.message)
		})
	}

	render() {
		return <STF.Wrapper>
			<h1>Fornecedor</h1>
			<STF.DivSuperior>
				<STF.DivTextField>
					<TextField
						name="inputNome"
						required
						error={this.state.inputNomeOK}
						label="Nome do Produto"
						value={this.state.inputNome}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						name='inputFotoUrl'
						required
						error={this.state.inputFotoUrlOK}
						label="Foto do Produto"
						value={this.state.inputFotoUrl}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						name='inputPreco'
						required
						error={this.state.inputPrecoOK}
						label="Preço"
						value={this.state.inputPreco}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						name='inputQtdParcelas'
						required
						error={this.state.inputQtdParcelasOK}
						label="Número de Parcelas"
						value={this.state.inputQtdParcelas}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						select
						required
						error={this.state.inputCategoriaOK}
						label="Categoria do Produto"
						name='inputCategoria'
						value={this.state.inputCategoria}
						onChange={this.atualizaValorEntrada}
						SelectProps={{
							native: true,
						}}
						margin="normal"
						variant="outlined"
					>
						<option hidden value=''></option>
						<option value={'roupas'}>Roupas</option>
						<option value={'artigosDeDecoracao'}>Artigos de decoração</option>
						<option value={'calcados'}>Calçados</option>
						<option value={'eletronicos'}>Eletrônicos</option>
						<option value={'moveis'}>Móveis</option>
					</TextField>

					<TextField
						name='inputDescricao'
						required
						error={this.state.inputDescricaoOK}
						multiline
						rows="5"
						label="Descrição do Produto"
						value={this.state.inputDescricao}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
				</STF.DivTextField>
				<STF.DivForm>
					<FormControl required error={this.state.metodoPgOk} component="fieldset">
						<FormLabel component="legend">Formas de Pagamento</FormLabel>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox checked={this.state.metodoPg.boleto} name='boleto' onChange={this.atualizaCheckBox('Boleto. ')} value="metodoPg.boleto" />
								}
								label="Boleto"
							/>
							<FormControlLabel
								control={
									<Checkbox checked={this.state.metodoPg.transferencia} name='transferencia' onChange={this.atualizaCheckBox('Transferência. ')} value="metodoPg.transferência" />
								}
								label="Transferência Eletrônica"
							/>
							<FormControlLabel
								control={
									<Checkbox checked={this.state.metodoPg.payPal} name='payPal' onChange={this.atualizaCheckBox('PayPal. ')} value="metodoPg.PayPal" />
								}
								label="PayPal"
							/>
							<FormControlLabel control={
								<Checkbox checked={this.state.metodoPg.dinheiro} name='dinheiro' onChange={this.atualizaCheckBox('Dinheiro. ')} value="metodoPg.dinheiro" />
							}
								label="Dinheiro*"
							/>
							<FormControlLabel
								control={
									<Checkbox checked={this.state.metodoPg.cartaoCredito} name='cartaoCredito' onChange={this.atualizaCheckBox('Cartão de Crédito. ')} value="metodoPg.cartaoCredito" />
								}
								label="Cartão de Crédito"
							/>
						</FormGroup><FormHelperText>*CUIDADO: Pagamentos em dinheiro exigem encontro pessoal </FormHelperText>
					</FormControl>
				</STF.DivForm>
			</STF.DivSuperior>
			<Button variant='contained' color='primary' size='large' onClick={this.verificaDados}>
				Cadastrar
			</Button>
		</STF.Wrapper>

	}
}

export default TelaFornecedor