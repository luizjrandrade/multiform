import { useHistory, Link } from 'react-router-dom';
import * as C from './styles';
import { useForm, FormActions } from '../../contexts/FormContext';
import { Theme } from '../../components/Theme';
import { useEffect } from 'react';
import { SelectOption } from '../../components/SelectOption';

export const FormStep2 = () => {
	const history = useHistory();
	const { state, dispatch } = useForm();

	//navegação para proxima página e verifica se o campo NOME está vazio
	const handleNextStep = () => {
		if(state.name !== ''){
		  history.push('/step3');
		} else {
			alert("Ops! Não digitou o nome!")
		}
	}

	//Carrega o passo atual e não carrega a step2 sem o nome
	useEffect(() => {
		if(state.name === ''){
			history.push('/');
		} else {
			dispatch({
				type: FormActions.setCurrentStep,
				payload: 2
			});
		}
	}, []);


	//troca o level escolhido 
	const setLevel = (level: number) => {
		dispatch({
			type: FormActions.setLevel,
			payload: level
		});
	}


	return (
		<Theme>
			<C.Container>
				<p>Passo 2/3</p>
				<h1>{state.name}, o que melhor descreve você?</h1>
				<p>Qual é o seu estado profissional atualmente?</p>

				<hr/>

				<SelectOption 
					title="Sou iniciante"
					description="Comecei a programar há menos de 2 anos"
					icon="🥳"
					selected={state.level === 0}
					onClick={()=>setLevel(0)}
				/>

				<SelectOption 
					title="Sou programador"
					description="Já programo há mais de 2 anos"
					icon="😎"
					selected={state.level === 1}
					onClick={()=>setLevel(1)}
				/>

				<Link to="/" className="backButton">Voltar</Link>
				<button onClick={handleNextStep}>Próximo</button>
			</C.Container>
		</Theme>
	);
}