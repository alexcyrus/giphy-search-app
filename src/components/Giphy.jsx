import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import Paginate from "./Paginate";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "1XhJ0iwNaQzWMqoIoWlRraoe9Gxo89PE",
            limit: 10
          }
        });
        console.log(results);
        setData(results.data.data);
      }
      catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 5000);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />
    }
    return data.map(el => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      )
    })
  };

  const renderError = () => {
    if (isError) {
      return (
        <div className="alert alert-danger alert-dismissable fade show" role="alert">
          Unable to get GIFs. Please try again.
        </div>
      )
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "1XhJ0iwNaQzWMqoIoWlRraoe9Gxo89PE",
          q: search,
          limit: 100
        }
      });
      setData(results.data.data);
    }
    catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    }
    setIsLoading(false);
  };

  return (
    <div className="m-2">
      {renderError()}
      <form className="form-inline justify-content-center m-2">
        <input value={search} onChange={handleSearchChange} type="text" placeholder="Search" className="form-control" />
        <button onClick={handleSubmit} type="submit" className="btn btn-primary mx-2">
          <i class="fas fa-search" />
        </button>
      </form>
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length} />
      <div className="container gifs">
        {renderGifs()}
      </div>
    </div>
  )
};

export default Giphy;