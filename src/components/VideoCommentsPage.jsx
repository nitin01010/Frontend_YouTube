import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createComments, DeleteComments, UpdateComments } from '../api/api';
import { toast } from 'react-toastify';
import { EllipsisVertical, Pen, Trash } from 'lucide-react';

const VideoCommentsPage = (props) => {
    const user = useSelector((state) => state.user.value);
    const [input, setInput] = useState({ comment: '' });
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const navigate = useNavigate();

    const toggleMenu = (index) => {
        setActiveMenuIndex(prev => prev === index ? null : index);
    };

    const handleEdit = (item, idx) => {
        setEditIndex(idx);
        setEditText(item.text);
        setActiveMenuIndex(null);
    };

    const { mutate } = useMutation({
        mutationFn: (val) => createComments(val),
        onSuccess: (res) => {
            toast(res.message);
            if (props.onCommentPosted) {
                props.onCommentPosted()
            }
        },
        onError: (err) => {
            toast(err?.response?.data?.message);
            navigate('/signin');
        },
    });

    const handleComments = () => {
        const { comment } = input;
        const authToken = localStorage.getItem("authToken");
        mutate({ comments: comment, authToken, videoId: props?.fullId });
        setInput({ comment: '' });
    };

    const { mutate: mutate1 } = useMutation({
        mutationFn: DeleteComments,
        onSuccess: (res) => {
            toast(res.message)
            if (props.onCommentPosted) {
                props.onCommentPosted()
            }
        },
        onError: (err) => toast(err?.response?.data?.message),
    });

    const handleDelete = (item) => {
        const { userId, _id: commentId } = item;
        const videoId = props?.fullId;
        const authToken = localStorage.getItem("authToken");
        mutate1({ userId, videoId, commentId, authToken });
        setActiveMenuIndex(null);
    };

    const { mutate: updateCommentMutation } = useMutation({
        mutationFn: UpdateComments,
        onSuccess: (res) => {
            toast(res.message);
            if (props.onCommentPosted) {
                props.onCommentPosted()
            }
            setEditIndex(null);
        },
        onError: (err) => toast(err?.response?.data?.message),
    });

    const handleUpdate = (item) => {
        const authToken = localStorage.getItem("authToken");
        updateCommentMutation({
            commentId: item._id,
            updatedText: editText,
            authToken,
            videoId: props?.fullId,
            userId: item.userId
        });
    };
    return (
        <div className='rounded-sm'>
            <h2 className='py-2 mb-2 font-bold text-xl'>{props?.item?.length} Comments</h2>

            <div className='flex gap-3 items-center'>
                <img
                    src='https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj'
                    className='w-[40px] h-[40px] rounded-full object-contain'
                />
                <textarea
                    className='w-full h-[30px] resize-none outline-none border-b border-[#575757] text-sm px-2 py-1'
                    rows={1}
                    value={input.comment}
                    onChange={(e) => setInput({ ...input, comment: e.target.value })}
                />
            </div>

            <div className='flex justify-end mt-2'>
                <button
                    disabled={input.comment === ''}
                    onClick={handleComments}
                    className={`w-[120px] h-[36px] text-sm rounded-full 
            ${input.comment === '' ? 'bg-[#575757] text-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'} 
            transition-colors duration-200 text-black`}
                >
                    Comment
                </button>
            </div>

            {props?.item?.slice().reverse().map((item, idx) => {
                const { text, timestamp, userName } = item;
                const date = new Date(timestamp);
                const formatted = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                });

                const isEditing = editIndex === idx;

                return (
                    <div
                        key={idx}
                        className='flex items-start relative mt-4 hover:bg-[#5757576c] transition duration-700 p-2 rounded-lg gap-5'
                    >
                        <img
                            src='https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj'
                            className='w-[42px] h-[42px] rounded-full object-cover'
                        />
                        <div className='w-full'>
                            <div className='flex items-center gap-5 text-gray-300'>
                                <h2 className='capitalize text-sm'>@{userName}</h2>
                                <p className='text-sm'>{formatted}</p>
                            </div>

                            {isEditing ? (
                                <>
                                    <textarea
                                        className='w-full text-sm mt-2  text-white p-2 rounded border border-[#575757]'
                                        value={editText}
                                        rows={2}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <div className='flex gap-3 mt-2'>
                                        <button
                                            className='text-sm bg-blue-500 px-3 py-1 rounded hover:bg-blue-700'
                                            onClick={() => handleUpdate(item)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className='text-sm bg-gray-500 px-3 py-1 rounded hover:bg-gray-600'
                                            onClick={() => setEditIndex(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className='text-sm py-2'>{text}</p>
                            )}
                        </div>


                        {item?.userName === user?.userId?.username ? <EllipsisVertical
                            onClick={() => toggleMenu(idx)}
                            className='cursor-pointer'
                        /> : null
                        }


                        {activeMenuIndex === idx && (
                            <div className='absolute flex justify-around items-center w-[131px] bg-[#414141] right-1 top-14 p-2 h-[40px] rounded-md z-10'>
                                <Pen
                                    size={20}
                                    onClick={() => handleEdit(item, idx)}
                                    className='cursor-pointer hover:text-blue-500'
                                />
                                <Trash
                                    size={20}
                                    onClick={() => handleDelete(item)}
                                    className='cursor-pointer hover:text-blue-500'
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    )
}

export default VideoCommentsPage
