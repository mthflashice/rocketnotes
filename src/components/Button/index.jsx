import { Container } from "./styles";

export function Button({title, loading = false, ...rest}){
    //ou maneira baby Button(props){


    return(
        <Container 
        type='button'
        disabled={loading}
        {...rest}

        >
        {loading? 'Carregando..': title}
        </Container>
    )
   
}