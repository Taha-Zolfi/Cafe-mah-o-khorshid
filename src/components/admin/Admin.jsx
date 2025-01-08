import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fixedCategories = [
    "قهوه",
    "نوشیدنی سرد و گرم",
    "کیک",
    "آیس پک",
    "شیک",
    "ویتامینه",
    "آب میوه",
    "پیتزا",
    "سوخاری",
    "ساندویچ",
    "برگر",
    "غذای فرنگی",
    "سینی",
    "غذای دریایی",
    "پیش غذا",
    "نوشیدنی"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("product").select("*");
      setLoading(false);
      if (error) {
        console.error("Error fetching products:", error);
        showNotification("خطا در بارگیری محصولات", "error");
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      showNotification("لطفاً تمام فیلدها را پر کنید.", "error");
      return;
    }

    setLoading(true);
    const fileName = file ? `${Date.now()}-${file.name}` : null;

    let imageUrl = null;
    if (fileName) {
      const { error: uploadError } = await supabase.storage
        .from("product-image")
        .upload(fileName, file);
      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        showNotification("خطا در آپلود تصویر", "error");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("product-image").getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("product")
      .insert([{ ...newProduct, img_url: imageUrl }])
      .select();

    setLoading(false);

    if (error) {
      console.error("Error adding product:", error);
      showNotification("خطا در افزودن محصول", "error");
    } else if (data && data.length > 0) {
      setProducts(prevProducts => [...prevProducts, ...data]);
      setNewProduct({ name: "", price: "", category: "" });
      setFile(null);
      showNotification("محصول با موفقیت اضافه شد", "success");
    } else {
      console.error("No data returned after insert");
      showNotification("خطا در افزودن محصول", "error");
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    const { error } = await supabase.from("product").delete().eq("id", id);
    setLoading(false);
    if (error) {
      console.error("Error deleting product:", error);
      showNotification("خطا در حذف محصول", "error");
    } else {
      setProducts(products.filter((prod) => prod.id !== id));
      showNotification("محصول با موفقیت حذف شد", "success");
    }
  };

  const startEditing = (product) => {
    setEditingProduct({ ...product });
    setEditFile(null);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditFile(null);
  };

  const saveEdit = async () => {
    setLoading(true);
    let imageUrl = editingProduct.img_url;

    if (editFile) {
      const fileName = `${Date.now()}-${editFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("product-image")
        .upload(fileName, editFile);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        showNotification("خطا در آپلود تصویر", "error");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("product-image").getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from("product")
      .update({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        img_url: imageUrl,
      })
      .eq("id", editingProduct.id);

    setLoading(false);

    if (error) {
      console.error("Error updating product:", error);
      showNotification("خطا در ویرایش محصول", "error");
    } else {
      setProducts(products.map(p => p.id === editingProduct.id ? {...editingProduct, img_url: imageUrl} : p));
      setEditingProduct(null);
      setEditFile(null);
      showNotification("محصول با موفقیت ویرایش شد", "success");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  return (
    <div className="admin-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <h1 className="admin-title">پنل مدیریت</h1>

      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="admin-panel">
        <h2 className="admin-subtitle">مدیریت محصولات</h2>
        
        <div className="admin-form">
          <input
            type="text"
            placeholder="نام محصول"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="admin-input"
          />
          <input
            type="number"
            placeholder="قیمت"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="admin-input"
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="admin-input"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {fixedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="admin-file-input"
          />
        </div>
        
        <button onClick={addProduct} className="admin-add-button" disabled={loading}>
          افزودن محصول
        </button>

        <ul className="admin-product-list">
          {products.map((prod) => (
            <li key={prod.id} className="admin-product-item">
              <div className="admin-product-info">
                {prod.img_url && <img src={prod.img_url} alt={prod.name} className="admin-product-image" />}
                <div>
                  <h3 className="admin-product-name">{prod.name}</h3>
                  <p className="admin-product-details">{prod.price} تومان - {prod.category}</p>
                </div>
              </div>
              {editingProduct && editingProduct.id === prod.id ? (
                <div className="admin-edit-form">
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="admin-input"
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="admin-input"
                  />
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="admin-input"
                  >
                    {fixedCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <input 
                    type="file" 
                    onChange={(e) => setEditFile(e.target.files[0])} 
                    className="admin-file-input"
                  />
                  <div className="admin-edit-actions">
                    <button onClick={saveEdit} className="admin-edit-button" disabled={loading}>ذخیره</button>
                    <button onClick={cancelEditing} className="admin-delete-button" disabled={loading}>لغو</button>
                  </div>
                </div>
              ) : (
                <div>
                  <button onClick={() => startEditing(prod)} className="admin-edit-button" disabled={loading}>
                    ویرایش
                  </button>
                  <button onClick={() => deleteProduct(prod.id)} className="admin-delete-button" disabled={loading}>
                    حذف
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;

