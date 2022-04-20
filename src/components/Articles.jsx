import * as React from 'react';
import {useEffect, useState} from 'react';
import {  Link } from "react-router-dom";
import { getArticles } from '../utils/getArticles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';


const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles().then(articlesList => {
            setArticles(articlesList)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <main>
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

export default Articles