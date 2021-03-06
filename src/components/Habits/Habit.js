import styled from 'styled-components';
import { HabitBox } from '../../styles/MainPageStyles.js';

import { useContext } from 'react';
import { deleteHabit, getHabits } from '../../service/trackit.js';

import UserContext from '../../contexts/UserContext.js';

export default function Habit ({ habit, setHabitsList }) {
    const { id, name, days } = habit;
    const weekdays = ["D","S","T","Q","Q","S","S"];
    const { user } = useContext(UserContext);

    function treatSuccess () {
        getHabits(user.token, setHabitsList);
    }

    function deleteThisHabit (id, name) {
        if (window.confirm(`Deseja deletar o hábito '${name}'?`)) {
            deleteHabit(id, user.token, treatSuccess);
        }
    }

    return (
        <HabitBox>
            <Name>{name}</Name>
            <TrashIcon onClick={() => deleteThisHabit(id, name)}>
                <ion-icon name="trash-outline"></ion-icon>
            </TrashIcon>
            <Weekdays>
                {weekdays.map((day,index) => <Day key={index} selected={days.includes(index)}>{day}</Day>)}
            </Weekdays>
        </HabitBox>
    );
}

const Name = styled.h3`
    font-size: 23px;
    margin-bottom: 10px;
`;

const Weekdays = styled.div`
    display: flex;
    margin-bottom: 5px;
`;

const Day = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    background-color: ${({ selected }) => selected ? '#cfcfcf':'transparent'};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: ${({ selected }) => selected ? '#ffffff':'#dbdbdb'};
    margin-right: 5px;
`;

const TrashIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;

    ion-icon {
        font-size: 20px;
    }
`;