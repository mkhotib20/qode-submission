'use client';

import { forwardRef, useMemo, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';

import { Button, Flex, Text } from '@chakra-ui/react';

import { API_URL } from '@/models/constants';

import { ActionButtonsProps } from './models/types';

const ActionButtons = forwardRef<HTMLTextAreaElement, ActionButtonsProps>((props, inputRef) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const { likeCount, commentCount } = props;
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const LikeIcon = useMemo(() => (isLiked ? AiFillLike : AiOutlineLike), [isLiked]);

  const handleComment = () => {
    if (!inputRef?.current) return;
    inputRef.current.focus();
  };

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    fetch(`${API_URL}/post/like/${props.postID}`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
    setLocalLikeCount((prev) => prev + (isLiked ? -1 : 1));
  };
  return (
    <Flex alignItems="center">
      <Button onClick={toggleLike} bgColor="transparent" color="GrayText">
        <LikeIcon color={isLiked ? 'blue' : undefined} />
        <Text fontSize="small" marginLeft="4px" as="span">
          {localLikeCount || 0}
        </Text>
      </Button>
      <Button onClick={handleComment} bgColor="transparent" color="GrayText">
        <FiMessageCircle />
        <Text fontSize="small" marginLeft="4px" as="span">
          {commentCount || 0}
        </Text>
      </Button>
    </Flex>
  );
});

ActionButtons.displayName = 'ActionButtons';

export default ActionButtons;
