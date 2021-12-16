import { useEffect, useState } from "react";

//Components
import Nav from "./components/Nav/Nav";
import NewsGrid from "./components/NewsGrid/NewsGrid";
import Pagination from "./components/Pagination/Pagination";
import Selector from "./components/Selector/Selector";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";

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

  //find initial favorites on local storage
  let initialFavorites: NewType[] = JSON.parse(
    localStorage.getItem("favorites") || ""
  );
  if (!initialFavorites) {
    initialFavorites = [];
  }

  //States
  const [news, setNews] = useState<NewType[]>([]);
  const [favorites, setFavorites] = useState<NewType[]>(initialFavorites);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(initialFilter);
  const [view, setView] = useState("All");

  //API
  const URL = `https://hn.algolia.com/api/v1/search?query=${filter}&page=${page}`;

  //fetching data
  const handleFetch = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((body) => {
        setNews([...body.hits]);
        setIsLoaded(true);
      })
      .catch((error) => console.error("Error", error));
  };

  //secondary effects
  useEffect(() => {
    //1st charge of data and in change of filter
    handleFetch();
  }, [filter]);

  useEffect(() => {
    //set filters in local storage
    if (initialFilter) {
      localStorage.setItem("filter", JSON.stringify(filter));
    } else {
      localStorage.setItem("filter", JSON.stringify(""));
    }

    //set favorites in local storage
    if (initialFavorites) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  }, [initialFilter, filter, initialFavorites, favorites]);

  //Change page function
  const handleChangePage = (page: number) => {
    setIsLoaded(false);
    handleFetch();
    setPage(page);
  };

  //handle favorites state
  const handleFavorites = (newItem: NewType) => {
    const isFavorite = favorites.find(
      (item) => item.objectID === newItem.objectID
    );
    if (isFavorite) {
      const newFavorites = favorites.filter(
        (i) => i.objectID !== newItem.objectID
      );
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, newItem]);
    }
  };

  //handle change View (all or favorites)
  const handleChangeView = (view: "All" | "Fav") => {
    setView(view);
  };

  //handle change filter ( angular, react or vue)
  const handleChangeFilter = (filter: "angular" | "react" | "vue") => {
    setFilter(filter);
    setPage(0);
  };

  //App component
  return (
    <div className="App">
      <Nav />
      <div className="maincontent">
        <Selector handleChangeView={handleChangeView} view={view} />
        <DropDownMenu handleChangeFilter={handleChangeFilter} />
        {isLoaded && (
          <NewsGrid
            data={view === "All" ? news : favorites}
            handleFavorites={handleFavorites}
            favorites={favorites}
          />
        )}
        {isLoaded && view === "All" ? (
          <Pagination
            actualPage={page}
            changePage={handleChangePage}
          ></Pagination>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
