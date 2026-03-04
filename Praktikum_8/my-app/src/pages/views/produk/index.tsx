type ProductType = {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const TampilProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <h1>Daftar Produk</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <img src={product.image} width="200"/>
          <p>{product.category}</p>
        </div>
      ))}
    </div>
  )
}

export default TampilProduk