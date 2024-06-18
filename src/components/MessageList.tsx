import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface Message {
    _id: string;
    message: string;
    author: string;
    datetime: string;
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <ListGroup>
            {messages.map((msg) => (
                <ListGroup.Item key={msg._id}>
                    <strong  style={{margin:'10px'}}>{msg.author}</strong>: {msg.message}
                    <div className="text-muted" style={{ fontSize: '0.9em' }}>
                        {new Date(msg.datetime).toLocaleString()}

                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default MessageList;