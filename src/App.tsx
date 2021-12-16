import { useEffect, useState } from "react";
import NewsGrid from "./components/NewsGrid/NewsGrid";
import Pagination from "./components/Pagination/Pagination";

//Types

export type NewType = {
  author: string;
  title: string;
  url: string;
  created_at: string;
  objectID: string;
};

const App: React.FC = () => {
  //Find a filter on local storage
  let initialFilter = localStorage.getItem("filter");
  if (!initialFilter) {
    initialFilter = "angular";
  } else if (typeof initialFilter === "string") {
    initialFilter = JSON.parse(initialFilter);
  }

  const [news, setNews] = useState<NewType[]>([]);
  const [favorites, setFavorites] = useState<NewType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(initialFilter);

  const URL = `https://hn.algolia.com/api/v1/search?query=${filter}&page=${page}`;

  //fetching data

  const handleFetch = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((body) => {
        console.log(body.hits);
        setNews([...body.hits]);
        setIsLoaded(true);
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  //Change page function
  const handleChangePage = (page: number) => {
    setIsLoaded(false);
    handleFetch();
    setPage(page);
  };
  return (
    <div className="App">
      {isLoaded && <NewsGrid data={news} />}
      {isLoaded && (
        <Pagination
          actualPage={page}
          changePage={handleChangePage}
        ></Pagination>
      )}
    </div>
  );
};

export default App;
