import Link from 'next/link';
import Image from 'next/image';

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  breadcrumb: { label: string; href?: string }[];
  image?: string;
}

export default function PageHero({ label, title, description, breadcrumb, image }: PageHeroProps) {
  return (
    <section className="page-hero-section">
      <div className="page-hero-bg">
        {image ? (
          <Image src={image} alt="" className="page-hero-bg-image" fill sizes="100vw" priority />
        ) : (
          <div
            className="page-hero-bg-gradient"
            style={{
              background:
                'linear-gradient(135deg, rgba(7,27,57,0.97) 0%, rgba(11,43,91,0.92) 50%, rgba(20,60,120,0.88) 100%)',
            }}
          />
        )}
      </div>
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <nav className="breadcrumb">
          <ul className="breadcrumb-list">
            {breadcrumb.map((item, idx) => (
              <li key={idx} className="breadcrumb-list-item">
                {item.href ? (
                  <Link href={item.href} className="breadcrumb-item">{item.label}</Link>
                ) : (
                  <span className="breadcrumb-item breadcrumb-item--current">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {label && <p className="page-hero-label">{label}</p>}
        <h1 className="page-hero-title">{title}</h1>
        {description && <p className="page-hero-description">{description}</p>}
      </div>
    </section>
  );
}
