import * as React from 'react';
import {useEffect, useState} from 'react';
import {  Link, useSearchParams } from "react-router-dom";
import { getArticles } from '../utils/getArticles';
import {List, ListItem, Divider, ListItemText, Typography} from '@mui/material/';
import Select from 'react-select';


const Articles = () => {
    const [articles, setArticles] = useState([])
    const [querySelect, setQuerySelect] = ('created_at')
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getArticles().then(articlesList => {
            setArticles(articlesList)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])
    const sortByQueries = [
        {label: 'Topic - ascending', value: '?sort_by=topic&order=asc'},
        {label: 'Topic - descending', value: '?sort_by=topic'},
        {label: 'Created - newest', value: '?sort_by=created_at&order=asc'},
        {label: 'Created - oldest', value: '?sort_by=created_at'},
        {label: 'Votes - most', value: '?sort_by=votes&order=asc'},
        {label: 'Votes - fewest', value: '?sort_by=votes'},
    ]

    const handleQueryChange = (value) => {
        console.log(value, 'VALUE')
    }

    return (
        <main>
            <div>
                <Select value={querySelect} options={sortByQueries} placeholder='Sort by' onInputChange={() => {handleQueryChange()}}/>
            </div>
            <List sx={{ width: '95%', bgcolor: 'background.paper' }}>
                {articles.map((article) => {
                    const articleTopic = article.topic.toUpperCase()
                    const articleBlurb = ' - ' + article.body.slice(0, 80) + '...'
                    const articleLink = '/articles/' +  article.article_id;

                    return (
                        <React.Fragment key={article.article_id}>
                        <ListItem alignItems="flex-start" >
                        <Link to={articleLink} style={{ textDecoration: 'none' }}>
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
                        
                        </Link>
                        </ListItem>
                        <Divider component="li" />
                        </React.Fragment>
                    )
                })}
            </List>
        </main>
    )
}

export default Articles