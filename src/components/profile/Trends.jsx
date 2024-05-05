import { useEffect, useState } from "react";
import { getTop5Hash } from "../../tweetServices";

function Trends() {
  const [topTrending, setToptrending] = useState([]);

  //Fetch top 5 hashtag from db
  useEffect(() => {
    const fetchData = async () => {
      const trending = await getTop5Hash();
      setToptrending(trending);
    };
    fetchData();
  }, []);
  return (
    <div className="mt-3">
      <div>{/*Add serch component here*/}</div>

      <div className=" w-100 m-2 p-2 bg-light rounded-4">
        <p className=" ">
          <b className="trend-heading text-sm">Trends for you</b>
        </p>
        <ul className="list-unstyled p-2">
          {topTrending.map((t, index) => (
            <li key={index}>
              <b> {t._id}</b>
              <p>{t.count}K</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Trends;
