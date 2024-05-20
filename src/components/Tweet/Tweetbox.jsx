// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import { blue } from '@mui/material/colors';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import './Tweetbox.css';


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
  const [content, setContent] = useState('');

  // Function to create a tweet
  const createTweet = async () => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');



    if (!userId || !username) {
      console.error('User is not logged in');
      return;
    }

    try {
      const response = await axios.post('tweets/create', {
        userId: userId,
        username: username,
        content: content,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);

      setContent('');
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTweet();
  };

  return (
    <div className="tweetbox-container">
      {/*   <div className="tweetbox-title">
        <h2>Home</h2>
      </div> */}

      <div className="tweetbox">
        <Avatar src="Public/photo.jpg" sx={{ width: 60, height: 60 }} />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          type="text"
        />
      </div>
      {/*     <div className="tweetbox-line">
        <hr />
      </div>
 */}
      <div className="tweetbox-footer">
        <div className="tweetbox-footer">
          <BlueFolderOpenIcon />
          <GifIconComponent />
          <BallotIconComponent />
          <EmojiIconComponent />
          <EventIconComponent />
          <GoodIconComponent />
        </div>
        <div>
          <button className="t-button" type="submit" onClick={handleSubmit}>Tweet</button>
        </div>
      </div>

    </div>
  );
}

export default Tweetbox;
