import React from 'react'

function Home({ userRole }) {
  return (
    <div>
      {userRole === 'user' ? (
        <div>
        <h1>Welcome User</h1>
        <button>view post</button>
        </div>
      ) : userRole === 'admin' ? (
        <div>
          <h1>Welcome Admin</h1>
          <button>edit post</button>
        </div>
      ) : userRole === 'superadmin' ? (
        <div>
          <h1>Welcome Superadmin</h1>
          <button>add post</button>
          <button>delete post</button>
          <button>edit post</button>
          <button>view post</button>
        </div>
      ) : (
        <div>
          <h1>UnAuthorized</h1>
        </div>
      )}
    </div>
  )
}

export default Home
