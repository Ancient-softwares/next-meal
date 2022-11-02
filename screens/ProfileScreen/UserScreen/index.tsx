import {
	Entypo,
	Feather,
	FontAwesome,
	FontAwesome5,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons
} from '@expo/vector-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import {
	Alert,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import '../../../constants/globals'
import styles from './style'

declare global {
	namespace JSX {
		interface IntrinisicElements {
			div: { div: string }
		}
	}
}

const wait = (timeout: number) => {
	return new Promise((resolve) => setTimeout(resolve, timeout))
}

const Account = ({ navigation }: any): JSX.Element => {
	const [isLogged, setIsLogged] = React.useState(false)
	const [refreshPage, setRefreshPage] = React.useState(false)

	React.useEffect(() => {
		;(async () => {
			console.log('Checking if user is logged in...')

			if (global.user !== null) {
				setIsLogged(true)

				console.log('user is logged')
			} else {
				setIsLogged(false)

				console.log('user is not logged')
			}
		})()
	}, [global.user])

	const onRefresh = React.useCallback(() => {
		setRefreshPage(true)
		wait(2000).then(() => setRefreshPage(false))
	}, [])

	return (
		<>
			<SafeAreaView style={styles.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					style={{
						height: '100%',
						width: '100%'
					}}
					refreshControl={
						<RefreshControl
							refreshing={refreshPage}
							onRefresh={onRefresh}
						/>
					}
				>
					<ListGroup as='ul'>
						{!isLogged ? (
							<>
								<MaterialIcons
									style={styles.accountIcon}
									name='account-circle'
									size={64}
									color='#963333'
								/>
								<Text style={styles.title}>
									Olá, visitante!
								</Text>
								<Text style={styles.text}>
									Crie ou acesse sua conta
								</Text>
								<View
									style={{
										flex: 1,
										flexDirection: 'row'
									}}
								>
									<Button
										variant='outline-danger'
										style={{
											width: '8em',
											marginTop: 15,
											marginRight: 5
										}}
										onClick={() =>
											navigation.navigate('Login')
										}
									>
										Entrar
									</Button>
									<Button
										variant='outline-danger'
										style={{
											width: '8em',
											marginTop: 15,
											marginLeft: 5
										}}
										onClick={() => {
											navigation.navigate('Register')
										}}
									>
										Cadastrar-se
									</Button>
								</View>
							</>
						) : (
							<>
								<MaterialIcons
									style={styles.accountIcon}
									name='account-circle'
									size={64}
									color='#963333'
								/>

								<Text style={styles.title}>
									Olá, {global.user.name}!
								</Text>
								<Button
									variant='outline-danger'
									style={{
										width: '8em',
										marginTop: 15,
										marginLeft: 5
									}}
									onClick={() => {
										global.logout()

										global.getUser()
									}}
								>
									Sair
								</Button>
							</>
						)}

						<Text style={styles.subtitle}>Meu app, NextMeal</Text>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 10,
								marginBottom: 10
							}}
						>
							<Ionicons
								name='notifications-outline'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>
									Minhas notificações
								</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 10,
								marginBottom: 10
							}}
						>
							<FontAwesome
								name='calendar-check-o'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>Minhas reservas</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 10,
								marginBottom: 10
							}}
						>
							<MaterialCommunityIcons
								name='human-queue'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>
									Meu lugar nas filas
								</div>
							</div>
						</ListGroup.Item>
					</ListGroup>
					<Text style={styles.subtitle}>Configurações gerais</Text>
					<ListGroup as='ul'>
						{!isLogged ? (
							<></>
						) : (
							<TouchableOpacity
								style={{
									marginTop: 10,
									marginBottom: 10
								}}
								onPress={() => {
									navigation.navigate('History')
								}}
							>
								<ListGroup.Item
									as='li'
									className='d-flex justify-content-between align-items-start'
									style={{
										border: 'none',
										marginTop: 10,
										marginBottom: 10
									}}
								>
									<FontAwesome5
										color='black'
										name='history'
										size={24}
									/>
									<div className='ms-2 me-auto'>
										<div className='fw-bold'>Histórico</div>
									</div>
								</ListGroup.Item>
							</TouchableOpacity>
						)}
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 10,
								marginBottom: 10
							}}
						>
							<Ionicons
								name='notifications-off-outline'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>
									Política de privacidade
								</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 10,
								marginBottom: 10
							}}
						>
							<Entypo
								name='text-document'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>Termos de uso</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 10,
								marginBottom: 10
							}}
						>
							<Feather name='info' size={24} color='black' />
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>Sobre nós</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 10,
								marginBottom: 10
							}}
						>
							<MaterialCommunityIcons
								name='file-document-edit-outline'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>Ajuda e suporte</div>
							</div>
						</ListGroup.Item>
					</ListGroup>

					{!global.isLogged ? (
						<>
							<Text style={[styles.text, { marginTop: 35 }]}>
								Copyrights @2022 - Ancient Softwares
							</Text>
						</>
					) : (
						<>
							<Text style={styles.subtitle}>Sair</Text>
							<ListGroup as='ul'>
								<ListGroup.Item
									as='li'
									className='d-flex justify-content-between align-items-start'
									style={{
										border: 'none',
										marginTop: 10,
										marginBottom: 10
									}}
								>
									<TouchableOpacity
										onPress={() => global.logout()}
									>
										<MaterialCommunityIcons
											name='logout'
											size={24}
											color='black'
										/>
										<div className='ms-2 me-auto'>
											<div className='fw-bold'>Sair</div>
										</div>
									</TouchableOpacity>
								</ListGroup.Item>
							</ListGroup>

							<Text style={[styles.text, { marginTop: 15 }]}>
								Copyrights @2022 - Ancient Softwares
							</Text>
						</>
					)}
				</ScrollView>
			</SafeAreaView>
		</>
	)
}

export default Account
