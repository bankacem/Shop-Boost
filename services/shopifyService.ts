
export const fetchShopifyProducts = async (domain: string, token: string) => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2023-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    if (result.errors) throw new Error(result.errors[0].message);

    return result.data.products.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      price: `${edge.node.priceRange.minVariantPrice.amount} ${edge.node.priceRange.minVariantPrice.currencyCode}`,
      image: edge.node.images.edges[0]?.node.url || 'https://picsum.photos/400/400',
    }));
  } catch (error) {
    console.error("Shopify Fetch Error:", error);
    return null;
  }
};
