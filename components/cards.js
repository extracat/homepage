import Link from 'next/link';
import posts from '../pages/posts.json';
import Image from 'next/image'

export function Cards() {
  return (
    <>
      <div className="grid">
        {posts.posts.map((p) => (
          <Link key={p.slug} href={p.slug} className="card">
            { p.image != "" ? <Image className="card-image no-bleed" src={p.image} width={1200} height={630} /> : ''}
            <div className="card-text">
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
