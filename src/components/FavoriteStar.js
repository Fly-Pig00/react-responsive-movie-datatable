import { FaStar } from "react-icons/fa";

function FavoriteStar({ filled, onClick }) {
  return (
    <FaStar 
     color={filled ? "orange" : "lightgray"} 
     onClick={onClick} />
  );
}
export default FavoriteStar;