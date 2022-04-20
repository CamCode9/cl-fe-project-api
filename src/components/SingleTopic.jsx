import * as React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {  Link } from "react-router-dom";
import { getArticles } from '../utils/getArticles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const SingleTopic = () => {
    const [articles, setArticles] = useState([]);
    const {topicName} = useParams();

    useEffect(() => {
        getArticles()
        .then(articlesList => {
            const articlesByTopic = articlesList.filter(article => {
                return article.topic === topicName
            })
            setArticles(articlesByTopic)
        })

    }, [topicName])

    return (
        <main>
             <h2 className='centreHeader'>Articles on {topicName}</h2>
           <List sx={{ width: '95%', bgcolor: 'background.paper' }}>
                {articles.map((article) => {
                    const articleTopic = article.topic.toUpperCase()
                    const articleBlurb = ' - ' + article.body.slice(0, 80) + '...'
                    const articleLink = '/articles/' +  article.article_id;

                    return (
                        <>
                        <Link to={articleLink} style={{ textDecoration: 'none' }}>
                        <ListItem alignItems="flex-start" key={article.article_id}>
                         <ListItemText
                         primary={article.title}
                        secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {articleTopic}
                        </Typography>
                        
                        {articleBlurb}
                        </React.Fragment>
                             }
                          />
                        
                        </ListItem>
                        </Link>
                        <Divider component="li" />
                        </>
                    )
                })}
            </List>
        </main>
    )
}

export default SingleTopic