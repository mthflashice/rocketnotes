import { Container,Form } from "./styles";
import {FiArrowLeft,FiMail, FiLock,FiUser} from 'react-icons/fi';
import{Input} from '../../components/Input'
import { Button } from "../../components/Button";



export default function Profile(){
    return(
        <Container>
            <header>
                <a href="/"/>
                <FiArrowLeft/>
            </header>
        <Form>
            <Input
            placeholder= 'Nome'
            type='texto'
            icon={FiUser}
            />

            <Input
            placeholder= 'Email'
            type='text'
            icon={FiMail}
            />      

            <Input
            placeholder= 'Senha atual'
            type='password'
            icon={FiLock}
            />   

            <Input
            placeholder= 'Nova Senha'
            type='password'
            icon={FiLock}
            />          

            <Button title='Salvar'/>

        </Form>

        </Container>
    );
}