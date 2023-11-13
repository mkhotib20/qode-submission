'use client';

import { useMemo } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';

import { Button, Flex } from '@chakra-ui/react';

import { ActionButtonsProps } from '../models/types';

const ActionButtons = ({ isLiked, toggleLike }: ActionButtonsProps) => {
  const LikeIcon = useMemo(() => (isLiked ? AiFillLike : AiOutlineLike), [isLiked]);
  return (
    <Flex>
      <Button onClick={toggleLike} bgColor="transparent" color="GrayText">
        <LikeIcon color={isLiked ? 'blue' : undefined} />
      </Button>
      <Button bgColor="transparent" color="GrayText">
        <BiComment />
      </Button>
    </Flex>
  );
};

export default ActionButtons;
