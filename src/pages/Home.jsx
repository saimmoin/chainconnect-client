/** @format */

import { getAllPostsQuery } from "@/store/posts/thunk";
import Spinner from "../components/Loader";
import { isLoading, selectProfile } from "../store/auth/slice";
import { isLoading as isPostsPending } from "../store/posts/slice";

import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";

const Home = () => {
  const isAuthLoading = useAppSelector(isLoading);
  const isPostsLoading = useAppSelector(isPostsPending);
  const profile = useAppSelector(selectProfile);
  console.log("⚡ ~ profile:", profile.following);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile.following.length > 0) dispatch(getAllPostsQuery({ _user_in: profile.following }));
  }, [profile.following.length]);
  return (
    <div className="pt-14 min-h-screen">
      {isAuthLoading || isPostsLoading ? (
        <div className="flex justify-center items-center">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div>
          Length Of Profiles: {profile.following.length} and Address: {profile.address}
        </div>
      )}
    </div>
  );
};

export default Home;
