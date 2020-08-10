import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import * as SC from './styles/StylesCarrinho';

class Carrinho extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cupom: "",
      input: "",
      inputError: false,
      inputHelper: ""
    }
  }

  cupomDeDesconto = () => {
    let desconto
    switch (this.state.cupom) {
      case "4USED":
        desconto = 0.1; break
      case "BANANINHA":
        desconto = 0.2; break
      default:
        desconto = 0
    }
    return desconto;
  }
  validaOCupom = () => {
    const cupom = this.state.input.toUpperCase()
    if (cupom === "") {
      this.setState({
        cupom: "",
        inputError: false,
        inputHelper: ""
      })
    } else if (cupom === "4USED" || cupom === "BANANINHA") {
      this.setState({
        cupom,
        inputError: false,
        inputHelper: "Cupom válido!"
      })
    } else {
      this.setState({
        cupom: "",
        inputError: true,
        inputHelper: "Cupom inválido! Insira outro cupom."
      })
    }
  }

  acharProduto = (produtoId) => {
    return this.props.conteudoCarrinho.find(carrinho => carrinho.produtoAdicionado.id === produtoId)
  }

  removerProduto = (produtoAdicionado) => {
    const copiaCarrinho = [...this.props.conteudoCarrinho]
		const produtoEstaNoCarrinho = this.props.conteudoCarrinho.findIndex(cadaProduto =>
			cadaProduto.produtoAdicionado.id === produtoAdicionado.id)
    copiaCarrinho.splice(produtoEstaNoCarrinho, 1)
    this.props.mudaCarrinho(copiaCarrinho)
  }

  aumentaQuantidade = (produtoAdicionado) => {
    const copiaCarrinho = [...this.props.conteudoCarrinho]
		const produtoEstaNoCarrinho = this.props.conteudoCarrinho.findIndex(cadaProduto =>
			cadaProduto.produtoAdicionado.id === produtoAdicionado.id)
		copiaCarrinho[produtoEstaNoCarrinho].quantidade += 1
		this.props.mudaCarrinho(copiaCarrinho)
  }

  diminuiQuantidade = (produtoAdicionado) => {
    const copiaCarrinho = [...this.props.conteudoCarrinho]
		const produtoEstaNoCarrinho = this.props.conteudoCarrinho.findIndex(cadaProduto =>
			cadaProduto.produtoAdicionado.id === produtoAdicionado.id)
		if (copiaCarrinho[produtoEstaNoCarrinho].quantidade > 1) {
			copiaCarrinho[produtoEstaNoCarrinho].quantidade -= 1
		}
		this.props.mudaCarrinho(copiaCarrinho)
  } 

  render() {
    const valorTotal = this.props.conteudoCarrinho.reduce((valorInicial, cadaProduto) =>
      valorInicial + (cadaProduto.produtoAdicionado.price * cadaProduto.quantidade), 0
    )
    
    const ccyFormat = (value) => {
      return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const desconto = this.cupomDeDesconto()

    return <SC.Wrapper>
      <h1>Carrinho</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell align="right">Qtde</TableCell>
            <TableCell align="right">Preço Unitário</TableCell>
            <TableCell align="right">Valor Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.conteudoCarrinho.map(cadaProduto =>
            <TableRow key={cadaProduto.produtoAdicionado.id}>
              <TableCell>
                <img src={cadaProduto.produtoAdicionado.photos[0]} alt='Logo' width="150px" />
                <p>
                  {cadaProduto.produtoAdicionado.name}
                </p>
              </TableCell>
              <TableCell align="right">
                <SC.Quantidade>
                  <Fab color="primary" aria-label="Diminuir"
                    onClick={() => this.diminuiQuantidade(cadaProduto.produtoAdicionado)}>
                    <RemoveIcon />
                  </Fab>
                  {cadaProduto.quantidade}
                  <Fab color="primary" aria-label="Aumentar"
                    onClick={() => this.aumentaQuantidade(cadaProduto.produtoAdicionado)}>
                    <AddIcon />
                  </Fab>
                  <Fab color="secondary" aria-label="Remover"
                    onClick={() => this.removerProduto(cadaProduto.produtoAdicionado)}>
                    <DeleteIcon />
                  </Fab>
                </SC.Quantidade>
              </TableCell>
              <TableCell align="right">
                <span>
                  {ccyFormat(cadaProduto.produtoAdicionado.price)}
                </span>
              </TableCell>
              <TableCell align="right">
                <span>
                  {ccyFormat(cadaProduto.produtoAdicionado.price * cadaProduto.quantidade)}
                </span>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell rowSpan={3}>
              <SC.Cupom>
                <TextField
                  id="cupom"
                  placeholder="Ex: 4USED"
                  label="Cupom de desconto"
                  margin="normal"
                  onChange={
                    (e) => this.setState({ input: e.target.value, inputError: false, inputHelper: "" })
                  }
                  value={this.state.input}
                  error={this.state.inputError}
                  helperText={this.state.inputHelper}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.validaOCupom}
                >
                  Aplicar
              </Button>
              </SC.Cupom>
            </TableCell>
            <TableCell colSpan={2}>Valor da Compra</TableCell>
            <TableCell align="right">
              <span>
                {ccyFormat(valorTotal)}
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cupom de Desconto</TableCell>
            <TableCell align="right">{`${(desconto * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(valorTotal * desconto)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">
              {ccyFormat(valorTotal - (valorTotal * desconto))}
            </TableCell>
          </TableRow>
					<TableRow>
						<TableCell colSpan={4} rowSpan={2} align="right">
						<Button
                  variant="contained"
									color="secondary"
									size="large"
                  onClick={() => window.alert('Essa função ainda não foi implementada')}
                >
                  Comprar
              </Button>
						</TableCell>
					</TableRow>
					<TableRow />
        </TableBody>
      </Table>
    </SC.Wrapper>
  }
}

export default Carrinho