import { useRouter } from "next/router";

const HalamanCategory = () => {
  const { query } = useRouter();
  const { slug } = query;

  return (
    <div>
      <h1>Halaman Category</h1>

      {!slug && <p>Tidak ada parameter kategori.</p>}

      {Array.isArray(slug) && (
        <div>
          <h3>Daftar Parameter URL:</h3>
          <ul>
            {slug.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HalamanCategory;