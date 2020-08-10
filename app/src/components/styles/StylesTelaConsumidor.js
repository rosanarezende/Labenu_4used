import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`

export const MainDiv = styled.div`
	display: grid;
	grid-template-columns: 25vw 75vw;
`

export const ValuesContainer = styled.div`
display:flex;
flex-direction: column;
padding: 1vh 1vw;
align-items: center;
`

export const CardsContainer = styled.div`
display: flex;
flex-wrap:wrap;
padding: 5px;
`

export const CategoryFilterDiv = styled.div`
border-radius: 30px;
display: flex;
justify-content: space-evenly;
width: 80vw;
margin-bottom: 8vh;
padding: 1vh 1vw;
`