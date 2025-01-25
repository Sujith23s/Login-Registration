import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const user = location.state?.user;
  console.log(user?.name)

  return (
    <>
      <div style={{ color: "white" }}>
        <h1>Welcome home {user?.name}</h1>
      </div>
    </>
  );
}

export default Home;
