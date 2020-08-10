import React from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		width: '14vw',
		height: '35vh',
		display: "flex",
		transition: 'width 1s, height 1s, translate 2s',
		marginRight: '5%',
		marginBottom: '5%',
		flexDirection: "column",
		justifyContent: "space-between",
		textAlign: "center",
	},
	cardDetalhes: {
		width: '28vw',
		height: '70vh',
	},
	media: {
		objectFit: 'cover',
		height: '15vh',
		transition: 'width 1s, height 1s'
	},
	mediaDetales: {
		height: '40vh'
	},
	btn: {
		justifyContent: "center"
	}
};

class ConteudoCartao extends React.Component {
	constructor(props) {
		super(props)
		this.state = { mostraDetalhes: false }
	}

	componentDidUpdate() {
		this.trocaMostraDetalhes()
	}

	trocaMostraDetalhes = () => {
		if (this.props.id !== this.props.cardAtivo && this.state.mostraDetalhes === true) {
			this.setState({ mostraDetalhes: false })
		}
	}

	trocaStatusAtivo = (id) => {
		if (this.state.mostraDetalhes === false) {
			this.setState({ mostraDetalhes: true })
			this.props.funcaoCardAtivo(id)
		} else {
			this.setState({ mostraDetalhes: false })
			this.props.funcaoCardAtivo('')
		}
	}

	render() {
		const { classes } = this.props
		return (
			<Card
				style={{
					...styles.card,
					...(this.state.mostraDetalhes ? styles.cardDetalhes : {}),
				}}>
				<CardActionArea onClick={() => this.trocaStatusAtivo(this.props.id)}>
					<CardMedia
						component="img"
						alt="Imagem"
						image={this.props.imagem}
						style={{
							...styles.media,
							...(this.state.mostraDetalhes ? styles.mediaDetales : {}),
						}}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{this.props.nomeDoProduto}
						</Typography>
					</CardContent>
				</CardActionArea>

				<Typography component="p">
					{Number(this.props.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
				</Typography>

				{this.state.mostraDetalhes &&
					<span>
						<Typography component="p"> <strong>Formas de pagamento: </strong>
							{this.props.paymentMethod}
						</Typography>
						<Typography component="p"> <strong>Parcelado em: </strong>
							{this.props.installments}x
					</Typography>
						<Typography component="p"> <strong>Descrição: </strong>
							{this.props.description}
						</Typography>
					</span>
				}

				<CardActions className={classes.btn} >
					<Button onClick={() => this.props.adicionaProduto(this.props.cadaProduto)} size="small" color="primary">
						Adicionar ao Carrinho
                    </Button>
				</CardActions>
			</Card>
		)
	}
}

export default withStyles(styles)(ConteudoCartao);