import Link from 'next/link';
import posts from '../pages/posts.json';

export function Cards() {
  return (
    <>
      <div className="grid">
        {posts.posts.map((p) => (
          <Link key={p.slug} href={p.slug} className="card">
            <div className="text">
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
