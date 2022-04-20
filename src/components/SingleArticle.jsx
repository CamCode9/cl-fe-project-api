import * as React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {  Link } from "react-router-dom";
import { getArticleById } from '../utils/getArticleById';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const SingleArticle = () => {
    const [article, setArticle] = useState({});
    const {article_id} = useParams();

    useEffect(() => {
        getArticleById(article_id)
        .then(article => {
            setArticle(article)
        })
    }, [article_id])
    
    return (
        <>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 10000,
              height: 'max-content',
              padding: 2
            },
          }}
        >
          <Paper elevation={6}><h2>{article.title}</h2></Paper>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 10000,
              height: 'min-content',
              padding: 2
            },
          }}
        >
          <Paper elevation={5}> {article.body}
          </Paper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 10000,
              height: 'min-content',
              padding: 2
            },
          }}
        >
          <Paper elevation={4}> 
          <p>Author: {article.author}</p>
          <p>Created: {article.created_at}</p> 
          <p>Topic:     
              <Link to={`/topics/${article.topic}`}>
                {article.topic}
              </Link>
           </p>
          </Paper>
        </Box>
        </>
      );
}

export default SingleArticle