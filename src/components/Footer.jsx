export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', marginTop: 'var(--space-6)' }}>
      <div className="container" style={{ padding: 'var(--space-4) var(--space-3)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
        Nexo, built by Team LH for the hackathon. Demo data is simulated.
      </div>
    </footer>
  );
}
