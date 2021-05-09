import { useEffect, useState } from "react";
import { Market } from "../models/market.interface";
import { CryptoService } from "../services/crypto.service";
import { map, take } from "rxjs/operators";
import CryptoList from "../components/CryptoList";

const Home = () => {
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    const subscription = CryptoService.getMarkets()
      .pipe(
        take(1),
        map((res) => {
          if (res) {
            return res;
          } else {
            return [];
          }
        })
      )
      .subscribe((markets: Market[]) => {
        setMarkets(markets);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <CryptoList cryptos={markets} />
    </div>
  );
};

export default Home;
