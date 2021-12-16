import { useEffect, useState } from "react";

//Types

export type NewType = {
  story_id: number;
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
};

//Change page function

const App: React.FC = () => {
  const [news, setNews] = useState<NewType[]>([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("angular");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?query=${filter}&page=${page}`
      ).then((res) => res.json());
      setNews(data.hits);
    };
    fetchData();
  }, [filter, page]);

  return (
    <div className="App">
      {news?.map((item) => (
        <div>{item.story_title}</div>
      ))}
    </div>
  );
};

export default App;
