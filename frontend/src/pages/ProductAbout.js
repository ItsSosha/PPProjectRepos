import { useOutletContext } from "react-router-dom";

const ProductAbout = () => {
  const { product } = useOutletContext();

  return <div>About</div>;
};

export default ProductAbout;
