import 'react-native-gesture-handler'

declare global {
	// attributes
	var TOKEN: string
	var API_URL: string
	var MAPS_ID: string
	var GOOGLE_MAPS_APIKEY: string
	var constants: any
	var maps: any
	var credentials: any
	var user: any
	var restaurant: any
	var defaultImage: string
	var isLogged: boolean

	// getters
	function getToken(): string
	function getMapsId(): string
	function getMapsToken(): string
	function getApiUrl(): string
	function getIsLogged(): boolean

	// setters
	function setToken(token: string): void
	function setMapsId(id: string): void
	function setMapsToken(token: string): void
	function setApiUrl(url: string): void
	function setIsLogged(isLogged: boolean): void

	// functions
	function init(): void
	function getCredentials(): any
	function setCredentials(credentials: any): void
	function getUser(): any
	function setUser(user: any): void
	function getRestaurant(): any
	function setRestaurant(restaurant: any): void
	function logout(): void

	// interfaces
	interface IMaps {
		id: string
		token: string
	}

	interface ICredentials {
		token: string
		api_url: string
		maps: IMaps
	}

	interface IConstants {
		credentials: ICredentials
	}

	interface IGlobal extends Global {
		constants: IConstants
		credentials: ICredentials
		maps: IMaps
	}
}

// attributes
global.user = {
	id: 0,
	name: 'Armandinho do pneu',
	email: '',
	avatar: '',
	phone: '',
	cpf: '',
	cep: '',
	address: '',
	number: '',
	neighborhood: '',
	city: '',
	state: '',
}

global.restaurant = {
	id: 0,
	name: '',
	email: '',
	avatar: '',
	phone: '',
	city: '',
	state: '',
	cep: '',
	number: '',
	street: '',
	neightborhood: '',
	occupation: '',
	capacity: '',
	rating: 0,
	opening: '',
	closing: '',
	description: '',
	type: '',
}

global.defaultImage = '../assets/example.jpeg'

// getters
global.getToken = () => global.TOKEN
global.getMapsId = () => global.MAPS_ID
global.getMapsToken = () => global.GOOGLE_MAPS_APIKEY
global.getApiUrl = () => global.API_URL

// setters
global.setToken = (token: string) => (global.TOKEN = token)
global.setMapsId = (id: string) => (global.MAPS_ID = id)
global.setMapsToken = (token: string) => (global.GOOGLE_MAPS_APIKEY = token)
global.setApiUrl = (url: string) => (global.API_URL = url)

// set global variables
global.setApiUrl('http://127.0.0.1:8000')
global.setMapsId('google-map-script')
global.setMapsToken('AIzaSyCmrE9qeUQP20VEA6AT53UKRDNqbywCvYw')

// functions
global.setUser = (user: any) => (global.user = user)
global.getUser = () => global.user
global.setToken(
	'5CgcWLpMJlBv7hZVS70QDaSEiHJ2BMSCM2d7ivnttLklIUbqMKLGoVVRvX5fFOWJt7xOXBmylWVYTRXo84AaXOgAMidqjLjHm5lsfgg5LkPCD15tog5O7UWMVSOxCzDijCvNw7O8LqhiR5s60Tg0vWdq4BNurTJmUIE3Rih2EM84Ozs5Y2ck4T7PKIGeFc9UBnKHntrS'
)
global.logout = () => {
	global.setToken('')
	global.setUser({
		id: 0,
		name: '',
		email: '',
		avatar: '',
		phone: '',
		cpf: '',
		cep: '',
		address: '',
		number: '',
		neighborhood: '',
		city: '',
		state: '',
	})

	global.isLogged = false
}
