import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import data from '../../aiData/sampleData.json'
import { useOutletContext } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { ThemeContext } from '../../theme/ThemeContext';
import { useContext } from 'react';
import InitialChat from '../../components/InitialChat/InitialChat';
export default function Home() {

    const [showModal, setShowModal] = useState(false)
    const listRef = useRef(null)
    const [chatId, setChatId] = useState(1)
    const [selectedChatId, setSelectedChatId] = useState(null)
    const [scrollToBottom, setScrollToBottom] = useState(false)
    const { chat, setChat } = useOutletContext();
    const { mode } = useContext(ThemeContext)

    // GENERATING AI RESPONSE
    const generateResponse = (input) => {

        const response = data.find(item => input.toLowerCase() == item.question.toLowerCase())

        let answer = "Sorry, Did not understand your query!"

        if (response != undefined) {
            answer = response.response
        }

        setChat(prev => ([...prev,
        {
            type: 'Human',
            text: input,
            time: new Date(),
            id: chatId
        },
        {
            type: 'AI',
            text: answer,
            time: new Date(),
            id: chatId + 1
        }
        ]))

        setChatId(prev => prev + 2)

    }

    //AUTOSCROLL TO LAST ELEMENT
    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView()
    }, [scrollToBottom])

    return (
        <Stack
            height={'100vh'}
            justifyContent={'space-between'}
            sx={{
                '@media (max-width:767px)': {
                    background: mode == 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : ''
                }
            }}
        >

            <Navbar />  

            {chat.length == 0 && <InitialChat generateResponse={generateResponse} />}          
        </Stack>
    )
}