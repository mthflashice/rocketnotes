import { useState } from "react";
import { Container,Form,Avatar } from "./styles";
import {FiArrowLeft,FiMail, FiLock,FiUser,FiCamera} from 'react-icons/fi';
import{Input} from '../../components/Input'
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import{useAuth} from '../../hooks/auth'



export  function Profile(){
    const {user}= useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    return(
        <Container>
            <header>
                <Link to ='/'>Voltar
                </Link>
                <FiArrowLeft/>
            </header>
        <Form>
            <Avatar>
                <img 
                 src="https://github.com/mthflashice.png"
                 alt="Foto do usuário"/>

                 <label  htmlFor="avatar">
                    <FiCamera/>
                    
                    <input
                     id='avatar'
                     type='file'
                     />
                 </label>
            </Avatar>
            <Input
            placeholder= 'Nome'
            type='texto'
            icon={FiUser}
            value ={name}
            onChange ={e=>setName(e.target.value) }
            />

            <Input
            placeholder= 'Email'
            type='text'
            icon={FiMail}
            value ={email}
            onChange ={e=>setEmail(e.target.value) }

            />      

            <Input
            placeholder= 'Senha atual'
            type='password'
            icon={FiLock}
            onChange ={e=>setPasswordOld(e.target.value) }

            />   

            <Input
            placeholder= 'Nova Senha'
            type='password'
            icon={FiLock}
            onChange ={e=>setPasswordNew(e.target.value) }

            />          

            <Button title='Salvar'/>

        </Form>

        </Container>
    );
}