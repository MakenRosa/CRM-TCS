import { styled, Box, Container } from '@mui/material'

export const StyledContainer = styled(Container)`
	display: flex;
	flex-direction: row;
	width: 100vw;
	height: 100vh;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
		width: 100%;
		height: 130vh;
	}
`

export const SectionLogin = styled(Box)`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 50%;

	> h1 {
		color: #000;
		font-family: 'Poppins', sans-serif;
		font-size: 48px;
		font-style: normal;
		font-weight: 700;
		text-transform: uppercase;
		line-height: 72px;
		letter-spacing: 0em;
	}

	> form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 50%;
		height: 100%;

		@media (max-width: 768px) {
			width: 80%;
			max-width: 400px;
			margin: 20px auto;
		}

		button {
			width: 140px;
			height: 50px;
			background: linear-gradient(134deg, #9181f4 0%, #5038ed 100%);
			border-radius: 16px;
			color: #fff;
			font-family: 'Poppins', sans-serif;
			font-size: 14px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			text-transform: uppercase;
			margin-top: 60px;
			cursor: pointer;
			z-index: 1; /* Add this line */
		}
	}
`

export const StyledLinks = styled(Box)`
	display: flex;
	font-size: 12px;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`

export const StyledSectionImage = styled(Box)`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: right;
	background: linear-gradient(224deg, #9181f4 0%, #5038ed 100%);
	width: 90%;
	height: 100%;

	@media (max-width: 768px) {
		margin-top: 20px;
		width: 100%;
		height: 50%;
	}

	> img {
		width: 70%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		@media (max-width: 768px) {
			width: auto;
			height: 50%;
		}
	}
`
