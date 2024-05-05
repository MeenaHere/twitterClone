import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CommentForm from '../components/Feed/Comment';

jest.mock('axios');

describe('CommentForm', () => {
    test('submits comment when form is submitted', async () => {
        const onCommentSubmit = jest.fn();

        const { getByPlaceholderText, getByText } = render(
            <CommentForm postId="testPostId" onCommentSubmit={onCommentSubmit} />
        );

        const textarea = getByPlaceholderText('Post your comment');
        fireEvent.change(textarea, { target: { value: 'Test comment' } });


        axios.post.mockResolvedValueOnce({ data: { content: 'Test comment' } });

        const submitButton = getByText('Post');
        fireEvent.click(submitButton);


        await waitFor(() => {

            expect(axios.post).toHaveBeenCalledWith(
                `http://localhost:8000/comment/testPostId`,
                {
                    userId: 'userId',
                    content: 'Test comment',
                }
            );

            expect(onCommentSubmit).toHaveBeenCalled();
        });
    });
});