import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h1>Page not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    </section>
  );
}
