import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`

export const LogoPrincipal = styled.img`
	width: 20%;
	@media screen and (max-device-width: 1200px) {
		width: 40%;
  	}
	@media screen and (max-device-width: 800px) {
		width: 60%;
  	}
`

export const DivDosBotoes = styled.div`
	display: flex;
	width: 60%;
	justify-content: space-between;

	@media screen and (max-device-width: 1200px) {
		width: 80%;
  	}
`