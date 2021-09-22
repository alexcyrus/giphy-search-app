import React, { useState, useEffect } from "react";
import axios from "axios";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "1XhJ0iwNaQzWMqoIoWlRraoe9Gxo89PE"
        }
      });
      console.log(results);
      setData(results.data.data);
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }
    return data.map(el => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      )
    })
  }

  return <div className="container gifs">{renderGifs()}</div>
};

export default Giphy;