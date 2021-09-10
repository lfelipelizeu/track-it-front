import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Image, Container } from '../styles/InitialPage.js'
import Logo from '../assets/images/logo.svg';
import { Input } from '../styles/Input.js';
import { Button } from '../styles/Button.js';
import { sendSignUpToServer } from '../service/trackit.js';
import Loader from "react-loader-spinner";


export default function SignUp () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disable, setDisable] = useState(false);
    const history = useHistory();

    function treatSuccess () {
        alert("Cadstro realizado com sucesso!");
        history.push("/");
    }

    function treatError (error) {
        switch (error.response.status) {
            case 422:
                alert("Preencha os campos corretamente!");
                break;
            case 409:
                alert("Usuário já cadastrado!");
                break;
            default:
                alert("Ocorreu algum erro! Tente novamente!");
        }

        setDisable(false);
    }

    function signUp () {
        const body = {
            email,
            password,
            name,
            image,
        }

        setDisable(true);

        sendSignUpToServer(body, treatSuccess, treatError);
    }

    return (
        <Container>
            <Image src={Logo} />
            <Input disabled={disable} type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input disabled={disable} type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Input disabled={disable} type="text" placeholder="nome" value={name} onChange={(e) => setName(e.target.value)} />
            <Input disabled={disable} type="url" placeholder="foto" value={image} onChange={(e) => setImage(e.target.value)}/>
            <Button onClick={signUp} disabled={disable}>{disable ? <Loader type="ThreeDots" height={45} color="#ffffff" />:"Cadastrar"}</Button>
            <Link to='/'>
                Já tem uma conta? Faça login!
            </Link>
        </Container>
    );
}