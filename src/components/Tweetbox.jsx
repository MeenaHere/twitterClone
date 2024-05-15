// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import axios from 'axios';
import { styled } from '@mui/system';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import { blue } from '@mui/material/colors';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import AuthContext from '../AuthContext';
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

const BlueFolderOpenIcon = styled(SourceOutlinedIcon)({
  color: blue[500],
});

const GifIconComponent = styled(GifBoxOutlinedIcon)({
  color: blue[500],
});

const BallotIconComponent = styled(BallotOutlinedIcon)({
  color: blue[500],
});

const EmojiIconComponent = styled(EmojiEmotionsOutlinedIcon)({
  color: blue[500],
});

const EventIconComponent = styled(EventNoteOutlinedIcon)({
  color: blue[500],
});

const GoodIconComponent = styled(FmdGoodOutlinedIcon)({
  color: blue[500],
});

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const Tweetbox = () => {
  const [tweet, setTweet] = useState('');
  const [status, setStatus] = useState('');
  /* const { auth } = useContext(AuthContext); */
  const loggedInUserId = localStorage.getItem("userId");
  console.log(localStorage.getItem("userId"))
  const handleInputChange = (event) => {
    setTweet(event.target.value);
  };

  const handleTweetSubmit = async () => {
    try {
      if (!loggedInUserId) {
        setStatus('Unauthorized. Please log in.');
        return;
      }
      await axios.post('tweets/create', { content: tweet });
      setStatus('Tweet posted successfully');
      setTweet('');
    } catch (error) {
      setStatus('Failed to post tweet');
      console.error('Posting error:', error);
    }
  };

  return (
    <div className="new-post-container">

      <div className="new-post">
        <Avatar sx={{ bgcolor: deepPurple[500] }}>
          {loggedInUserId ? loggedInUserId.split(' ')[0].charAt(0) : ''}
        </Avatar>
        {/* <Avatar src="Public/photo.jpg" sx={{ width: 60, height: 60 }} /> */}
        <input
          type="text"
          placeholder="What's happening?!"
          value={tweet}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <div className="post-icons">
        <BlueFolderOpenIcon className="icon" />
        <GifIconComponent className="icon" />
        <BallotIconComponent className="icon" />
        <EmojiIconComponent className="icon" />
        <EventIconComponent className="icon" />
        <GoodIconComponent className="icon" />
      </div>
      <div className="buttons">
        <button className="feed-btn" onClick={handleTweetSubmit}>Tweet</button>
      </div>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Tweetbox;
