import heart from "../../assets/heart.svg";
function Favorite({ onShow }) {
  return (
    <div className="p-2 hover:bg-black/30 cursor-pointer flex gap-2 items-center rounded-md transition-all">
      <img src={heart} alt="heart" />
      <span onClick={onShow}>Favourite Locations</span>
    </div>
  );
}

export default Favorite;
