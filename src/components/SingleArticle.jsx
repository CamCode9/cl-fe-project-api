import * as React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {  Link } from "react-router-dom";
import { getArticleById } from '../utils/getArticleById';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import patchVote from '../utils/patchVote'

const SingleArticle = () => {
    const [article, setArticle] = useState({});
    const [voteCount, setVoteCount] = useState(0)
    const [err, setErr] = useState(null);
    const {article_id} = useParams();

    useEffect(() => {
        getArticleById(article_id)
        .then(article => {
            setArticle(article)
            setVoteCount(article.votes)
        })
    }, [article_id])

    const handleUpVoteClick = () => {
        setVoteCount((currCount) => currCount + 1);
        setErr(null)
        patchVote(article.article_id, { inc_votes: 1 }).catch(err => {
            setVoteCount((currCount) => currCount - 1);
            setErr('Something went wrong, please try again.')
        })
    }

    const handleDownVoteClick = () => {
        setVoteCount((currCount) => currCount - 1);
        setErr(null)
        patchVote(article.article_id, { inc_votes: -1 }).catch(err => {
            setVoteCount((currCount) => currCount + 1);
            setErr('Something went wrong, please try again.')
        })
    }

    if (err) return <p>{err}</p>
  
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
          <p style={{'font-weight': 'bold'}}>Votes: {voteCount}</p>
          </Paper>
          <Button variant="contained" sx={{background: '#30c2ae', 'font-weight': 'bold'}} onClick={() => {
              handleUpVoteClick()
          }}>Upvote</Button>
          <Button variant="contained" sx={{background: '#30c2ae', 'font-weight': 'bold'}} onClick={() => {
              handleDownVoteClick()
          }}>Downvote</Button>
        </Box>
        </>
      );
}

export default SingleArticle