import React, { useState, useEffect, useCallback } from 'react';
import MessageList from './MessageList';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';




interface Message {
    _id: string;
    message: string;
    author: string;
    datetime: string;
}




const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [formState, setFormState] = useState({
        newMessage: '',
        author: '',

    });

    const fetchMessages = useCallback(async () => {

        try {
            const response = await fetch('http://146.185.154.90:8000/messages');
            const data = await response.json();
            setMessages(data.slice(-20));

               } catch (error) {
             console.error('Ошибка при загрузке сообщений:', error);
        }
    }, []);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);

        return () => clearInterval(interval);
    },      [fetchMessages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new URLSearchParams();
            data.set('message', formState.newMessage);
            data.set('author', formState.author);

            await fetch('http://146.185.154.90:8000/messages', {
                method: 'POST',
                body: data,
            });

            fetchMessages();
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
        }
        setFormState({
            ...formState,
            newMessage: ''
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState({
            ...formState,
            [id]: value
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Chat</h2>
                    <MessageList messages={messages} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={sendMessage}>
                        <Form.Group controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                value={formState.author}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="newMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formState.newMessage}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="mt-3">
                            Send
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;
