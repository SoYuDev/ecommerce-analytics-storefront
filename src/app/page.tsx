import Header from '../components/Header';
import Searchbar from '@/components/Searchbar';
import Footer from '@/components/Footer';
import GridPage from '@/components/GridPage';

export default function Page() {
  return (
    <>
      <body className="bodyMain">
        {/* HEADER */}
        <Header></Header>

        {/* BOTON BUSQUEDA, FILTROS Y CARRITO */}
        <Searchbar></Searchbar>

        {/* <GridPage></GridPage> */}
        {/* <SideBar></SideBar> */}

        {/* PLANTILLA GRID */}
        <GridPage></GridPage>
        {/* <ProductGrid></ProductGrid> */}

        {/* FOOTER */}
        <Footer></Footer>
      </body>
    </>
  );
}
