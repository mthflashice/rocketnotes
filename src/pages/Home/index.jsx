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
    const [search, setSearch] = useState('');
    const [notes, setNotes] = useState([]);




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


    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes()

    },[tagsSelected,search]);

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
            <Input placeholder='Pesquisar pelo Título'
                 icon={FiSearch}
                 onChange = {()=> setSearch(e.target.value)}

                />
            </Search>

            <Content>
                <Section title ='Minhas notas'>
                  
                {notes.map(note=>(
                        <Note 
                        key={String(note.id)}
                        data={note}
                    />
                    ))
                    }
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