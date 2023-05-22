import React, { useState, useEffect } from 'react';
import Client from 'shopify-buy';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const client = Client.buildClient({
      storefrontAccessToken: 'YOUR_STOREFRONT_ACCESS_TOKEN',
      domain: 'YOUR_SHOP_DOMAIN',
    });

    client.product.fetch('PRODUCT_ID').then((fetchedProduct) => {
      setProduct(fetchedProduct);
      setSelectedVariant(fetchedProduct.variants[0]);
      setIsLoading(false);
    });
  }, []);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <img src={selectedVariant.image.src} alt={selectedVariant.image.altText} />
          <p>{selectedVariant.title}</p>
          <p>Price: {selectedVariant.price}</p>
          {product.variants.map((variant) => (
            <button key={variant.id} onClick={() => handleVariantChange(variant)}>
              {variant.title}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductPage;
