import React from 'react'

import Card from '../../components/card'
import ProdutoService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'

const estadoInicial = {
	nome: '',
	sku: '',
	descricao: '',
	preco: 0,
	fornecedor: '',
	sucesso: false,
	errors: [],
	atualizando: false
}

class CadastroProduto extends React.Component {

	constructor() {
		super()
		this.service = new ProdutoService()
	}

	state = estadoInicial

	onChange = (event) => {
		const valor = event.target.value
		const nomeDoCampo = event.target.name
		this.setState({ [nomeDoCampo]: valor })
	}

	onSubmit = (event) => {
		event.preventDefault() // previne que o método seja executado por completo, e sim executa como um procedimento JS normal

		// console.log(this.state) // pra saber se pegou tudo direitinho

		// salvando no Local Storage
		const produto = {
			nome: this.state.nome,
			sku: this.state.sku,
			descricao: this.state.descricao,
			preco: this.state.preco,
			fornecedor: this.state.fornecedor,
		}

		// juntando a validação
		try {
			this.service.salvar(produto)
			this.limpaCampos()
			// console.log('Salvo com sucesso')
			this.setState({ sucesso: true })
		} catch (erro) {
			const errors = erro.errors
			this.setState({ errors: errors })
		}

	}

	limpaCampos = () => {
		this.setState(estadoInicial)
	}

	componentDidMount() {
		//console.log(this.props.match) // primeiro damos uma olhada no objeto: params.sku
		const sku = this.props.match.params.sku

		if (sku) {
			const resultado = this.service.obterProdutos().filter(produto => produto.sku === sku)
			if (resultado.length === 1) {
				const produtoEncontrado = resultado[0]
				this.setState({
					...produtoEncontrado,
					atualizando: true
				})
			}
		}
	}

	render() {
		return (
			// <div className='card'>

				// <div className='card-header'>
				// 		{this.state.atualizando ? 'Atualização ' : 'Cadastro '}
				// 		de Produto
        // </div>
			
			<Card header={this.state.atualizando ? 'Atualização de produto' : 'Cadastro de produto'}>

				{/* <div className='card-body'> */}
					<form id='frmProduto' onSubmit={this.onSubmit}>

						{this.state.sucesso &&
							<div class="alert alert-dismissible alert-success" wfd-id="199">
								<button type="button" class="close" data-dismiss="alert" wfd-id="532">&times;</button>
								<strong>Bem feito!</strong> Cadastro realizado com sucesso.
							</div>
						}

						{this.state.errors.length > 0 &&
							this.state.errors.map(msg => (
								<div class="alert alert-dismissible alert-danger" wfd-id="199">
									<button type="button" class="close" data-dismiss="alert" wfd-id="532">&times;</button>
									<strong>Erro!</strong> {msg}.
								</div>
							))
						}

						<div className='row'>
							<div className='col-md-6'>
								<div className='form-group'>
									<label> Nome: *</label>
									<input type='text' name='nome' onChange={this.onChange} value={this.state.nome} className='form-control'></input>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='form-group'>
									<label> SKU: *</label>
									<input
										type='text'
										name='sku'
										disabled={this.state.atualizando}
										onChange={this.onChange}
										value={this.state.sku}
										className='form-control'
									/>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col-md-12'>
								<div className='form-group'>
									<label>Descrição:</label>
									<textarea name='descricao' onChange={this.onChange} value={this.state.descricao} className='form-control'></textarea>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col-md-6'>
								<div className='form-group'>
									<label> Preço: *</label>
									<input type='text' name='preco' onChange={this.onChange} value={this.state.preco} className='form-control'></input>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='form-group'>
									<label> Fornecedor: *</label>
									<input type='text' name='fornecedor' onChange={this.onChange} value={this.state.fornecedor} className='form-control'></input>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col-md-1'>
								<button type='submit' className='btn btn-success'>
									{this.state.atualizando ? 'Atualizar' : 'Salvar'}
								</button>
							</div>
							<div className='col-md-1'></div>
							<div className='col-md-1'>
								<button onClick={this.limpaCampos} className='btn btn-primary'>Limpar</button>
							</div>
						</div>

					</form>
					
				{/* </div> */}

			{/* </div> */}
			</Card>
		)
	}
}

export default withRouter(CadastroProduto)