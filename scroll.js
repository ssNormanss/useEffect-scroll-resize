import { useEffect, useState } from "react";

const tabs = ["posts", "comments", "albums", "photos", "todos", "users"];

function Content() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      //cach don gian
      // if(window.scrollY >= 200){
      //   setShowGoToTop(true)
      // }
      // else {
      //   setShowGoToTop(false)
      // }

      //cach ngan gon
      setShowGoToTop(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    // console.log('add')
    return () => {
      window.removeEventListener("scroll", handleGoToTop);
      // console.log('remove')
    };
  });

  //che ra ne ^^

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  //het che

  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab}
          style={
            type === tab
              ? {
                  color: "#fff",
                  backgroundColor: "#333"
                }
              : {}
          }
          onClick={() => setType(tab)}
        >
          {tab}
        </button>
      ))}

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title || post.name}</li>
        ))}
      </ul>

      {showGoToTop && (
        <button
          style={{
            position: "fixed",
            right: 20,
            bottom: 20
          }}
          onClick={handleGoToTop}
        >
          Go to top
        </button>
      )}
    </div>
  );
}

export default Content;
