
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Products from "./Products";

const Category = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const validCategories = ["superbikes", "luxury-cars", "sports-cars"];
    
    if (!validCategories.includes(categorySlug || "")) {
      navigate("/products");
    } else {
      // Set the category in search params for the Products component
      const newParams = new URLSearchParams(searchParams);
      newParams.set("category", categorySlug || "");
      setSearchParams(newParams);
    }
  }, [categorySlug, navigate, searchParams, setSearchParams]);
  
  return <Products />;
};

export default Category;
