import Image from 'next/image';
import Header from '../components/Header';
import Searchbar from '@/components/Searchbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import SideBar from '@/components/Sidebar';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <body className="bg-[#e6e6e6]">
        {/* HEADER */}
        <Header></Header>

        {/* BOTON BUSQUEDA, FILTROS Y CARRITO */}
        <Searchbar></Searchbar>

        {/* <GridPage></GridPage> */}
        <SideBar></SideBar>

        {/* PLANTILLA GRID */}
        <ProductGrid></ProductGrid>

        {/* FOOTER */}
        <Footer></Footer>
      </body>
    </>
  );
}
