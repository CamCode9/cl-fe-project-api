import React from "react";
import { Button, ListItemText, Box, Paper, List, ListItem, Divider, TextField } from '@mui/material';
import {useEffect, useState} from 'react';
import getComments from "../utils/getComments";
import patchComment from "../utils/patchComment";


const CommentCard = (props) => {
    const [voteState, setVoteState] = useState(0)
    const [voteCount, setVoteCount] = useState(props.votes);
    const [currCommentId, setCurrCommentId] = useState(props.comment_id)
    const [err, setErr] = useState(null);

    
    const handleUpVoteClick = () => {
        if(voteState === 0 || voteState === -1) {
            setVoteCount((currCount) => currCount + 1);
            setVoteState((state) => state + 1)
            setErr(null)
            patchComment(currCommentId, { inc_votes: 1 }).catch(err => {
                setVoteCount((currCount) => currCount - 1);
                setVoteState((state) => state - 1)
                setErr('Something went wrong, please try again.')
            })
        }
    }

    const handleDownVoteClick = () => {
        if(voteState === 0 || voteState === 1) {
            setVoteCount((currCount) => currCount - 1);
            setVoteState((state) => state - 1)
            setErr(null)
            patchComment(currCommentId, { inc_votes: -1 }).catch(err => {
                setVoteCount((currCount) => currCount + 1);
                setVoteState((state) => state + 1)
                setErr('Something went wrong, please try again.')
            })
        }
    }

    if (err) return <p style={{margin: '10%'}}>{err}</p>

    return (
        <React.Fragment key={props.comment_id}>
        <ListItem alignItems='flex-start' >
            <ListItemText 
                primary={props.author}
                secondary={props.body} 
            />

        </ListItem>
             <Box sx={{ color: 'text.secondary', padding: '1em' }} >
                 Votes: {voteCount}
                <Button onClick={() => {handleUpVoteClick()}}>
                <p>&#11014;</p>
                </Button>
                <Button onClick={() => {handleDownVoteClick()}}>
                <p>&#11015;</p>
                </Button>
             </Box>
             
             <Divider component="li" />
             </React.Fragment>
       
    )
}

export default CommentCard