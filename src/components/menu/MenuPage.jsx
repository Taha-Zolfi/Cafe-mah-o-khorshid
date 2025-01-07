import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { motion, AnimatePresence } from 'framer-motion';
import './Menu.css';

import { Coffee, Beer, Cake, IceCream, Pizza, Sandwich, Salad, Fish } from 'lucide-react';

const categoryIcons = {
  "قهوه": <Coffee />,
  "نوشیدنی سرد و گرم": <Beer />,
  "کیک": <Cake />,
  "آیس پک": <IceCream />,
  "شیک": <Beer />,
  "ویتامینه": <Beer />,
  "آب میوه": <Beer />,
  "پیتزا": <Pizza />,
  "سوخاری": <Sandwich />,
  "ساندویچ": <Sandwich />,
  "برگر": <Sandwich />,
  "غذای فرنگی": <Salad />,
  "سینی": <Salad />,
  "غذای دریایی": <Fish />,
  "پیش غذا": <Salad />,
  "نوشیدنی": <Beer />
};

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("product").select("*");
      if (error) console.error("Error fetching products:", error);
      else {
        setProducts(data);
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        setCategories(uniqueCategories);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="body">
    <motion.div 
      className='Menu'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    > 
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        منو
      </motion.h1>
      <motion.div 
        className="filter"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            {categoryIcons[category] || <Coffee />}
            {category}
          </motion.button>
        ))}
      </motion.div>
      <AnimatePresence>
        <motion.div 
          className="products"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, scale: 0.9, y:20 }}
              animate={{ opacity: 1, scale: 1, y:0 }}
              exit={{ opacity: 0, scale: 0.9, y:-20 }}
              transition={{ delay: 0.05 * index, duration: 0.3, ease: "easeInOut" }}
              whileHover={{y:-5}}
              layout
            >
              <div className="top-card">
                <img src={product.img_url} alt={product.name} />
              </div>
              <div className="bottom-card">
                <div className="card-content">
                  <h2 className="card-title">{product.name}</h2>
                  <p className="card-txt">{product.price} تومان</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div> </div>
  );
}

export default Menu;

