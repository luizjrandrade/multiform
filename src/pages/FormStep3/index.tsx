import { useHistory, Link } from 'react-router-dom';
import * as C from './styles';
import { useForm, FormActions } from '../../contexts/FormContext';
import { Theme } from '../../components/Theme';
import { ChangeEvent, useEffect } from 'react';

export const FormStep3 = () => {
	const history = useHistory();
	const { state, dispatch } = useForm();

	//Carrega o passo atual
	useEffect(() => {
		if(state.name === ''){
			history.push('/');
		} else {
			dispatch({
				type: FormActions.setCurrentStep,
				payload: 3
			});
		}
	}, []);

	//apresenta dados finais
	const handleNextStep = () => {
		if(state.email !== '' && state.github !== ''){
			console.log(state);
		} else {
			alert("Preencha os dados");
		}
	}
	
	//Pega o que digitado e joga uma ação dispatch
	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: FormActions.setEmail,
			payload: e.target.value
		});
	}

	const handleGithubChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: FormActions.setGithub,
			payload: e.target.value
		});
	}


	return (
		<Theme>
			<C.Container>
				<p>Passo 3/3</p>
				<h1>Legal {state.name}, onde te achamos! </h1>
				<p>Preencha os dados solicitados, para contatarmos.</p>

				<hr/>

				<label>
					Seu e-mail:  
					<input
						type="email"
						value={state.email}
						onChange={handleEmailChange}
					/>
				</label>

				<label>
					Seu Github:  
					<input
						type="url"
						value={state.github}
						onChange={handleGithubChange}
					/>
				</label>


				<Link to="/step2" className="backButton">Voltar</Link>
				<button onClick={handleNextStep}>Finalizar Cadastro</button>
			</C.Container>
		</Theme>
	);
}