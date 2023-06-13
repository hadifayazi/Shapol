import { useEffect, useState } from "react";
import SinglePostWidget from "./SinglePostWidget";
import { nanoid } from "nanoid";
import { useGetMyPostsQuery } from "../../store/api/postApi";

const UsersPostWidget = ({ userId }) => {
  const [posts, setPosts] = useState(null);
  const { data, isSuccess, isError, error } = useGetMyPostsQuery(userId);

  useEffect(() => {
    if (isSuccess) {
      setPosts(data);
    }
    if (isError || error) {
      console.log(error);
    }
  }, [isSuccess, data, isError, error]);
  if (!posts) return null;

  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          photoPath,
          userPhotoPath,
          likes,
          comments,
        }) => (
          <SinglePostWidget
            key={nanoid() + _id}
            postId={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            photoPath={photoPath}
            userPhotoPath={userPhotoPath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default UsersPostWidget;
