import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, []);

  return null;
};

export default Home;
