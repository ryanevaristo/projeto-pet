import { useEffect, useState } from 'react';

import Input from '../form/Input';
import styles from './ProjectForm.module.css'
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
function ProjectForm({ handleSubmit, projectData, btnText}) {

    const [categories, setCategories] = useState([])
    const [project , setProject] = useState(projectData || {})
    const [raca, setRaca] = useState([])

    useEffect(() =>{
            fetch("http://localhost:5000/categories",
        {
            method: "GET",
            headers:{
                'Content-type': 'aplication/json'
            }
        }
        ).then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((error) => console.log(error))
    }, [])

    useEffect(() =>{
        fetch("http://localhost:5000/Racas",
    {
        method: "GET",
        headers:{
            'Content-type': 'aplication/json'
        }
    }
    ).then((resp) => resp.json())
    .then((data) => {
        setRaca(data)
    })
    .catch((error) => console.log(error))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
        
    }
    function handleCategory(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
        
    }
    function handleRaca(e) {
        setProject({...project, raca: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
        
    }

    return ( 
        <form onSubmit={submit} className={styles.form}>
            <Input
             type="text"
             text="Nome do Pet"
             name="name"
             placeholder="Insira o nome do Pet"
             handleOnChange={handleChange}
             value={project.name ? project.name : ""}
            />
            <Select name="raca_id" 
            text="Selecione uma Raça" 
            options={raca}
            handleOnChange={handleRaca}
            value={project.raca ? project.raca.id : ''} />

            <Input
             type="number"
             text="Valor do Serviço"
             name="value"
             placeholder="Insira o valor do Serviço"
             handleOnChange={handleChange}
             value={project.value ? project.value : ""}
            />
            <Input
             type="date"
             text="data do Serviço"
             name="date"
             placeholder="Insira o dia do Serviço"
             handleOnChange={handleChange}
             value={project.date ? project.date : ""}
            />
            <Select name="category_id" 
            text="Selecione o tipo do Serviço" 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText}/>
        </form>
     );
}

export default ProjectForm;