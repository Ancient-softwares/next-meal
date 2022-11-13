import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {
	Dimensions,
	FlatList,
	SafeAreaView,
	TextInput,
	View
} from 'react-native'
import styles from './style'

const Ratings = ({ navigation, route }: any) => {
	const [avaliacoes, setAvaliacoes] = React.useState<any[]>([])
	const [message, setMessage] = React.useState<string>('')
	const [uniqueValue, setUniqueValue] = React.useState(1)
	const [feedback, setFeedback] = React.useState<string>('')
	const [rating, setRating] = React.useState<number>(0)
	const restaurante = route.params.restaurante

	React.useEffect(() => {
		fetchAvaliacoes()

		const focusHandler = navigation.addListener('focus', () => {
			console.log('Refreshed')
		})

		return focusHandler
	}, [navigation, uniqueValue])

	const forceRemount = (): void => {
		setUniqueValue(uniqueValue + 1)
	}

	const fetchAvaliacoes = async () => {
		console.log('fetching avaliacoes')

		try {
			await fetch(
				`${global.getApiUrl()}/api/getAvaliacoesByRestaurante`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						idRestaurante: restaurante.idRestaurante
					})
				}
			)
				.then((response: Response): Promise<JSON> => response.json())
				.then((json: any): void => {
					json.forEach((element: any) => {
						avaliacoes.push(element)
					})

					console.log(avaliacoes)
				})
				.catch((error: Error): void => {
					console.error(error)
				})
		} catch (error: unknown) {
			console.log(error)
		}
	}

	const renderAvaliacoes = (item: any): JSX.Element => {
		return (
			<View key={uniqueValue}>
				<Card
					style={{
						width: Dimensions.get('window').width * 0.9,
						border: 'none'
					}}
				>
					<Card.Body>
						<Card.Title>
							{item.item.nomeCliente} - {item.item.notaAvaliacao}
						</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
							{item.item.dtAvaliacao}
						</Card.Subtitle>
						<Card.Text>{item.item.descAvaliacao}</Card.Text>
					</Card.Body>
				</Card>
			</View>
		)
	}

	const avaliar = async (): Promise<any> => {
		await fetch(`${global.getApiUrl()}/api/postAvaliacao`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${global.getToken()}`
			},
			body: JSON.stringify({
				idRestaurante: restaurante.id,
				idCliente: global.getId(),
				descAvaliacao: feedback,
				nota: rating,
				dtAvaliacao: new Date()
			})
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.message === 'Avaliação criada com sucesso') {
					setMessage(json.message)
					forceRemount()
				} else {
					console.log(json.message)

					setMessage(json.message)
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={[
					styles.rowList,
					{
						marginBottom: '10%'
					}
				]}
			>
				<View
					style={{
						marginLeft: '3%',
						marginTop: '2.5%',
						marginBottom: '5%'
					}}
				>
					<FlatList
						data={avaliacoes}
						showsVerticalScrollIndicator={false}
						renderItem={renderAvaliacoes}
						keyExtractor={(item): any => item.idAvaliacao}
					/>

					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<TextInput
							multiline={true}
							style={{
								padding: 10,
								width: Dimensions.get('window').width - 40,
								height: 300,
								borderColor: 'gray',
								borderWidth: 1,
								borderRadius: 10,
								marginBottom: 10,
								marginLeft: '5%'
							}}
							placeholder='Escreva sua avaliação'
							onChangeText={(text: any) => setFeedback(text)}
							numberOfLines={4}
							maxLength={40}
							editable
							value={feedback}
						/>

						<TextInput
							keyboardType='numeric'
							style={{
								padding: 10,
								width: Dimensions.get('window').width - 40,
								height: 50,
								borderColor: 'gray',
								borderWidth: 1,
								borderRadius: 10,
								marginBottom: 10,
								marginLeft: '5%'
							}}
							placeholder='Nota'
							onChangeText={(text: any) => setRating(text)}
							editable
							value={rating}
						/>

						<Button
							variant='danger'
							style={{
								width: Dimensions.get('window').width - 40,
								marginLeft: '5%'
							}}
							onPress={avaliar}
						>
							Avaliar
						</Button>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Ratings