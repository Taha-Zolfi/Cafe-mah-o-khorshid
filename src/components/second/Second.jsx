import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import './Second.css';
import mah from '../../assets/mah.webp';
import side from '../../assets/sideimg.webp';

const Second = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        // Randomly select 5 items
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setFavoriteItems(shuffled.slice(0, 7));
      }
    };

    fetchFavoriteItems();
  }, []);

  return (
    <div className="secbody">
      <div className="second">
        <h1 className="left">سفارش تلفنی</h1>
        <div className="center"><img src={mah} alt="" /></div>
        <h1 className="right">سفارش آنلاین</h1>
      </div>
      
      <div className="favorite-items-container">
        <h2 className="favorite-items-title">محبوب ترین ها</h2>
        <div className="favorite-items-grid">
          {favoriteItems.map((item) => (
            <div key={item.id} className="favorite-item-card">
              <div className="favorite-item-image">
                <img src={item.img_url} alt={item.name} />
              </div>
              <div className="favorite-item-info">
                <h3>{item.name}</h3>
                <p>{item.price} تومان</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="second-down">
        <img src={side} alt="" />
        <div className="about">
          <h1>درباره ما</h1>
          <p>ﻣﺎ ﺩﺭ ﻣﺎﻩ ﻭ ﺧﻮﺭﺷﯿﺪ ﺑﻪ ﻫﻤﺮﺍﻩ ﯾﮏ ﺗﯿﻢ ﻫﻤﺪﻝ ، ﺗﻼﺵ ﻣﯿﮑﻨﯿﻢ ﺗﺎ ﻏﺬﺍﻫﺎﯼ ﺑﺎ ﮐﯿﻔﯿﺖ ﻭ ﺳﺎﻟﻢ ، ﺁﺑﻤﯿﻮﻩ ﻫﺎﯼ ﻃﺒﯿﻌﯽ ﻭ ﺗﺎﺯﻩ ﻭ ﻧﯿﺰ ﺑﺴﺘﻨﯽ ﻫﺎﯼ ﺧﻮﺷﻤﺰﻩ ﻭ ﺑﻪ ﺭﻭﺯ ﺗﻮﻟﯿﺪ ﮐﺮﺩﻩ ﻭ ﺩﺭ ﻣﺤﯿﻄﯽ ﺯﯾﺒﺎ ﻭ ﺩﻟﻨﺸﯿﻦ ﺑﺮﺍﯼ ﺧﺎﻧﻮﺍﺩﻩ ﻫﺎﯼ ﻋﺰﯾﺰ ﻟﺤﻈﺎﺕ ﺷﺎﺩﯼ ﺧﻠﻖ ﮐﻨﯿﻢ ﻭ ﺧﺎﻃﺮﻩ ﺑﺴﺎﺯﯾﻢ </p>
        </div>
      </div>
    </div>
  );
}

export default Second;

