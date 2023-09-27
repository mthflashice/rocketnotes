import { useState } from "react";
import { Container,Form,Avatar } from "./styles";
import {FiArrowLeft,FiMail, FiLock,FiUser,FiCamera} from 'react-icons/fi'
import{Input} from '../../components/Input'
import { Button } from "../../components/Button"
import { useNavigate } from "react-router-dom"
import{useAuth} from '../../hooks/auth'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import {api} from '../../services/api'


export  function Profile(){
    const {user, updateProfile}= useAuth();

    const navigate = useNavigate()


    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState('');
    const [passwordNew, setPasswordNew] = useState('');

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate(){
        const updated = {
          name,
          email,
          password: passwordNew,
          old_password: passwordOld
        }

        const userUpdated = Object.assign(user, updated);



        await updateProfile({user: userUpdated,avatarFile});
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
         setAvatarFile(file);

         const imagePreview = URL.createObjectURL(file);
         setAvatar(imagePreview);
    }

    function handleBack(){
        navigate(-1)
      }


    return(
        <Container>
         <header>
           <button
          type="button"
          onClick={handleBack}
          >
            <FiArrowLeft/>
          </button>
         </header>
  
        
            <Avatar>
                <img 
                 src={ avatar }
                 alt="Foto do usuário"/>

                 <label  htmlFor="avatar">
                    <FiCamera/>
                    
                    <input
                     id='avatar'
                     type='file'
                     onChange={handleChangeAvatar}
                     />
                 </label>
            </Avatar>

            <Form>

            <Input
            placeholder= 'Nome'
            type='texto'
            icon={FiUser}
            value ={name}
            onChange ={e=>setName(e.target.value)}
            />

            <Input
            placeholder= 'Email'
            type='text'
            icon={FiMail}
            value ={email}
            onChange ={e=>setEmail(e.target.value)}
            />      

            <Input
            placeholder= 'Senha atual'
            type='password'
            icon={FiLock}
            onChange={e=>setPasswordOld(e.target.value)}
            />   

            <Input
            placeholder= 'Nova Senha'
            type='password'
            icon={FiLock}
            onChange={e=>setPasswordNew(e.target.value)}
            />          

            <Button title='Salvar' onClick ={handleUpdate}/>

        </Form>

        </Container>
    );
}