import {Container} from 'styles';

export default function ButtonText ({title, ...rest}){
    return(
        <Container
            type='button'
            {...rest}
        >
            {title}
        </Container>
    );
}