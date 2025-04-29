
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Products from "./Products";

const Category = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    const validCategories = ["superbikes", "luxury-cars", "sports-cars"];
    
    if (!validCategories.includes(categorySlug || "")) {
      navigate("/products");
    }
  }, [categorySlug, navigate]);
  
  return <Products />;
};

export default Category;
