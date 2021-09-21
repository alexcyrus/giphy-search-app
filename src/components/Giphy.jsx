import React, { useEffect, useState } from "react";
import axios from "axios";

const Giphy = () => {
  useEffect(() => {
    const fetchData = async () => {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "1XhJ0iwNaQzWMqoIoWlRraoe9Gxo89PE"
        }
      })

      console.log(results);
    }

    fetchData();
  })

  return (
  <div className="">
    Giphy
  </div>
  )
}

export default Giphy;