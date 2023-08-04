import{ RiShutDownLine} from 'react-icons/ri'
import { Container, Profile, Logout } from "./styles";



export function Header(){
    return(
        <Container>
            <Profile to ='/profile'>
                <img src="https://github.com/mthflashice.png"
                alt="Foto do Usuário" />

                <div>
                    <span>Bem-Vindo</span>
                    <strong>Matheus Quirino</strong>
                </div>
            </Profile>

            <Logout>
                <RiShutDownLine/>
            </Logout>



        </Container>
    );
}
