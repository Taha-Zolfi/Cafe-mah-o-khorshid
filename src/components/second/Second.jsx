import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "../../supabaseClient"
import "./Second.css"
import mah from "../../assets/mah.webp"
import side from "../../assets/sideimg.webp"

const Second = () => {
  const [favoriteItems, setFavoriteItems] = useState([])

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      const { data, error } = await supabase.from("product").select("*")

      if (error) {
        console.error("Error fetching products:", error)
      } else {
        const shuffled = [...data].sort(() => 0.5 - Math.random())
        setFavoriteItems(shuffled.slice(0, 7))
      }
    }

    fetchFavoriteItems()
  }, [])

  return (
    <div className="secbody">
      {/* Phone & Online Order Section */}
      <motion.div
        className="second"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="left"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          سفارش تلفنی
        </motion.h1>
        <motion.div
          className="center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={mah || "/placeholder.svg"} alt="" />
        </motion.div>
        <motion.h1
          className="right"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          سفارش آنلاین
        </motion.h1>
      </motion.div>

      {/* Favorite Items Section */}
      <motion.div
        className="favorite-items-container"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="favorite-items-title"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          محبوب ترین ها
        </motion.h2>
        <motion.div
          className="favorite-items-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {favoriteItems.map((item) => (
            <motion.div
              key={item.id}
              className="favorite-item-card"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="favorite-item-image">
                <img src={item.img_url || "/placeholder.svg"} alt={item.name} />
              </div>
              <div className="favorite-item-info">
                <h3>{item.name}</h3>
                <p>{item.price} تومان</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* About Us Section */}
      <motion.div
        className="second-down"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.img
          src={side}
          alt=""
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="about"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>درباره ما</h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ﻣﺎ ﺩﺭ ﻣﺎﻩ ﻭ ﺧﻮﺭﺷﯿﺪ ﺑﻪ ﻫﻤﺮﺍﻩ ﯾﮏ ﺗﯿﻢ ﻫﻤﺪﻝ ، ﺗﻼﺵ ﻣﯿﮑﻨﯿﻢ ﺗﺎ ﻏﺬﺍﻫﺎﯼ ﺑﺎ ﮐﯿﻔﯿﺖ ﻭ ﺳﺎﻟﻢ ، ﺁﺑﻤﯿﻮﻩ ﻫﺎﯼ ﻃﺒﯿﻌﯽ ﻭ ﺗﺎﺯﻩ ﻭ
            ﻧﯿﺰ ﺑﺴﺘﻨﯽ ﻫﺎﯼ ﺧﻮﺷﻤﺰﻩ ﻭ ﺑﻪ ﺭﻭﺯ ﺗﻮﻟﯿﺪ ﮐﺮﺩﻩ ﻭ ﺩﺭ ﻣﺤﯿﻄﯽ ﺯﯾﺒﺎ ﻭ ﺩﻟﻨﺸﯿﻦ ﺑﺮﺍﯼ ﺧﺎﻧﻮﺍﺩﻩ ﻫﺎﯼ ﻋﺰﯾﺰ ﻟﺤﻈﺎﺕ ﺷﺎﺩﯼ ﺧﻠﻖ ﮐﻨﯿﻢ
            ﻭ ﺧﺎﻃﺮﻩ ﺑﺴﺎﺯﯾﻢ
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Second

