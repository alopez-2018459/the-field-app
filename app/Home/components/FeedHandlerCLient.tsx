'use client';

import { SCROLLING_PAGINATION_NUMBER } from '@/app/config';
import { PostType } from '@/app/types/postType';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import PostHomeCard from './PostHomeCard';

type Props = {
  initialPosts: PostType[];
  sessionId: string;
};

const fetchPosts = async (pageParam: number): Promise<PostType[]> => {
  const query = `/api/Posts?limit=${SCROLLING_PAGINATION_NUMBER}&page=${pageParam}`;
  const res = await fetch(query);

  const posts = await res.json();

  return posts;
};

export function FeedHandlerClient({ initialPosts, sessionId }: Props) {
  const lastPostRef = useRef<HTMLElement>(null);
  const { entry, ref } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const {
    data, fetchNextPage, isFetchingNextPage, status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialData: { pages: [initialPosts], pageParams: [1] },
  });

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  console.log(posts);

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div>

      <ul className="flex flex-col">
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <li key={post._id} ref={ref}>
                <PostHomeCard post={post} sessionId={sessionId} />
              </li>

            );
          }
          return <PostHomeCard post={post} sessionId={sessionId} />;
        })}
      </ul>

      {isFetchingNextPage && (
      <div className="text-white text-3xl w-full flex items-center justify-center animate-pulse">
        ...
      </div>
      )}
      {status === 'error' && (
      <div className="text-white text-sm w-full flex items-center justify-center animate-pulse">
        Already up to date.
      </div>
      )}
    </div>
  );
}
