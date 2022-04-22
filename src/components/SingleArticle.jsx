import * as React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {  Link } from "react-router-dom";
import { getArticleById } from '../utils/getArticleById';
import { Button, ListItemText, Box, Paper, List, ListItem, Divider, TextField } from '@mui/material';
import patchVote from '../utils/patchVote'
import getComments from '../utils/getComments';
import getUser from '../utils/getUser';
import postComment from '../utils/postComment';



const SingleArticle = () => {
    const [article, setArticle] = useState({});
    const [username, setUsername] = useState({username: 'cooljmessy'})
    const [voteState, setVoteState] = useState(0)
    const [voteCount, setVoteCount] = useState(0);
    const [err, setErr] = useState(null);
    const [comments, setComments] = useState([]);
    const [currComment, setCurrComment] = useState([])
    const {article_id} = useParams();
    
   
    useEffect(() => {
        getArticleById(article_id)
        .then(article => {
            setArticle(article)
            setVoteCount(article.votes)
        })
    }, [article_id])

    useEffect(() => {
        getComments(article_id)
        .then(comments => {
            setComments(comments)
        })
    }, [comments])


    const handleUpVoteClick = () => {
        if(voteState === 0) {
            setVoteCount((currCount) => currCount + 1);
            setVoteState((state) => state + 1)
            setErr(null)
            patchVote(article.article_id, { inc_votes: 1 }).catch(err => {
                setVoteCount((currCount) => currCount - 1);
                setVoteState((state) => state - 1)
                setErr('Something went wrong, please try again.')
            })
        }
    }

    const handleDownVoteClick = () => {
        if(voteState === 1 ) {
            setVoteCount((currCount) => currCount - 1);
            setVoteState((state) => state - 1)
            setErr(null)
            patchVote(article.article_id, { inc_votes: -1 }).catch(err => {
                setVoteCount((currCount) => currCount + 1);
                setVoteState((state) => state + 1)
                setErr('Something went wrong, please try again.')
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCurrComment('Posting...')
        getUser(username.username).catch(err => {setErr('Invalid username, please login to post a comment')})
        const bodyToSend = {body: e.target.userComment.value, username: username.username, }
        postComment(article.article_id, bodyToSend)
        .catch(err => {setErr('Something went wrong, please try again')})
        setCurrComment('')
    }

    if (err) return <p style={{margin: '10%'}}>{err}</p>

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
          <p style={{'fontWeight': 'bold'}}>Votes: {voteCount}</p>
          </Paper>
        
          <Button variant="contained" sx={{background: '#30c2ae', 'fonWeight': 'bold'}} onClick={() => {
              handleUpVoteClick()
          }}>Upvote</Button>

          <Button variant="contained" sx={{background: '#30c2ae', 'fonWeight': 'bold'}} onClick={() => {
              handleDownVoteClick()
          }}>Remove vote</Button>
        </Box>

         

        <List sx={
            { width: '95%',
             bgcolor: 'background.paper',
              'paddingInlineStart': '10px' }}>
                  <h4>POST A COMMENT:</h4>
                  <form onSubmit={handleSubmit}>
                  <TextField
                  sx={{
                      width: '95%'
                    }}
                    required
               
                    id="userComment"
                    value={currComment}
                    onChange={(e) => {setCurrComment(e.target.value)}}
                    variant="standard"
                    />  
                    <Button 
                        type='submit'
                        sx={{background: '#30c2ae', margin: '1%'}}
                        variant='contained'
                        >
                        Submit
                    </Button>
                    </form>


                  <h4>COMMENTS:</h4>

            {comments.map((comment) => {
                   //FUNCTIONALITY OF COMMENT VOTE BUTTONS NOT WORKING YET
                // let commentVotability = true
                // let voteButton

                // if (commentVotability) {
                // voteButton =  <Button onClick={() => {handleCommentVote()}}>
                // <p>&#11014;</p>
                // </Button>
                // } else  {
                // voteButton =  <Button onClick={() => {handleCommentVote()}}>
                // <p>&#10006;</p>
                // </Button>
                // }
             

                // const handleCommentVote = () => {
                //     if(commentVotability) {
                //         comment.votes += 1
                //         commentVotability = false
                //     } else {
                //         comment.votes -= 1
                //         commentVotability = true
                //     }
                //   }

                return (
                    <> 
                    <ListItem alignItems='flex-start' key={comment.comment_id}>
                        <ListItemText 
                            primary={comment.author}
                            secondary={comment.body} 
                        />

                    </ListItem>
                         <Box sx={{ color: 'text.secondary', padding: '1em' }} >
                             Votes: {comment.votes}
                            {/* {voteButton} */}
                             
                         </Box>
                         <Divider component="li" />
                   </>
                )
            })}
        </List>
        </>
      );
}

export default SingleArticle