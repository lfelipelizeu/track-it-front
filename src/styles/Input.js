import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    height: 45px;
    background-color: #ffffff;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: #666666;
    padding-left: 10px;
    margin-bottom: 10px;

    ::placeholder {
        color: #DBDBDB;
    }

    :disabled {
        background-color: #f2f2f2;
        color: #afafaf;
    }
`;

export {
    Input
};