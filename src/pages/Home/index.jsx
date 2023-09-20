import{FiPlus, FiSearch} from 'react-icons/fi';
import {Container, Brand, Menu, Search, Content, NewNote} from './styles';

import { Header } from '../../components/Header';
import {ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';
import { Note } from '../../components/Note';


import { Section } from '../../components/Section';
import { api } from '../../services/api';
import { useState, useEffect } from 'react'




export  function Home(){

    const [tags,setTags] = useState ([]);
    const [tagsSelected, setTagsSelected] = useState([]);

    function handleTagsSelected(tagName){
        const alreadySelected = tagsSelected.includes(tagName)
        if (alreadySelected){
            
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);

        }else{
            setTagsSelected(prevState=>[...prevState, tagName]);

        }
    }


    useEffect(()=>{
        async function fetchTags(){
            const response = await api.get('/tags');
            setTags(response.data);

        }

        fetchTags();


    },[])
    return(
        <Container>
            <Brand>
            <h1>RocketNotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li><ButtonText title ='Todos' 
                 onClick={()=>handleTagsSelected('all')}

                 isActive={tagsSelected.length===0}

                />
                </li>

                {
                    tags && tags.map(tag =>(
                <li key={String(tag.id)}>
                    <ButtonText 
                    title ={tag.name}
                    onClick={()=>handleTagsSelected(tag.name)}
                    isActive={tagsSelected.includes(tag.name)}
                    />
                    </li>
                ))
                }
                


            </Menu>


            <Search>
                <Input placeholder='Pesquisar pelo Título' icon={FiSearch}/>

            </Search>

            <Content>
                <Section title ='Minhas notas'>
                    <Note data={{
                        title:'React',
                        tags:[
                            {id:'1', name: 'react'},
                            {id:'2', name: 'rocketSeat'},
                             
                        ]
                    }} />

<Note data={{
                        title:'React',
                        tags:[
                            {id:'1', name: 'react'},
                            {id:'2', name: 'rocketSeat'}
                        ]
                    }} />

                </Section>

            </Content>

            <NewNote to='/new'>
                <FiPlus/>
                Criar Nota
            </NewNote>
        </Container>
    );
}
