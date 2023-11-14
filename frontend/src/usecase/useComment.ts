import { useState } from 'react';

import dayjs from 'dayjs';

import useAuth from '@/context/auth/hooks/useAuth';
import { API_URL } from '@/models/constants';
import { Comment, PostData } from '@/models/types';

export interface PostItemProps {
  data: PostData;
}

const useComment = ({ data }: PostItemProps) => {
  const [loading, setLoading] = useState(false);
  const [showedComment, setShowedComment] = useState<Comment[]>();
  const { userData } = useAuth();

  const submitComment = async (commentValue: string) => {
    if (!userData) return;

    setLoading(true);
    setShowedComment((prev) => [
      ...(prev || []),
      {
        author_name: userData?.full_name,
        comment: commentValue,
        created_at: dayjs().toISOString(),
        // temp ID
        id: `${dayjs().unix()}`,
      },
    ]);

    try {
      const response = await fetch(`${API_URL}/comment/${data.id}`, {
        body: JSON.stringify({ comment: commentValue }),
        method: 'POST',
        headers: {
          'Content-Type': 'Application/Json',
        },
      });
      const rspJson = await response.json();
      if (!response.ok) {
        console.error(`Error submit comment : `, rspJson);
        return;
      }
      // remove unsynced comment
      setShowedComment((prev) => [rspJson, ...(prev?.filter((item) => item.synced) || [])]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { submitComment, loading, showedComment, setShowedComment };
};

export default useComment;
