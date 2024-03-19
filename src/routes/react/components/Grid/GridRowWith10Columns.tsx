/** @jsxImportSource react */
import { useRef } from 'react';
import ProductCard from '../Cards/ProductCard';
import { ScrollLeftButton, ScrollRightButton } from '../ScrollButtons';
import UpAndComingProductCard from '../Cards/UpAndComingProductCard';
import styles from '../../../styles/Grid.module.scss';
import { generateProductDescription } from '../../../../utils/generateProductDescription';

interface ProductItem {
  _id: string;
  productName: string;
  sale: boolean;
  coloursShown: string;
  cheapestPrice: number;
  beforePrice: number;
  inStock: boolean;
  coverImage: string;
  comingSoon: boolean;
  comingSoonDate: string;
  comingSoonTime: string;
  brand: string;
  colourShown: string;
}

interface GridRowWith10ColumnsProps {
  heading: string;
  href?: string;
  more?: string;
  data: ProductItem[];
}

const GridRowWith10Columns = ({
  heading,
  href,
  more,
  data,
}: GridRowWith10ColumnsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  console.log(data, heading);
  return (
    <section>
      <div className={styles['product-row__container']}>
        <h2 className={styles['product-row__container__title']}>{heading}</h2>
        {href && more && (
          <a
            href={href}
            className={styles['product-row__container__recommended']}
          >
            {more}
          </a>
        )}
      </div>
      <div
        data-cy={`home-desktop__${heading
          .toLowerCase()
          .replace(' ', '-')}__products`}
        className={styles['product-row__container__vessel']}
        ref={scrollRef}
      >
        <ScrollLeftButton scrollRef={scrollRef} />
        {data.map((item, index) => (
          <div
            key={item._id}
            data-cy="product-card"
            className={styles['product-row__container__vessel__card']}
          >
            <a
              href={`/products/${item._id}/${generateProductDescription(
                item.productName,
                item.coloursShown,
              )}`}
            >
              {item.comingSoon ? (
                <UpAndComingProductCard
                  name={item.productName}
                  coloursShown={item.coloursShown}
                  alt={item.productName}
                  price={item.cheapestPrice}
                  src={item.coverImage}
                  comingSoonTime={item.comingSoonTime}
                />
              ) : (
                <ProductCard
                  coloursShown={item.coloursShown}
                  name={item.productName}
                  sale={item.sale}
                  alt={item.productName}
                  price={
                    item.cheapestPrice > item.beforePrice && item.sale
                      ? item.beforePrice
                      : item.cheapestPrice
                  }
                  priceBefore={
                    item.beforePrice < item.cheapestPrice && item.sale
                      ? item.cheapestPrice
                      : item.beforePrice
                  }
                  inStock={item.inStock}
                  src={item.coverImage}
                />
              )}
            </a>
          </div>
        ))}
        <ScrollRightButton scrollRef={scrollRef} />
      </div>
    </section>
  );
};

export default GridRowWith10Columns;
