import FlexibleImage from '@/app/components/FlexibleImage';

export default function Header() {
  return (
    <header className="header" role='banner'>
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <FlexibleImage
          src="/header.jpg"
          alt="Fondo de cabecera"
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
      </div>
      
      <div className="mainContainerHeader">
        <div className="containerLogo">
          {/* <hr className="first-line" /> */}
          <div className="logo-image">
            <img src="/Nextcom.png" alt="Nextcom" />
          </div>
        </div>
        <div className="descriptionBox">
          <hr />
          <p>
            Add here any awards or things you want to highlight. Could also be a
            brief summary about the project you worked on.
          </p>
        </div>
      </div>
    </header>
  );
}
