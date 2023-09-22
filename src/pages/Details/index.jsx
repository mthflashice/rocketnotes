import { Container, Links, Content} from './styles';

import { Header } from "../../components/Header";
import { Button } from '../../components/Button';

import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import {ButtonText} from '../../components/ButtonText'
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useParams } from 'react-router-dom';





  export  function Details(){
    const [data, setData] = useState(null)

    useEffect(()=>{
      async function fetchNote(){
        const response = await api.get(`/notes/${params.id}`)
        setData(response.data)
      }
      fetchNote()

    }, [])

    const parms = useParams()
 
  return(
    <Container>
      <Header />
      <main>
        <Content>

        
    

      <ButtonText title='Excluir Nota'/>
      <h1>
        Introdução ao React
      </h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores reiciendis ea dolore odit! Maiores repellendus mollitia iusto? Perferendis, doloremque! Dicta eveniet esse delectus quidem ab inventore quas commodi veniam labore.
      </p>
      <Section title = 'Links úteis'>
        <Links>
        <li><a href='#'>https://www.rocketseat.com.br/</a></li>
        <li><a href='#'>https://www.rocketseat.com.br/</a></li>
        </Links>
      </Section>

      <Section title = 'Marcadores'>
        <Tag title='express'/>
        <Tag title='node'/>


      </Section>
  
  <Button title='Voltar'/>
    </Content>
  </main>
  
  </Container>
  )
}