import * as React from 'react';
import {useEffect, useState} from 'react';
import {  Link } from "react-router-dom";

import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { getTopics } from '../utils/getTopics';

const Topics = () => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getTopics().then(topicsList => {
            setTopics(topicsList)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <main>
            <List sx={{ width: '95%', bgcolor: 'background.paper' }}>
                {topics.map((topic) => {
                  const topicLink = '/topics/' + topic.slug
                  const topicTitle = topic.slug.toUpperCase()
                    return (
                        <>
                        <ListItem alignItems="flex-start" key={topic.slug}>
                          
                         <ListItemText
                         primary={topicTitle}
                        secondary={
                        <React.Fragment>
                        {topic.description}
                        </React.Fragment>
                             }
                          />
                            <Link to={topicLink}>
                        <Button>View articles</Button>
                        </Link>
                        </ListItem>
                        <Divider component="li" />
                        
                        </>
                    )
                })}
            </List>
        </main>
    )
}

export default Topics